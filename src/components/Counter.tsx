import { useEffect, useRef } from 'react';

type Props = { to: number; duration?: number; prefix?: string; suffix?: string; className?: string };

const fmt = new Intl.NumberFormat('pt-BR');

/** 18 · Contador: sobe até o valor quando entra na tela. Escreve direto no DOM, sem re-render. */
export default function Counter({ to, duration = 2000, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (v: number) => (el.textContent = `${prefix}${fmt.format(Math.round(v))}${suffix}`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(to);
      return;
    }
    render(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          render(to * (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`} aria-label={`${prefix}${fmt.format(to)}${suffix}`}>
      {prefix}
      {fmt.format(to)}
      {suffix}
    </span>
  );
}
