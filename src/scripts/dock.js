// macOS-Dock-style proximity magnification for the social link rows.
// Icons near the cursor scale up (with a slight lift) using a spring,
// while the visual design of the links stays unchanged.
//
// The pointer is tracked on `window` (not just the row) so the effect kicks in
// the moment the cursor is close enough, from any direction.

const DOCK_SELECTOR = ".hero-links, .contact-links";

const MAX_SCALE = 1.6; // scale of the icon directly under the cursor
const INFLUENCE_X = 110; // horizontal px radius in which icons react
const INFLUENCE_Y = 55; // vertical px radius (smaller for a horizontal dock feel)
const LIFT = 12; // max upward shift in px
const STIFFNESS = 0.18; // spring pull toward the target
const DAMPING = 0.72; // spring energy loss (lower = bouncier)

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

function createDock(container) {
  const items = Array.from(container.querySelectorAll("a"));
  if (!items.length) return;

  const states = items.map((el) => ({
    el,
    centerX: 0,
    centerY: 0,
    scale: 1,
    velocity: 0,
    target: 1,
  }));

  let pointerX = null;
  let pointerY = null;
  let rafId = null;

  const applyTransform = (state) => {
    const progress = (state.scale - 1) / (MAX_SCALE - 1);
    state.el.style.transform = `translateY(${-progress * LIFT}px) scale(${state.scale})`;
  };

  const measure = () => {
    // Read resting geometry only, so the spring doesn't skew the centers.
    // Center X/Y are invariant under transform (origin: bottom center).
    for (const state of states) state.el.style.transform = "";
    for (const state of states) {
      const rect = state.el.getBoundingClientRect();
      state.centerX = rect.left + rect.width / 2;
      state.centerY = rect.top + rect.height / 2;
    }
    for (const state of states) applyTransform(state);
    setTargets();
    start();
  };

  const setTargets = () => {
    if (pointerX === null || pointerY === null) {
      for (const state of states) state.target = 1;
      return;
    }

    for (const state of states) {
      const dx = Math.abs(pointerX - state.centerX) / INFLUENCE_X;
      const dy = Math.abs(pointerY - state.centerY) / INFLUENCE_Y;
      let strength = Math.max(0, 1 - Math.hypot(dx, dy));
      strength = strength * strength * (3 - 2 * strength); // smoothstep falloff
      state.target = 1 + (MAX_SCALE - 1) * strength;
    }
  };

  const isNear = () => states.some((state) => state.target > 1.0001);

  const tick = () => {
    let settled = true;

    for (const state of states) {
      state.velocity += (state.target - state.scale) * STIFFNESS;
      state.velocity *= DAMPING;
      state.scale += state.velocity;

      if (
        Math.abs(state.target - state.scale) > 0.001 ||
        Math.abs(state.velocity) > 0.001
      ) {
        settled = false;
      }

      applyTransform(state);
    }

    setTargets();

    if (isNear() || !settled) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    rafId = null;
    for (const state of states) {
      state.scale = 1;
      state.velocity = 0;
      applyTransform(state);
    }
  };

  const start = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(tick);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setTargets();
      start();
    },
    { passive: true },
  );

  document.addEventListener("pointerout", (event) => {
    // Pointer left the document/window entirely.
    if (!event.relatedTarget) {
      pointerX = null;
      pointerY = null;
      setTargets();
      start();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      measure();
      setTargets();
      start();
    },
    { passive: true },
  );

  // Icons are measured in viewport coordinates, so re-measure whenever the
  // page scrolls or moves at all (scroll restoration, fonts/images loading).
  window.addEventListener("scroll", measure, { passive: true });
  window.addEventListener("load", measure);
  window.addEventListener("pageshow", measure);

  for (const state of states) {
    state.el.style.willChange = "transform";
  }

  measure();
}

if (!prefersReducedMotion && !coarsePointer) {
  document.querySelectorAll(DOCK_SELECTOR).forEach(createDock);
}