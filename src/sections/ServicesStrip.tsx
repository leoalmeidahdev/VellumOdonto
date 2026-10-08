import { Fragment } from 'react';
import { Sparkle } from '../components/Icons';
import VelocityMarquee from '../components/VelocityMarquee';
import { marqueeItems } from '../data';

/** Faixa entre as seções: esteira infinita que acelera com a rolagem. */
export default function ServicesStrip() {
  return (
    <section data-theme-section="vellum" className="px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2" aria-label="Especialidades">
      <VelocityMarquee className="rounded-xl bg-ink py-5 text-vellum md:rounded-2xl md:py-8">
        {marqueeItems.map((item) => (
          <Fragment key={item}>
            <span className="whitespace-nowrap px-6 font-serif text-4xl leading-none md:px-10 md:text-7xl">{item}</span>
            <Sparkle className="h-4 w-4 shrink-0 text-taupe md:h-6 md:w-6" />
          </Fragment>
        ))}
      </VelocityMarquee>
    </section>
  );
}
