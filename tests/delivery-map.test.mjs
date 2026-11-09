import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
after(() => vite.close());
const { default: DeliveryMap } = await vite.ssrLoadModule('/src/DeliveryMap.jsx');

for (const [name, location, expected] of [
  ['no location', null, 'Manzil hali belgilanmagan'],
  ['saved location', {lat: 41.3, lng: 69.2}, '41.30000'],
  ['invalid saved location', {lat: 'bad', lng: 69.2}, 'Manzil hali belgilanmagan'],
]) {
  test(`delivery map renders with ${name}`, () => {
    const html = renderToString(React.createElement(DeliveryMap, {location, onChange: () => {}}));
    assert.match(html, new RegExp(expected));
    assert.match(html, /Yetkazib berish manzili/);
  });
}

const {sendOrder, navigationLinks} = await vite.ssrLoadModule('/src/orderApi.js');
test('sends delivery coordinates and address details to configured backend', async () => {
  const order = {delivery: {location: {lat: 41.3, lng: 69.2}, apartment: '12', entrance: '2', floor: '3', comment: 'Eshik kodi'}};
  let request;
  const result = await sendOrder(order, '/api/orders', async (url, options) => {
    request = {url, ...options};
    return {ok: true, json: async () => ({id: '123'})};
  });
  assert.equal(request.url, '/api/orders');
  assert.deepEqual(JSON.parse(request.body), order);
  assert.deepEqual(result, {demo: false, id: '123'});
  assert.equal(navigationLinks(order.delivery.location).yandex, 'https://yandex.ru/maps/?pt=69.2,41.3&z=16');
  assert.match(navigationLinks(order.delivery.location).google, /destination=41.3,69.2/);
});
test('does not report success when backend fails or returns no acknowledgement', async () => {
  const order = {delivery: {location: {lat: 41.3, lng: 69.2}}};
  await assert.rejects(sendOrder(order, '/api/orders', async () => ({ok: false})));
  await assert.rejects(sendOrder(order, '/api/orders', async () => ({ok: true, json: async () => ({})})));
  await assert.rejects(sendOrder({delivery: {}}, '/api/orders', async () => {throw new Error('should not call');}), /xaritada/);
});
