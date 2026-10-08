import { useRef, type CSSProperties } from 'react';
import Counter from '../components/Counter';
import Reveal from '../components/Reveal';
import { stats } from '../data';
import { useReveal, useScrollFrame } from '../hooks';

const TEXT =
  'Cada sorriso é único. Por isso, tudo na Vellum começa com escuta, diagnóstico digital e um plano feito sob medida — para resultados naturais, confortáveis e duradouros.';
const WORDS = TEXT.split(' ');

/**
 * Manifesto: o texto acende palavra por palavra conforme a página rola,
 * amarrado à posição da rolagem.
 */
export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useReveal<HTMLDivElement>();

  useScrollFrame(() => {
    const el = textRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.top > vh || r.bottom < 0) return;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.4 + r.height)));
    el.style.setProperty('--p', p.toFixed(4));
  });

  return (
    <section id="clinica" data-theme-section="vellum" className="scroll-mt-20 px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2">
      <div className="rounded-xl bg-paper px-6 py-20 md:rounded-2xl md:px-16 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="slide-l" className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-graphite md:mb-12">
            <span className="h-px w-10 bg-graphite" aria-hidden="true" />A clínica
          </Reveal>

          <p
            ref={textRef}
            className="font-serif text-[clamp(2.1rem,4.6vw,4.6rem)] leading-[1.06] tracking-[-0.01em] text-graphite"
            style={{ '--n': WORDS.length } as CSSProperties}
          >
            {WORDS.map((w, i) => (
              <span key={i} className="scrub-word" style={{ '--i': i } as CSSProperties}>
                {w}{' '}
              </span>
            ))}
          </p>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_2fr] md:gap-16">
            <Reveal variant="blur" className="max-w-sm text-sm leading-6 text-graphite">
              <em className="font-serif text-xl not-italic text-ink">Vellum</em> é o pergaminho mais fino e liso já produzido — a
              superfície onde se registravam as obras mais preciosas. É com esse mesmo cuidado que tratamos o seu sorriso.
            </Reveal>

            <div ref={statsRef} className="grid gap-8 sm:grid-cols-3">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal="up" style={{ '--d': `${i * 120}ms` } as CSSProperties}>
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} className="block font-serif text-6xl leading-none text-ink md:text-7xl" />
                  <div className="fx-bar mt-4 h-[3px] rounded-full bg-ink/10" style={{ '--to': s.bar, '--d': `${i * 160}ms` } as CSSProperties}>
                    <span className="bg-ink" />
                  </div>
                  <p className="mt-3 text-sm text-graphite">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
