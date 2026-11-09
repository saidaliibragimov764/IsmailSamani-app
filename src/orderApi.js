// Configure a same-origin endpoint such as /api/orders when a real backend exists.
export const ordersEndpoint = import.meta.env.VITE_ORDERS_API_URL || '';
export const validLocation = point => !!point && Number.isFinite(point.lat) && Number.isFinite(point.lng) && Math.abs(point.lat) <= 90 && Math.abs(point.lng) <= 180;
export function navigationLinks(point) {
  if (!validLocation(point)) return null;
  return {
    yandex: `https://yandex.ru/maps/?pt=${point.lng},${point.lat}&z=16`,
    google: `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`
  };
}
export async function sendOrder(order, endpoint = ordersEndpoint, fetchImpl = fetch) {
  if (!validLocation(order.delivery?.location)) throw new Error('Yetkazib berish joyini xaritada belgilang.');
  if (!endpoint) return {demo: true};
  const response = await fetchImpl(endpoint, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(order)
  });
  if (!response.ok) throw new Error('Buyurtmani yuborib bo‘lmadi. Qayta urinib ko‘ring.');
  // A real backend must explicitly acknowledge an order before the cart is cleared.
  let data;
  try { data = await response.json(); } catch { throw new Error('Serverdan noto‘g‘ri javob keldi.'); }
  if (!data || typeof data !== 'object' || !data.id) throw new Error('Server buyurtmani tasdiqlamadi.');
  return {demo: false, id: data.id};
}
