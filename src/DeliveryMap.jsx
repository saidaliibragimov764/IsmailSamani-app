import React, {useEffect, useRef, useState} from 'react';
import {MapPin, Navigation} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {validLocation} from './orderApi';

export default function DeliveryMap({location, onChange, readOnly = false}) {
  const selected = validLocation(location) ? location : null;
  const container = useRef(null), map = useRef(null), marker = useRef(null), leaflet = useRef(null), onChangeRef = useRef(onChange), locationRef = useRef(selected);
  const [error, setError] = useState(''), [loading, setLoading] = useState(false);
  onChangeRef.current = onChange;
  locationRef.current = selected;

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then(module => {
      if (cancelled || !container.current) return;
      const L = module.default || module;
      leaflet.current = L;
      const initial = locationRef.current;
      const instance = L.map(container.current, {scrollWheelZoom: false}).setView(initial ? [initial.lat, initial.lng] : [41.2995, 69.2401], initial ? 16 : 13);
      map.current = instance;
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(instance);
      const icon = L.icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41], shadowSize: [41, 41]});
      const select = latlng => {
        if (!marker.current) {
          marker.current = L.marker(latlng, {icon, draggable: !readOnly}).addTo(instance);
          if (!readOnly) marker.current.on('dragend', () => {
            const point = marker.current.getLatLng();
            onChangeRef.current?.({lat: point.lat, lng: point.lng});
          });
        } else marker.current.setLatLng(latlng);
      };
      if (initial) select([initial.lat, initial.lng]);
      if (!readOnly) instance.on('click', event => {
        select(event.latlng);
        onChangeRef.current?.({lat: event.latlng.lat, lng: event.latlng.lng});
      });
      instance._setDeliveryMarker = select;
    }).catch(() => {if (!cancelled) setError('Xarita yuklanmadi. Internet aloqasini tekshiring.');});
    return () => {cancelled = true; map.current?.remove(); map.current = null; marker.current = null; leaflet.current = null;};
  }, [readOnly]);

  useEffect(() => {
    if (!selected || !map.current) return;
    const coords = [selected.lat, selected.lng];
    map.current._setDeliveryMarker(coords);
    // Map clicks and drags should not jump or reset the user's zoom.
  }, [selected?.lat, selected?.lng]);

  const locate = () => {
    if (!navigator.geolocation) {setError('Qurilmangiz joylashuvni aniqlashni qo‘llamaydi.');return;}
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const point = {lat: coords.latitude, lng: coords.longitude};
      if (validLocation(point)) {
        onChangeRef.current?.(point);
        map.current?.setView([point.lat, point.lng], 16);
      } else setError('Joylashuvni aniqlab bo‘lmadi.');
      setLoading(false);
    }, error => {setLoading(false);setError(error.code === 1 ? 'Joylashuvga ruxsat berilmadi. Xaritadan joyni o‘zingiz tanlashingiz mumkin.' : 'Joylashuvni aniqlab bo‘lmadi. Qayta urinib ko‘ring yoki xaritadan tanlang.');}, {enableHighAccuracy:true,timeout:15000});
  };
  return <div className="location-card"><div className="location-heading"><MapPin size={19}/><div><b>Yetkazib berish manzili</b><small>{readOnly?'Buyurtmadagi joylashuv':'Xaritaga bosing yoki belgini surib joyni tanlang'}</small></div></div>
    <div ref={container} className="delivery-map" aria-label="Yetkazib berish joyi xaritasi"/>
    {!readOnly && <button type="button" className="locate-btn" onClick={locate} disabled={loading}><Navigation size={16}/>{loading?'Aniqlanmoqda...':'Mening joylashuvimni aniqlash'}</button>}
    {selected ? <p className="location-status">Belgilangan: {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}</p> : <p className="location-status">Manzil hali belgilanmagan.</p>}
    {error&&<p className="location-error" role="alert">{error}</p>}
  </div>;
}
