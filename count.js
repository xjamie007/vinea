// Counts each .count down from 800 to its own number once it scrolls into view.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const countIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const el = e.target, to = Number(el.textContent) || 0, from = 800, t0 = performance.now(), ms = 1800;
  if (reduce) return;
  const tick = now => {
    const p = Math.min((now - t0) / ms, 1), ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(from + (to - from) * ease);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: .6 });
window.watchCounts = () => document.querySelectorAll('.count').forEach(el => countIO.observe(el));
watchCounts();
