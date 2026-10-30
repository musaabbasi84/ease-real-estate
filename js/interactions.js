// Nav, sound, modal and the enquiry form. 100% frontend: nothing is ever sent anywhere.
export function initNav() {
  const nav = document.getElementById('nav'), burger = document.getElementById('burger');
  const onScroll = () => nav.classList.toggle('solid', scrollY > innerHeight * .9);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const set = o => { nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); };
  burger.onclick = () => set(!nav.classList.contains('open'));
  nav.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => e.key === 'Escape' && set(false));
}
export function initSound() {
  const b = document.getElementById('sound'); let muted = true;
  b.onclick = () => { muted = !muted; b.setAttribute('aria-pressed', !muted); b.textContent = muted ? 'Sound off' : 'Sound on';
    document.querySelectorAll('video').forEach(v => v.muted = muted); };
  return () => muted;
}
export function initModal(form) {
  const m = document.getElementById('modal'); let cur;
  m.querySelector('.close').onclick = () => m.close();
  m.addEventListener('click', e => e.target === m && m.close());
  document.getElementById('m-enq').onclick = () => { m.close(); form.type.value = cur.type; document.getElementById('contact').scrollIntoView(); form.name.focus({ preventScroll: true }); };
  return p => { cur = p; const $ = id => document.getElementById(id);
    $('m-img').src = `assets/images/${p.img}.webp`; $('m-img').alt = p.alt; $('m-cat').textContent = p.cat; $('m-title').textContent = p.name; $('m-loc').textContent = p.loc; $('m-desc').textContent = p.desc; m.showModal(); };
}
export function initForm(form) {
  const rules = {
    name: v => v.trim().length >= 2 || 'Please enter your full name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Please enter a valid email address.',
    phone: v => /^[+()\d\s-]{7,20}$/.test(v) && v.replace(/\D/g, '').length >= 7 || 'Please enter a valid phone number.',
    destination: v => !!v || 'Please choose a destination.',
    type: v => !!v || 'Please choose a property type.',
    message: v => v.trim().length >= 10 || 'Please write at least 10 characters.'
  };
  const check = el => { const r = rules[el.name](el.value), lab = el.closest('label'); lab.classList.toggle('bad', r !== true); lab.querySelector('em').textContent = r === true ? '' : r; return r === true; };
  Object.keys(rules).forEach(n => form[n].addEventListener('blur', () => check(form[n])));
  const st = document.getElementById('status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = Object.keys(rules).filter(n => !check(form[n]));
    if (bad.length) { form[bad[0]].focus(); st.textContent = 'Please correct the highlighted fields.'; return; }
    st.textContent = 'Thank you — this is a demo form. Your details passed validation, but nothing has been sent or stored.';
    form.reset(); form.querySelectorAll('label.bad').forEach(l => l.classList.remove('bad'));
  });
}
