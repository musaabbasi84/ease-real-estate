// Real Three.js layer: a volumetric cloud field the camera flies through (Scene 01), composited over the footage.
import * as THREE from './vendor/three.module.js';
export function initClouds(canvas, mobile) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'high-performance' }); }
  catch (e) { return null; } // WebGL fallback: footage only
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 1.75));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(60, 1, .1, 200);
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,248,235,.9)'); gr.addColorStop(.5, 'rgba(255,240,220,.35)'); gr.addColorStop(1, 'rgba(255,240,220,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c), mats = [], N = mobile ? 16 : 42;
  for (let i = 0; i < N; i++) {
    const m = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0, color: i % 3 ? 0xfff1dc : 0xf2c9a0 });
    const s = new THREE.Sprite(m), sc = 14 + Math.random() * 26;
    s.scale.set(sc, sc * .6, 1); s.position.set((Math.random() - .5) * 70, (Math.random() - .5) * 26, -Math.random() * 110);
    scene.add(s); mats.push(m);
  }
  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();
  let on = true;
  return {
    // p: 0..1 across the flight; camera dollies forward through the field
    set(p) {
      on = p < 1;
      canvas.style.display = on ? 'block' : 'none';
      if (!on) return;
      cam.position.z = 20 - p * 125; cam.position.y = Math.sin(p * 3) * .8;
      const fade = Math.min(1, p * 8) * (1 - Math.max(0, (p - .75) / .25));
      scene.children.forEach((s, i) => {
        const d = s.position.z - cam.position.z; // distance ahead of camera
        s.material.opacity = fade * Math.max(0, Math.min(1, (-d - 2) / 14)) * Math.max(0, Math.min(1, (60 + d) / 40)) * .7;
      });
      renderer.render(scene, cam);
    },
    dispose() { removeEventListener('resize', resize); mats.forEach(m => m.dispose()); tex.dispose(); renderer.dispose(); }
  };
}
