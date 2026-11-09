import React, {useEffect, useRef, useState} from 'react';
import {MapPin, Navigation, Search, LocateFixed, X, ChevronRight} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {validLocation} from './orderApi';
import {searchAddress} from './addressSearch';

export default function DeliveryMap({location, onChange, readOnly = false}) {
  const selected = validLocation(location) ? location : null;
  const container = useRef(null), map = useRef(null), marker = useRef(null), onChangeRef = useRef(onChange), locationRef = useRef(selected);
  const alive = useRef(false), selectionVersion = useRef(0), searchRequest = useRef(null);
  const [error, setError] = useState(''), [loading, setLoading] = useState(false);
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
      const L = module.default || module;
      const initial = locationRef.current;
      const instance = L.map(container.current, {scrollWheelZoom: true, zoomControl: false, dragging: true, touchZoom: true, doubleClickZoom: true, tapHold: false}).setView(initial ? [initial.lat, initial.lng] : [41.2995, 69.2401], initial ? 16 : 13);
      map.current = instance;
      L.control.zoom({position: 'bottomright'}).addTo(instance);
      const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 19, attribution
      }).addTo(instance);
      // If the styled tile provider is unavailable, retain a usable OSM map.
      tiles.once('tileerror', () => {
        if (!map.current) return;
        instance.removeLayer(tiles);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(instance);
      });
      const icon = L.icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41], shadowSize: [41, 41]});
      const select = latlng => {
        if (!marker.current) {
          marker.current = L.marker(latlng, {icon, draggable: !readOnly}).addTo(instance);
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
    }).catch(() => {if (!cancelled) setError('Xarita yuklanmadi. Internet aloqasini tekshiring.');});
    return () => {cancelled = true; map.current?.remove(); map.current = null; marker.current = null;};
  }, [readOnly]);

  useEffect(() => {
    if (!selected || !map.current) return;
    map.current._setDeliveryMarker([selected.lat, selected.lng]);
  }, [selected?.lat, selected?.lng]);

  const locate = (automatic = false) => {
    if (!navigator.geolocation) { if (!automatic) setError('Qurilmangiz joylashuvni aniqlashni qo‘llamaydi. Manzilni qidiring yoki xaritadan tanlang.'); return; }
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
      } else setError('Joylashuvni aniqlab bo‘lmadi. Manzilni qidiring yoki xaritadan tanlang.');
    }, error => {
      if (!alive.current) return;
      setLoading(false);
      if (selectionVersion.current !== version) return;
      setError(error.code === 1 ? 'Joylashuvga ruxsat berilmadi. Telefon va brauzer sozlamalarida ruxsatni yoqing yoki manzilni qidiring.' : error.code === 3 ? 'Joylashuvni aniqlash vaqti tugadi. Qayta urinib ko‘ring yoki manzilni qidiring.' : 'Joylashuvni aniqlab bo‘lmadi. GPS va internetni tekshiring yoki manzilni qidiring.');
    }, {enableHighAccuracy:false, maximumAge:60000, timeout:15000});
  };
  // Ask once when there is no saved location, never replace a previously chosen address.
  useEffect(() => { if (!readOnly && !locationRef.current) locate(true); }, [readOnly]);

  const search = async event => {
    event.preventDefault();
    const value = query.trim();
    if (value.length < 3) {setSearchError(value ? 'Qidirish uchun kamida 3 ta harf yozing.' : 'Ko‘cha, uy yoki mo‘ljalni kiriting.'); setResults([]); return;}
    searchRequest.current?.abort();
    const controller = new AbortController();
    searchRequest.current = controller;
    setSearching(true); setSearchError(''); setResults([]);
    try {
      const places = await searchAddress(value, {signal:controller.signal});
      if (!alive.current || controller.signal.aborted) return;
      setResults(places);
      if (!places.length) setSearchError('Manzil topilmadi. Boshqacha yozib ko‘ring yoki xaritadan tanlang.');
    } catch (err) {
      if (alive.current && !controller.signal.aborted) setSearchError('Qidiruv ishlamadi. Internetni tekshiring yoki xaritadan tanlang.');
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

  return <div className="location-card"><div className="location-heading"><div className="location-heading-icon"><MapPin size={19}/></div><div><b>Yetkazib berish manzili</b><small>{readOnly?'Buyurtmadagi joylashuv':'Manzilingizni qidiring yoki xaritada belgilang'}</small></div></div>
    {!readOnly && <div className="map-search-area"><form className="map-search" onSubmit={search}><Search size={19}/><input aria-label="Manzilni qidirish" placeholder="Ko‘cha, uy yoki mo‘ljal..." value={query} onChange={e=>{searchRequest.current?.abort();searchRequest.current=null;setSearching(false);setResults([]);setSearchError('');setQuery(e.target.value)}}/>{query && <button type="button" className="map-search-clear" onClick={clearSearch} aria-label="Qidiruvni tozalash"><X size={17}/></button>}<button type="submit" className="map-search-submit" disabled={searching}>{searching?'...':'Qidirish'}</button></form>
      {searchError&&<p className="map-search-error" role="status">{searchError}</p>}
      {results.length>0&&<ul className="map-search-results" aria-label="Topilgan manzillar">{results.map(place=><li key={place.id}><button type="button" onClick={()=>chooseResult(place)}><MapPin size={17}/><span>{place.name}</span><ChevronRight size={16}/></button></li>)}</ul>}
    </div>}
    <div className="map-frame"><div ref={container} className="delivery-map" aria-label="Yetkazib berish joyi xaritasi"/>{!readOnly&&<div className="map-tip"><LocateFixed size={14}/> Ikki barmoq bilan yaqinlashtiring</div>}</div>
    {!readOnly && <button type="button" className="locate-btn" onClick={()=>locate()} disabled={loading}><Navigation size={17}/>{loading?'Joylashuv aniqlanmoqda...':'Mening joylashuvimni aniqlash'}</button>}
    <div className={'location-status-row '+(selected?'is-selected':'')}><span className="location-status-icon"><MapPin size={16}/></span><div><b>{selected?'Manzil belgilandi':'Manzil belgilanmagan'}</b><p>{selected?`${selected.lat.toFixed(5)}, ${selected.lng.toFixed(5)}`:'Xaritadan joyni tanlang'}</p></div></div>
    {error&&<div className={'location-error '+(selected?'location-error-soft':'')} role="status"><span>{selected?'Joylashuv aniqlanmadi. Xaritada belgilangan manzildan foydalanishingiz mumkin.':error}</span><button type="button" aria-label="Xabarni yopish" onClick={()=>setError('')}><X size={16}/></button></div>}
  </div>;
}
