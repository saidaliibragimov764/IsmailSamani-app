import React, {useEffect, useRef, useState} from 'react';
import {MapPin, Navigation, Search, LocateFixed, X, ChevronRight} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {validLocation} from './orderApi';
import {searchAddress} from './addressSearch';

const L = (lang, uz, ru) => lang === 'uz' ? uz : ru;

export default function DeliveryMap({location, onChange, readOnly = false, lang = 'uz'}) {
  const t = (uz, ru) => L(lang, uz, ru);
  const selected = validLocation(location) ? location : null;
  const container = useRef(null), map = useRef(null), marker = useRef(null), onChangeRef = useRef(onChange), locationRef = useRef(selected);
  const alive = useRef(false), selectionVersion = useRef(0), searchRequest = useRef(null);
  const [error, setError] = useState(''), [mapError, setMapError] = useState(''), [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''), [results, setResults] = useState([]), [searching, setSearching] = useState(false), [searchError, setSearchError] = useState('');
  onChangeRef.current = onChange;
  locationRef.current = selected;

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; searchRequest.current?.abort(); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then(module => {
      if (cancelled || !container.current) return;
      const L_ = module.default || module;
      const initial = locationRef.current;
      const instance = L_.map(container.current, {scrollWheelZoom: true, zoomControl: false, dragging: true, touchZoom: true, doubleClickZoom: true, tapHold: false}).setView(initial ? [initial.lat, initial.lng] : [41.2995, 69.2401], initial ? 16 : 13);
      map.current = instance;
      L_.control.zoom({position: 'bottomright'}).addTo(instance);
      // CARTO may return an API-key watermark as a successful image, so a
      // tileerror fallback cannot detect it. Use the keyless OSM tiles directly.
      const tiles = L_.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(instance);
      tiles.on('tileerror', () => {
        if (!cancelled) setMapError(t('Xaritaning ayrim qismlari yuklanmadi. Internet aloqasini tekshiring.', 'Некоторые части карты не загрузились. Проверьте интернет-соединение.'));
      });
      const icon = L_.icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41], shadowSize: [41, 41]});
      const select = latlng => {
        if (!marker.current) {
          marker.current = L_.marker(latlng, {icon, draggable: !readOnly}).addTo(instance);
          if (!readOnly) marker.current.on('dragend', () => {
            const point = marker.current.getLatLng();
            selectionVersion.current++;
            onChangeRef.current?.({lat: point.lat, lng: point.lng});
            setError('');
            setSearchError('');
          });
        } else marker.current.setLatLng(latlng);
      };
      if (initial) select([initial.lat, initial.lng]);
      if (!readOnly) instance.on('click', event => {
        select(event.latlng);
        selectionVersion.current++;
        onChangeRef.current?.({lat: event.latlng.lat, lng: event.latlng.lng});
        setError('');
        setSearchError('');
        setResults([]);
      });
      instance._setDeliveryMarker = select;
    }).catch(() => {if (!cancelled) setMapError(t('Xarita yuklanmadi. Internet aloqasini tekshiring.', 'Карта не загрузилась. Проверьте интернет-соединение.'));});
    return () => {cancelled = true; map.current?.remove(); map.current = null; marker.current = null;};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnly]);

  useEffect(() => {
    if (!selected || !map.current) return;
    map.current._setDeliveryMarker([selected.lat, selected.lng]);
  }, [selected?.lat, selected?.lng]);

  const locate = (automatic = false) => {
    if (!navigator.geolocation) { if (!automatic) setError(t('Qurilmangiz joylashuvni aniqlashni qo‘llamaydi. Manzilni qidiring yoki xaritadan tanlang.', 'Ваше устройство не поддерживает геолокацию. Найдите адрес или выберите на карте.')); return; }
    const version = selectionVersion.current;
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(({coords}) => {
      if (!alive.current) return;
      setLoading(false);
      // A late GPS response must not overwrite a manually selected address.
      if (selectionVersion.current !== version) return;
      const point = {lat: coords.latitude, lng: coords.longitude};
      if (validLocation(point)) {
        selectionVersion.current++;
        onChangeRef.current?.(point);
        map.current?.setView([point.lat, point.lng], 16);
        setResults([]);
      } else setError(t('Joylashuvni aniqlab bo‘lmadi. Manzilni qidiring yoki xaritadan tanlang.', 'Не удалось определить местоположение. Найдите адрес или выберите на карте.'));
    }, error => {
      if (!alive.current) return;
      setLoading(false);
      if (selectionVersion.current !== version) return;
      setError(error.code === 1 ? t('Joylashuvga ruxsat berilmadi. Telefon va brauzer sozlamalarida ruxsatni yoqing yoki manzilni qidiring.', 'Нет доступа к геолокации. Включите разрешение в настройках телефона и браузера или найдите адрес.') : error.code === 3 ? t('Joylashuvni aniqlash vaqti tugadi. Qayta urinib ko‘ring yoki manzilni qidiring.', 'Время определения местоположения истекло. Попробуйте снова или найдите адрес.') : t('Joylashuvni aniqlab bo‘lmadi. GPS va internetni tekshiring yoki manzilni qidiring.', 'Не удалось определить местоположение. Проверьте GPS и интернет или найдите адрес.'));
    }, {enableHighAccuracy:false, maximumAge:60000, timeout:15000});
  };
  // Ask once when there is no saved location, never replace a previously chosen address.
  useEffect(() => { if (!readOnly && !locationRef.current) locate(true); }, [readOnly]);

  const search = async event => {
    event.preventDefault();
    const value = query.trim();
    if (value.length < 3) {setSearchError(value ? t('Qidirish uchun kamida 3 ta harf yozing.', 'Введите не менее 3 символов для поиска.') : t('Ko‘cha, uy yoki mo‘ljalni kiriting.', 'Введите улицу, дом или ориентир.')); setResults([]); return;}
    searchRequest.current?.abort();
    const controller = new AbortController();
    searchRequest.current = controller;
    setSearching(true); setSearchError(''); setResults([]);
    try {
      const places = await searchAddress(value, {signal:controller.signal});
      if (!alive.current || controller.signal.aborted) return;
      setResults(places);
      if (!places.length) setSearchError(t('Manzil topilmadi. Boshqacha yozib ko‘ring yoki xaritadan tanlang.', 'Адрес не найден. Напишите иначе или выберите на карте.'));
    } catch (err) {
      if (alive.current && !controller.signal.aborted) setSearchError(t('Qidiruv ishlamadi. Internetni tekshiring yoki xaritadan tanlang.', 'Поиск не сработал. Проверьте интернет или выберите на карте.'));
    } finally {
      if (alive.current && searchRequest.current === controller) setSearching(false);
    }
  };
  const chooseResult = place => {
    selectionVersion.current++;
    onChangeRef.current?.({lat:place.lat,lng:place.lng});
    map.current?.setView([place.lat, place.lng], 16);
    setQuery(place.name); setResults([]); setSearchError(''); setError('');
  };
  const clearSearch = () => {searchRequest.current?.abort();searchRequest.current=null;setSearching(false);setQuery('');setResults([]);setSearchError('');};

  return <div className="location-card"><div className="location-heading"><div className="location-heading-icon"><MapPin size={19}/></div><div><b>{t('Yetkazib berish manzili', 'Адрес доставки')}</b><small>{readOnly?t('Buyurtmadagi joylashuv', 'Местоположение в заказе'):t('Manzilingizni qidiring yoki xaritada belgilang', 'Найдите адрес или отметьте на карте')}</small></div></div>
    {!readOnly && <div className="map-search-area"><form className="map-search" onSubmit={search}><Search size={19}/><input aria-label={t('Manzilni qidirish', 'Поиск адреса')} placeholder={t('Ko‘cha, uy yoki mo‘ljal...', 'Улица, дом или ориентир...')} value={query} onChange={e=>{searchRequest.current?.abort();searchRequest.current=null;setSearching(false);setResults([]);setSearchError('');setQuery(e.target.value)}}/>{query && <button type="button" className="map-search-clear" onClick={clearSearch} aria-label={t('Qidiruvni tozalash', 'Очистить поиск')}><X size={17}/></button>}<button type="submit" className="map-search-submit" disabled={searching}>{searching?'...':t('Qidirish', 'Найти')}</button></form>
      {searchError&&<p className="map-search-error" role="status">{searchError}</p>}
      {results.length>0&&<ul className="map-search-results" aria-label={t('Topilgan manzillar', 'Найденные адреса')}>{results.map(place=><li key={place.id}><button type="button" onClick={()=>chooseResult(place)}><MapPin size={17}/><span>{place.name}</span><ChevronRight size={16}/></button></li>)}</ul>}
    </div>}
    <div className="map-frame"><div ref={container} className="delivery-map" aria-label={t('Yetkazib berish joyi xaritasi', 'Карта места доставки')}/>{!readOnly&&<div className="map-tip"><LocateFixed size={14}/> {t('Ikki barmoq bilan yaqinlashtiring', 'Масштабируйте двумя пальцами')}</div>}</div>
    {!readOnly && <button type="button" className="locate-btn" onClick={()=>locate()} disabled={loading}><Navigation size={17}/>{loading?t('Joylashuv aniqlanmoqda...', 'Определяем местоположение...'):t('Mening joylashuvimni aniqlash', 'Определить моё местоположение')}</button>}
    <div className={'location-status-row '+(selected?'is-selected':'')}><span className="location-status-icon"><MapPin size={16}/></span><div><b>{selected?t('Manzil belgilandi', 'Адрес отмечен'):t('Manzil belgilanmagan', 'Адрес не отмечен')}</b><p>{selected?`${selected.lat.toFixed(5)}, ${selected.lng.toFixed(5)}`:t('Xaritadan joyni tanlang', 'Выберите место на карте')}</p></div></div>
    {mapError&&<div className="location-error" role="status"><span>{mapError}</span><button type="button" aria-label={t('Xarita xabarini yopish', 'Закрыть сообщение карты')} onClick={()=>setMapError('')}><X size={16}/></button></div>}
    {error&&<div className={'location-error '+(selected?'location-error-soft':'')} role="status"><span>{selected?t('Joylashuv aniqlanmadi. Xaritada belgilangan manzildan foydalanishingiz mumkin.', 'Не удалось определить местоположение. Можно использовать адрес, отмеченный на карте.'):error}</span><button type="button" aria-label={t('Xabarni yopish', 'Закрыть сообщение')} onClick={()=>setError('')}><X size={16}/></button></div>}
  </div>;
}
