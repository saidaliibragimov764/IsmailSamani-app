import React from 'react';
import DeliveryMap from './DeliveryMap';
import {navigationLinks} from './orderApi';

// Reusable by a future authenticated admin or courier order-details screen.
export default function OrderLocation({delivery}) {
  const links = navigationLinks(delivery?.location);
  if (!links) return null;
  const {apartment, entrance, floor, comment} = delivery;
  return <section className="order-location"><DeliveryMap location={delivery.location} readOnly/><div className="address-summary">{apartment&&<span>Xonadon: {apartment}</span>}{entrance&&<span>Podyezd: {entrance}</span>}{floor&&<span>Qavat: {floor}</span>}{comment&&<span>Izoh: {comment}</span>}</div><div className="map-links"><a href={links.yandex} target="_blank" rel="noopener noreferrer">Yandex Maps’da ochish</a><a href={links.google} target="_blank" rel="noopener noreferrer">Google Maps’da yo‘l</a></div></section>;
}
