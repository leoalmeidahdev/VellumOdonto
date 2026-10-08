/**
 * Rolagem suave com inércia, sem bibliotecas.
 *
 * A roda do mouse deixa de pular de 100 em 100 px: cada evento move um alvo
 * e a página persegue esse alvo com interpolação exponencial a cada quadro.
 * A rolagem continua sendo a nativa da janela (window.scrollTo), então
 * position: sticky, âncoras, IntersectionObserver e leitores de tela
 * seguem funcionando.
 *
 * Toque, teclado e arraste da barra de rolagem continuam nativos. Em
 * dispositivos sem mouse ou com "reduzir movimento" ativo, o motor apenas
 * repassa a rolagem nativa para os assinantes.
 */

export type ScrollState = {
  /** Posição atual (px). */
  y: number;
  /** Velocidade suavizada em px por quadro (~16 ms). */
  velocity: number;
  /** 1 descendo, -1 subindo. */
  direction: 1 | -1;
};

type Listener = (state: ScrollState) => void;

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
};

const LERP_PER_MS = 0.0072; // ~0.11 por quadro a 60 fps
const KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

const state: ScrollState = { y: 0, velocity: 0, direction: 1 };
const listeners = new Set<Listener>();

let enabled = false;
let locked = false;
let mode: 'idle' | 'lerp' | 'tween' = 'idle';
let target = 0;
let current = 0;
let rafId = 0;
let lastFrame = 0;
let lastEmit = 0;
let lastY = 0;
let tween: { from: number; to: number; start: number; duration: number } | null = null;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

function emit() {
  const y = window.scrollY;
  const now = performance.now();
  const dt = Math.max(1, now - lastEmit);
  const dy = y - lastY;
  const instant = (dy / dt) * 16;
  state.velocity = state.velocity * 0.7 + instant * 0.3;
  if (dy !== 0) state.direction = dy > 0 ? 1 : -1;
  state.y = y;
  lastY = y;
  lastEmit = now;
  listeners.forEach((l) => l(state));
}

function halt() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  mode = 'idle';
  tween = null;
  current = target = window.scrollY;
}

function frame(now: number) {
  const dt = Math.min(64, lastFrame ? now - lastFrame : 16);
  lastFrame = now;

  if (mode === 'lerp') {
    const k = 1 - Math.exp(-dt * LERP_PER_MS);
    current += (target - current) * k;
    if (Math.abs(target - current) < 0.4) {
      current = target;
      mode = 'idle';
    }
  } else if (mode === 'tween' && tween) {
    const p = clamp((now - tween.start) / tween.duration, 0, 1);
    current = tween.from + (tween.to - tween.from) * easeOutExpo(p);
    if (p >= 1) {
      current = target = tween.to;
      mode = 'idle';
      tween = null;
    }
  }

  window.scrollTo(0, current);
  emit();

  if (mode !== 'idle') {
    rafId = requestAnimationFrame(frame);
  } else {
    rafId = 0;
    lastFrame = 0;
  }
}

function run() {
  if (!rafId) rafId = requestAnimationFrame(frame);
}

function onWheel(e: WheelEvent) {
  if (e.ctrlKey || locked) return;
  const el = e.target as Element | null;
  if (el?.closest?.('[data-native-scroll]')) return;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

  e.preventDefault();
  let d = e.deltaY;
  if (e.deltaMode === 1) d *= 40;
  else if (e.deltaMode === 2) d *= window.innerHeight;

  if (mode !== 'lerp') {
    current = window.scrollY;
    target = mode === 'tween' ? current : window.scrollY;
    tween = null;
  }
  target = clamp(target + d, 0, maxScroll());
  mode = 'lerp';
  run();
}

function onScroll() {
  // Durante a animação o próprio quadro já emitiu; aqui só tratamos rolagem
  // nativa (toque, teclado, barra) e o evento final de cada animação.
  if (mode !== 'idle') return;
  current = target = window.scrollY;
  emit();
}

function onKeyDown(e: KeyboardEvent) {
  if (!KEYS.has(e.key)) return;
  const el = e.target as HTMLElement | null;
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
  if (mode !== 'idle') halt();
}

function onPointerDown(e: PointerEvent) {
  // Clique na barra de rolagem: devolve o controle para o navegador.
  if (mode !== 'idle' && e.clientX >= document.documentElement.clientWidth) halt();
}

function onResize() {
  target = clamp(target, 0, maxScroll());
  emit();
}

export function initSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  enabled = !reduce && fine;

  current = target = lastY = window.scrollY;
  state.y = window.scrollY;

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  if (enabled) {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
  }

  return () => {
    halt();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointerdown', onPointerDown);
  };
}

/** Assina a rolagem. O callback roda no mesmo quadro em que a página se move. */
export function onScrollFrame(listener: Listener) {
  listeners.add(listener);
  listener(state);
  return () => {
    listeners.delete(listener);
  };
}

/** Velocidade atual; volta a zero quando a página para. */
export function getVelocity() {
  return performance.now() - lastEmit > 90 ? 0 : state.velocity;
}

export function getScrollY() {
  return state.y;
}

export function scrollTo(dest: number | string | HTMLElement, opts: ScrollToOptions = {}) {
  let el: HTMLElement | null = null;
  if (typeof dest === 'string') el = document.querySelector<HTMLElement>(dest);
  else if (typeof dest !== 'number') el = dest;
  if (typeof dest !== 'number' && !el) return;

  let y = typeof dest === 'number' ? dest : el!.getBoundingClientRect().top + window.scrollY;
  if (el) y -= parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  y = clamp(y + (opts.offset ?? 0), 0, maxScroll());

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (opts.immediate) {
    halt();
    window.scrollTo(0, y);
    current = target = y;
    emit();
    return;
  }
  if (!enabled) {
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    return;
  }

  const from = window.scrollY;
  const distance = Math.abs(y - from);
  tween = {
    from,
    to: y,
    start: performance.now(),
    duration: opts.duration ?? clamp(700 + distance * 0.25, 900, 2000),
  };
  target = y;
  mode = 'tween';
  run();
}

/** Trava a rolagem (menu aberto, splash). */
export function lockScroll() {
  locked = true;
  halt();
  document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll() {
  locked = false;
  document.documentElement.style.overflow = '';
  current = target = window.scrollY;
}
