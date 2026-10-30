// Scroll-driven cinematic timeline (GSAP ScrollTrigger). Layers are crossfades with scale moves — not literal camera travel between clips.
const { gsap, ScrollTrigger } = window;
const START = [0, .6, 1, 2, 3, 4, 5];   // when each layer fades in (timeline units)
const TOTAL = 6.9;
export function initJourney({ clouds, mobile, isMuted }) {
  gsap.registerPlugin(ScrollTrigger);
  const layers = [...document.querySelectorAll('.layer')], scenes = [...document.querySelectorAll('.scene')];
  const enter = document.getElementById('enter'), cue = document.getElementById('cue'), bar = document.getElementById('bar');
  const load = l => { if (l.dataset.src && !l.src) { l.src = l.dataset.src; l.muted = isMuted(); } };
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  layers.forEach((l, i) => { if (i) tl.fromTo(l, { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1, duration: .8, ease: 'power1.inOut' }, START[i] - .4); });
  tl.to(layers[0], { scale: 1.25, duration: 1.4 }, 0);                                                  // push-in through clouds
  tl.to(layers[2], { scale: 1.12, duration: 1 }, 1.4).to(layers[3], { scale: 1.1, duration: 1 }, 2.4); // slow approach
  const IN = [0, 1.2, 2.2, 3.2, 4.2, 5.2], OUT = [.35, 1.9, 2.9, 3.9, 4.9];
  scenes.forEach((s, i) => {
    if (i) tl.fromTo(s, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .45, ease: 'power2.out' }, IN[i]);
    if (i < OUT.length) tl.to(s, { opacity: 0, y: -30, duration: .35 }, OUT[i]);
  });
  tl.to({}, { duration: TOTAL - tl.duration() }, tl.duration()); // hold: let the pool scene breathe
  ScrollTrigger.create({
    trigger: '.journey', start: 'top top', end: () => '+=' + innerHeight * (mobile ? 5.2 : 7), pin: '.stage', scrub: mobile ? .6 : 1.1, animation: tl, anticipatePin: 1,
    onUpdate(self) {
      const t = self.progress * TOTAL;
      bar.style.height = self.progress * 100 + '%';
      cue.style.opacity = t > .3 ? 0 : 1; enter.style.pointerEvents = t < .4 ? 'auto' : 'none';
      clouds && clouds.set(Math.min(1, t / 1.3));
      layers.forEach((l, i) => {
        if (!l.dataset.src) return;
        if (t > START[i] - 1.6) load(l);
        const live = t > START[i] - .9 && t < (START[i + 1] ?? 99) + 1.2;
        if (l.src) { if (live && l.paused) l.play().catch(() => {}); else if (!live && !l.paused) l.pause(); }
      });
    }
  });
  return { distance: () => innerHeight * (mobile ? 5.2 : 7) / TOTAL, dispose: () => ScrollTrigger.getAll().forEach(s => s.kill()) };
}
