import { useLayoutEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { ArrowIcon, TreatmentIcon } from '../components/Icons';
import { treatments } from '../data';
import { useReveal, useScrollFrame } from '../hooks';
import { useTilt } from '../hooks/interaction';

function TreatmentCard({ t, index }: { t: (typeof treatments)[number]; index: number }) {
  const revealRef = useReveal<HTMLElement>();
  const tiltRef = useTilt<HTMLDivElement>(5);
  const light = Boolean(t.light);

  return (
    <article ref={revealRef} className="h-full w-[80vw] shrink-0 sm:w-[46vw] lg:w-[31vw]">
      <div
        ref={tiltRef}
        className={`fx-tilt group relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 md:rounded-2xl md:p-8 ${
          light ? 'bg-vellum text-ink' : 'fx-grad text-vellum ring-1 ring-inset ring-white/10'
        }`}
      >
        <div className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.18em]">
          <span className={light ? 'text-graphite' : 'text-taupe'}>{t.tag}</span>
          <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Forma que muda (28) atrás do ícone que se desenha (22) */}
        <div className="relative mx-auto my-6 grid aspect-square w-[46%] max-w-[220px] place-items-center">
          <div
            className={`fx-blob absolute inset-0 ${light ? 'bg-sand' : 'bg-white/[0.06]'}`}
            style={{ animationDelay: `${index * -1.7}s` }}
            aria-hidden="true"
          />
          <TreatmentIcon name={t.icon} className="relative w-[58%]" />
        </div>

        <div>
          <h3 className="font-serif text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.02]">{t.title}</h3>
          <p className={`mt-3 max-w-sm text-sm leading-6 ${light ? 'text-graphite' : 'text-vellum/70'}`}>{t.text}</p>
          <a href="#contato" className="mt-6 inline-flex items-center gap-3 text-sm font-semibold">
            <span className="fx-underline">Agendar avaliação</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-current transition-transform duration-500 ease-expo group-hover:rotate-45">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Tratamentos: a seção fica presa na tela e a rolagem vertical move o trilho
 * de cards na horizontal. A altura da seção é calculada para que a rolagem
 * dure exatamente o comprimento do trilho.
 */
export default function Treatments() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useScrollFrame(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const r = section.getBoundingClientRect();
    const range = r.height - window.innerHeight;
    const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    if (countRef.current) {
      const current = Math.min(treatments.length, Math.floor(p * (treatments.length - 0.01)) + 1);
      countRef.current.textContent = String(current).padStart(2, '0');
    }
  });

  return (
    <section
      id="tratamentos"
      ref={sectionRef}
      data-theme-section="ink"
      className="relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col gap-4 overflow-hidden px-3 pb-2 pt-24 md:gap-6 md:px-5 md:pt-28">
        <div className="flex flex-col gap-4 text-vellum md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal variant="slide-l" className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
              <span className="h-px w-10 bg-taupe" aria-hidden="true" />
              Tratamentos
            </Reveal>
            <Reveal as="h2" variant="blur" className="font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.95]">
              Cuidado para cada
              <br />
              <em>detalhe do sorriso</em>
            </Reveal>
          </div>
          <Reveal variant="up" delay={150} className="flex w-full max-w-xs items-center gap-4 text-xs text-taupe md:mb-2">
            <span className="tabular-nums text-vellum">
              <span ref={countRef}>01</span> / {String(treatments.length).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-white/15">
              <span ref={barRef} className="block h-full origin-left scale-x-0 bg-vellum" />
            </span>
          </Reveal>
        </div>

        <div ref={viewportRef} className="min-h-0 flex-1">
          <div ref={trackRef} className="flex h-full gap-1.5 will-change-transform md:gap-2">
            {treatments.map((t, i) => (
              <TreatmentCard key={t.title} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
