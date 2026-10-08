import { useRef, type CSSProperties } from 'react';
import MaskedCard from '../components/MaskedCard';
import { CircleBadge } from '../components/Icons';
import { HERO_IMAGE, featureBars } from '../data';
import { useImageWidth, useIsMobile, useMaskPositions, useStaggeredReveal } from '../hooks';
import { useMagnet } from '../hooks/interaction';

/** Seção 1 — três barras e o card principal mostram janelas da mesma foto. */
export default function Hero({ ready }: { ready: boolean }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cardRefs);
  const imageWidth = useImageWidth(HERO_IMAGE, positions[0]?.sh ?? 0);
  const s1Reveal = useStaggeredReveal(4, 0.15, ready);
  const badgeRef = useMagnet<HTMLAnchorElement>(0.35);
  const focalX = isMobile ? 0.7 : 0.8;
  const inClass = ready ? 'is-in' : '';

  const setSectionRef = (el: HTMLElement | null) => {
    sectionRef.current = el;
    s1Reveal.containerRef.current = el;
  };

  return (
    <section
      id="topo"
      data-theme-section="vellum"
      ref={setSectionRef}
      className="relative flex h-svh min-h-[580px] w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-24 md:gap-2 md:px-5 md:pb-2 md:pt-24"
    >
      {featureBars.map((label, i) => (
        <MaskedCard
          key={label}
          cardRef={(el) => {
            cardRefs.current[i] = el;
          }}
          bgImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="relative h-14 w-full shrink-0 overflow-hidden rounded-xl md:h-20 md:rounded-2xl"
          style={s1Reveal.getAnimStyle(i)}
        >
          <span className="relative z-10 flex h-full items-center justify-center text-center text-lg font-bold text-ink md:text-3xl">
            {label}
          </span>
        </MaskedCard>
      ))}

      <MaskedCard
        cardRef={(el) => {
          cardRefs.current[3] = el;
        }}
        bgImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl md:rounded-2xl"
        style={s1Reveal.getAnimStyle(3)}
      >
        <div className="absolute left-4 top-4 z-10 max-w-[210px] md:left-7 md:top-7 md:max-w-[320px]">
          <p className="text-xs font-semibold leading-4 text-ink md:text-sm md:leading-5">
            Odontologia estética e reabilitadora com tecnologia digital e um cuidado que você sente em cada detalhe.
          </p>
          <a href="#sorrisos" className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-graphite md:mt-6">
            <span className="fx-bounce inline-block" aria-hidden="true">
              ↓
            </span>
            Role para descobrir
          </a>
        </div>

        <div className="absolute bottom-5 left-3 z-10 md:bottom-8 md:left-5">
          <span
            data-reveal="slide-l"
            className={`mb-1 block text-xs font-semibold text-white md:mb-3 md:text-sm md:text-ink ${inClass}`}
            style={{ '--d': '450ms' } as CSSProperties}
          >
            Sua clínica odontológica de confiança
          </span>
          <h1 className="font-serif text-[clamp(3.5rem,11vw,11rem)] leading-[0.82] tracking-tight text-white md:text-ink">
            <span data-reveal="blur" className={`inline-block ${inClass}`} style={{ '--d': '300ms' } as CSSProperties}>
              Seu melhor
            </span>
            <br />
            <span data-reveal="blur" className={`inline-block italic ${inClass}`} style={{ '--d': '480ms' } as CSSProperties}>
              sorriso
            </span>
          </h1>
        </div>

        <div
          data-reveal="pop"
          className={`absolute bottom-5 right-4 z-10 md:bottom-8 md:right-8 ${inClass}`}
          style={{ '--d': '800ms' } as CSSProperties}
        >
          <a
            ref={badgeRef}
            href="#contato"
            className="fx-magnet block text-white"
            aria-label="Agende sua avaliação"
          >
            <CircleBadge text="Agende sua avaliação • Vellum Odonto • " className="h-20 w-20 md:h-32 md:w-32" />
          </a>
        </div>
      </MaskedCard>
    </section>
  );
}
