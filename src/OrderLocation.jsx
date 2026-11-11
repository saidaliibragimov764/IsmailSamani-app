import React from 'react';
import DeliveryMap from './DeliveryMap';
import {navigationLinks} from './orderApi';

const L = (lang, uz, ru) => lang === 'uz' ? uz : ru;

// Reusable by a future authenticated admin or courier order-details screen.
export default function OrderLocation({delivery, lang = 'uz'}) {
  const t = (uz, ru) => L(lang, uz, ru);
  const links = navigationLinks(delivery?.location);
  if (!links) return null;
  const {apartment, entrance, floor, comment} = delivery;
  return <section className="order-location"><DeliveryMap location={delivery.location} readOnly lang={lang}/><div className="address-summary">{apartment&&<span>{t('Xonadon', 'Квартира')}: {apartment}</span>}{entrance&&<span>{t('Podyezd', 'Подъезд')}: {entrance}</span>}{floor&&<span>{t('Qavat', 'Этаж')}: {floor}</span>}{comment&&<span>{t('Izoh', 'Комментарий')}: {comment}</span>}</div><div className="map-links"><a href={links.yandex} target="_blank" rel="noopener noreferrer">{t('Yandex Maps’da ochish', 'Открыть в Яндекс Картах')}</a><a href={links.google} target="_blank" rel="noopener noreferrer">{t('Google Maps’da yo‘l', 'Маршрут в Google Maps')}</a></div></section>;
}
