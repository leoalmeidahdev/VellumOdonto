import { useRef, useState } from 'react';
import { useScrollFrame } from '../hooks';
import { scrollTo } from '../lib/smoothScroll';

const R = 22;
const C = 2 * Math.PI * R;

/** Voltar ao topo com anel de progresso (11) e seta que quica no hover (16). */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useScrollFrame(({ y }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setShow(y > window.innerHeight * 1.2);
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - (max > 0 ? y / max : 0)));
  });

  return (
    <button
      type="button"
      onClick={() => scrollTo(0)}
      aria-label="Voltar ao topo"
      className={`group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink/90 text-vellum shadow-lg backdrop-blur-md transition-all duration-500 ease-expo md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg viewBox="0 0 50 50" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="25" cy="25" r={R} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
        <circle ref={ringRef} cx="25" cy="25" r={R} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <span className="fx-bounce-hover text-lg leading-none" aria-hidden="true">
        ↑
      </span>
    </button>
  );
}
