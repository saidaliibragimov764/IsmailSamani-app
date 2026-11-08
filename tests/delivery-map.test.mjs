import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
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
