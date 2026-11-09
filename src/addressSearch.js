// Explicit-submit search (no autocomplete) follows the public Nominatim usage policy.
export async function searchAddress(query, {signal, fetchImpl = fetch} = {}) {
  const params = new URLSearchParams({q: query.trim(), format: 'jsonv2', addressdetails: '1', limit: '5', countrycodes: 'uz', 'accept-language': 'uz'});
  const response = await fetchImpl(`https://nominatim.openstreetmap.org/search?${params}`, {signal, headers: {'Accept': 'application/json'}});
  if (!response.ok) throw new Error('Address search failed');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid search response');
  return data.filter(item => typeof item.lat === 'string' && item.lat.trim() && typeof item.lon === 'string' && item.lon.trim()).map(item => ({id: String(item.place_id), name: item.display_name, lat: Number(item.lat), lng: Number(item.lon)}))
    .filter(item => typeof item.name === 'string' && item.name && Number.isFinite(item.lat) && Number.isFinite(item.lng) && Math.abs(item.lat) <= 90 && Math.abs(item.lng) <= 180);
}
