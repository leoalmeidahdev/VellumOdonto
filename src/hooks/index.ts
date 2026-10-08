import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { onScrollFrame, type ScrollState } from '../lib/smoothScroll';

export type MaskPosition = { x: number; y: number; sw: number; sh: number };

export function useIsMobile() {
  const query = '(max-width: 767px)';
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

/** Posição do card dentro da seção, por offsets de layout (ignora transforms de animação). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  if (node === ancestor) return { x, y };
  const a = ancestor.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - a.left, y: r.top - a.top };
}

export function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardRefs: RefObject<(HTMLElement | null)[]>,
) {
  const [positions, setPositions] = useState<MaskPosition[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => {
      const sw = section.offsetWidth;
      const sh = section.offsetHeight;
      setPositions(
        (cardRefs.current ?? []).map((card) => (card ? { ...offsetWithin(card, section), sw, sh } : { x: 0, y: 0, sw, sh })),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    (cardRefs.current ?? []).forEach((c) => c && ro.observe(c));
    return () => ro.disconnect();
  }, [sectionRef, cardRefs]);

  return positions;
}

/** Largura que a imagem teria se escalada para a altura da seção (0 até carregar). */
export function useImageWidth(src: string, sectionHeight: number) {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);
  if (!natural || !sectionHeight) return 0;
  return natural.w * (sectionHeight / natural.h);
}

/** Revelação em cascata (spec): dispara uma vez quando a seção cruza o threshold. */
export function useStaggeredReveal(count: number, threshold = 0.15, enabled = true) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, enabled, visible]);

  const getAnimStyle = useCallback(
    (index: number): React.CSSProperties => {
      const delay = `${Math.min(index, count) * 120}ms`;
      return {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}`,
      };
    },
    [visible, count],
  );

  return { containerRef, getAnimStyle, visible };
}

/** Adiciona .is-in ao elemento quando entra na tela (uma vez). Ativa as classes data-reveal / fx-*. */
const revealIO =
  typeof window !== 'undefined'
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in');
              revealIO.unobserve(e.target);
            }
          }),
        { rootMargin: '0px 0px -12% 0px' },
      )
    : (null as unknown as IntersectionObserver);

export function useReveal<T extends Element>() {
  return useCallback((el: T | null) => {
    if (el) revealIO.observe(el);
  }, []);
}

/** Roda o callback a cada quadro de rolagem, sem re-renderizar. */
export function useScrollFrame(cb: (s: ScrollState) => void) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => onScrollFrame((s) => ref.current(s)), []);
}
