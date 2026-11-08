import React, {useEffect, useRef, useState} from 'react';
import {MapPin, Navigation} from 'lucide-react';

const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;
let mapScript;
function loadYandex() {
  if (window.ymaps) return Promise.resolve(window.ymaps);
  if (!mapScript) mapScript = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    script.onload = () => window.ymaps ? window.ymaps.ready(() => resolve(window.ymaps)) : reject(new Error('Xarita yuklanmadi'));
    script.onerror = () => reject(new Error('Xarita yuklanmadi'));
    document.head.appendChild(script);
  }).catch(error => { mapScript = null; throw error; });
  return mapScript;
}

export default function DeliveryMap({location, onChange}) {
  // Ignore malformed data left in browser storage instead of breaking the cart.
  if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng) || Math.abs(location.lat) > 90 || Math.abs(location.lng) > 180) location = null;
  const container = useRef(null), map = useRef(null), marker = useRef(null), onChangeRef = useRef(onChange);
  const [error, setError] = useState(''), [loading, setLoading] = useState(false);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (!apiKey || !container.current) return;
    let cancelled = false;
    loadYandex().then(ymaps => {
      if (cancelled) return;
      const initial = location ? [location.lat, location.lng] : [41.2995, 69.2401];
      map.current = new ymaps.Map(container.current, {center: initial, zoom: 13, controls: ['zoomControl', 'geolocationControl']});
      marker.current = new ymaps.Placemark(initial, {}, {preset: 'islands#redDotIcon', draggable: true});
      if (location) map.current.geoObjects.add(marker.current);
      const select = coords => {
        marker.current.geometry.setCoordinates(coords);
        if (!map.current.geoObjects.contains(marker.current)) map.current.geoObjects.add(marker.current);
        onChangeRef.current({lat: coords[0], lng: coords[1]});
      };
      map.current.events.add('click', event => select(event.get('coords')));
      marker.current.events.add('dragend', () => select(marker.current.geometry.getCoordinates()));
    }).catch(() => { if (!cancelled) setError('Yandex xaritasi yuklanmadi. Internet yoki API kalitini tekshiring.'); });
    return () => {cancelled = true; if (map.current) map.current.destroy(); map.current = null; marker.current = null;};
  }, []);
  useEffect(() => {
    if (!location || !map.current || !marker.current) return;
    const coords = [location.lat, location.lng];
    marker.current.geometry.setCoordinates(coords);
    if (!map.current.geoObjects.contains(marker.current)) map.current.geoObjects.add(marker.current);
    map.current.setCenter(coords, 16);
  }, [location]);
  const locate = () => {
    if (!navigator.geolocation) {setError('Qurilmangiz joylashuvni aniqlashni qo‘llamaydi.');return;}
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(({coords}) => {onChange({lat:coords.latitude,lng:coords.longitude});setLoading(false);}, () => {setLoading(false);setError('Joylashuvga ruxsat berilmadi yoki uni aniqlab bo‘lmadi.');}, {enableHighAccuracy:true,timeout:15000});
  };
  const point = location ? `${location.lng},${location.lat}` : '69.2401,41.2995';
  return <div className="location-card"><div className="location-heading"><MapPin size={19}/><div><b>Yetkazib berish manzili</b><small>{apiKey?'Xaritada nuqtani belgilang yoki joylashuvingizni aniqlang':'Joriy joylashuvingizni belgilang'}</small></div></div>
    {apiKey ? <div ref={container} className="delivery-map" aria-label="Yetkazib berish joyini tanlash uchun Yandex xaritasi"/> : <iframe className="delivery-map" title="Yandex xaritasi" src={`https://yandex.com/map-widget/v1/?ll=${point}&z=15${location?`&pt=${point},pm2rdm`:''}`} loading="lazy"/>}
    <button type="button" className="locate-btn" onClick={locate} disabled={loading}><Navigation size={16}/>{loading?'Aniqlanmoqda...':'Mening joylashuvimni aniqlash'}</button>
    {location ? <p className="location-status">Belgilangan: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p> : <p className="location-status">Manzil hali belgilanmagan.</p>}
    {!apiKey&&<p className="location-hint">Xaritada istalgan nuqtani belgilash uchun Yandex Maps API kaliti kerak.</p>}
    {error&&<p className="location-error" role="alert">{error}</p>}
  </div>;
}
