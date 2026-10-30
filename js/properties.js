// Clearly labelled SAMPLE listings — no real prices, locations or availability.
export const PROPERTIES = [
  { id: 'coastal', cat: 'Coastal Residences', type: 'Coastal Residence', name: 'The Waterline House', loc: 'Sample location — waterfront', img: 'coastal-residence', alt: 'Glass-and-stone waterfront residence at dusk', desc: 'A low, stone-based residence opening to the water, with glazed balconies and warm light on the shoreline.' },
  { id: 'mountain', cat: 'Mountain Estates', type: 'Mountain Estate', name: 'The Foothill Estate', loc: 'Sample location — mountain valley', img: 'mountain-residence', alt: 'Estates in the foothills beneath mountains', desc: 'Generous grounds, mountain horizons and room to live at a slower pace.' },
  { id: 'city', cat: 'City Penthouses', type: 'City Penthouse', name: 'The Skyline Terrace', loc: 'Sample location — city skyline', img: 'city-penthouse', alt: 'Rooftop infinity pool at sunset above a city', desc: 'A rooftop infinity pool framing the skyline and the sea beyond, best at dusk.' },
  { id: 'garden', cat: 'Garden Villas', type: 'Garden Villa', name: 'The Stone & Timber Villa', loc: 'Sample location — landscaped garden', img: 'estate-exterior', alt: 'Contemporary villa with stone cladding and timber details', desc: 'Natural stone, timber slats and floor-to-ceiling glazing set within landscaped gardens.' }
];
export function renderCards(root, onOpen) {
  root.innerHTML = PROPERTIES.map(p => `<button class="card" data-id="${p.id}" aria-label="Explore ${p.name}">
    <span class="im"><img src="assets/images/${p.img}.webp" alt="${p.alt}" loading="lazy"></span>
    <span class="cat">${p.cat}</span><h3>${p.name}</h3><span class="loc">${p.loc} · Sample listing</span><p>${p.desc}</p><span class="go">Explore property</span></button>`).join('');
  root.addEventListener('click', e => { const c = e.target.closest('.card'); if (c) onOpen(PROPERTIES.find(p => p.id === c.dataset.id)); });
}
