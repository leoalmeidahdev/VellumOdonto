import { useEffect, useRef, type ReactNode } from 'react';
import { getVelocity, onScrollFrame } from '../lib/smoothScroll';

type Props = { children: ReactNode; className?: string; speed?: number };

/**
 * 17 · Esteira infinita, ligada à rolagem: acelera quando a página rola e
 * inverte o sentido quando o usuário sobe. O conteúdo é duplicado e o
 * trilho volta ao início ao completar meia volta.
 */
export default function VelocityMarquee({ children, className = '', speed = 0.05 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let half = track.scrollWidth / 2;
    let x = 0;
    let dir = 1;
    let current = speed;
    let raf = 0;
    let last = 0;
    let visible = false;

    const ro = new ResizeObserver(() => (half = track.scrollWidth / 2));
    ro.observe(track);
    const offScroll = onScrollFrame((s) => {
      if (Math.abs(s.velocity) > 0.5) dir = s.direction;
    });

    const loop = (now: number) => {
      const dt = Math.min(48, last ? now - last : 16);
      last = now;
      const goal = speed + Math.min(Math.abs(getVelocity()) * 0.014, 0.6);
      current += (goal - current) * 0.08;
      x -= current * dt * dir;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(wrap);

    return () => {
      io.disconnect();
      ro.disconnect();
      offScroll();
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
