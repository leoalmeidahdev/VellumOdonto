import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { scrollTo } from '../lib/smoothScroll';

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 30 · Ímã no cursor: o elemento é puxado na direção do mouse. */
export function useMagnet<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !strength || !finePointer() || reducedMotion()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };
    const leave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

/** 24 · Inclinar em 3D: o card acompanha o mouse em perspectiva. */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
    };
    const leave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [max]);
  return ref;
}

/** 25 · Onda no clique. O elemento precisa de position: relative e overflow: hidden. */
export function spawnRipple(e: ReactPointerEvent<HTMLElement>) {
  if (reducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const size = Math.max(r.width, r.height) * 2.4;
  const wave = document.createElement('span');
  wave.className = 'fx-ripple-wave';
  wave.style.width = wave.style.height = `${size}px`;
  wave.style.left = `${e.clientX - r.left}px`;
  wave.style.top = `${e.clientY - r.top}px`;
  el.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove());
}

/**
 * Cada seção declara data-theme-section="vellum" | "ink". A que cruza a
 * linha de troca define o tema do <html>, e o fundo da página faz a
 * transição de cor (ver index.css).
 */
export function useThemeSections() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            root.dataset.theme = (entry.target as HTMLElement).dataset.themeSection ?? 'vellum';
          }
        });
      },
      // Linha de troca a 65% da altura: a seção escura já pinta a página antes
      // de o título chegar ao topo.
      { rootMargin: '-65% 0px -35% 0px' },
    );
    document.querySelectorAll('[data-theme-section]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
}

/** Links internos (#ancora) usam a rolagem suave. */
export function useAnchorLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href')!;
      if (hash === '#') return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      scrollTo(target);
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
