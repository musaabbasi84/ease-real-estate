import { initClouds } from './scene.js';
import { initJourney } from './scroll.js';
import { PROPERTIES, renderCards } from './properties.js';
import { initNav, initSound, initModal, initForm } from './interactions.js';

const mobile = matchMedia('(max-width:820px)').matches || navigator.maxTouchPoints > 0 && innerWidth < 1100;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const form = document.getElementById('form');
document.getElementById('yr').textContent = new Date().getFullYear();

const isMuted = initSound();
renderCards(document.getElementById('cards'), initModal(form));
initForm(form); initNav();

const first = document.querySelector('.layer[data-i="0"]');
const hide = () => document.getElementById('loader').classList.add('off');
setTimeout(hide, 3500); // loader can never stay stuck
first.src = first.dataset.src;
first.addEventListener('canplay', hide, { once: true });
first.addEventListener('error', hide, { once: true });

// lazy background video for Destinations
const bg = document.querySelector('.bgv');
const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { if (!bg.src) bg.src = bg.dataset.src; if (!reduced) bg.play().catch(() => {}); } else bg.pause();
}, { rootMargin: '200px' });
io.observe(bg);

let journey, clouds;
if (reduced || !window.gsap) {
  document.body.classList.add('reduced'); first.pause();
} else {
  clouds = initClouds(document.getElementById('gl'), mobile);
  journey = initJourney({ clouds, mobile, isMuted });
  first.play().catch(() => {});
  document.getElementById('enter').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: journey.distance() * 1.1, behavior: 'smooth' }); });
}
document.getElementById('enter').addEventListener('keydown', () => {});
addEventListener('pagehide', () => { journey?.dispose(); clouds?.dispose(); io.disconnect(); });
