import type { CSSProperties } from 'react';
import Reveal from '../components/Reveal';
import { testimonials } from '../data';

function Row({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  // Cada metade da esteira precisa ser mais larga que a tela, senão aparece um buraco.
  const cards = [...items, ...items].map((t, i) => (
    <figure key={`${t.name}-${i}`} className="fx-lift mr-1.5 flex w-[300px] shrink-0 flex-col justify-between rounded-xl bg-paper p-6 md:mr-2 md:w-[400px] md:rounded-2xl md:p-8">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-graphite">{t.tag}</span>
      <blockquote className="my-8 font-serif text-2xl leading-[1.15] text-ink md:text-[1.75rem]">“{t.quote}”</blockquote>
      <figcaption className="text-sm text-graphite">{t.name}</figcaption>
    </figure>
  ));
  return (
    <div className="fx-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      {/* Esteira infinita (17) em CSS puro; pausa ao passar o mouse */}
      <div className={`fx-marquee ${reverse ? 'is-reverse' : ''}`} style={{ '--dur': '70s' } as CSSProperties}>
        {cards}
        <div className="flex" aria-hidden="true">
          {cards}
        </div>
      </div>
    </div>
  );
}

/** Depoimentos em duas esteiras infinitas. */
export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section data-theme-section="vellum" className="px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2" aria-labelledby="depoimentos-titulo">
      <div className="overflow-hidden rounded-xl bg-sand py-16 md:rounded-2xl md:py-28">
        <div className="mb-12 px-6 md:mb-16 md:px-16">
          <Reveal variant="slide-l" className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-graphite">
            <span className="h-px w-10 bg-graphite" aria-hidden="true" />
            Depoimentos
          </Reveal>
          <Reveal as="h2" id="depoimentos-titulo" variant="blur" className="max-w-4xl font-serif text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[0.95] text-ink">
            Histórias reais de quem
            <br />
            <em>voltou a sorrir</em>
          </Reveal>
        </div>
        <div className="flex flex-col gap-1.5 md:gap-2">
          <Row items={testimonials.slice(0, half)} />
          <Row items={testimonials.slice(half)} reverse />
        </div>
      </div>
    </section>
  );
}
