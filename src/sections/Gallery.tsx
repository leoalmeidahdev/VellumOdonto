import { useRef, useState } from 'react';
import Button from '../components/Button';
import MaskedCard from '../components/MaskedCard';
import { SECTION2_IMAGE, services } from '../data';
import { useImageWidth, useIsMobile, useMaskPositions, useStaggeredReveal } from '../hooks';
import { spawnRipple } from '../hooks/interaction';

/** Seção 2 — galeria em mosaico sobre a mesma foto. */
export default function Gallery() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cardRefs);
  const imageWidth = useImageWidth(SECTION2_IMAGE, positions[0]?.sh ?? 0);
  const s2Reveal = useStaggeredReveal(4);
  const [active, setActive] = useState(0);
  const focalX = isMobile ? 0.65 : 0.8;

  const setSectionRef = (el: HTMLElement | null) => {
    sectionRef.current = el;
    s2Reveal.containerRef.current = el;
  };
  const card = (i: number) => ({
    cardRef: (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    bgImage: SECTION2_IMAGE,
    position: positions[i],
    imageWidth,
    focalX,
    style: s2Reveal.getAnimStyle(i),
  });

  return (
    <section
      id="sorrisos"
      data-theme-section="vellum"
      ref={setSectionRef}
      className="relative flex min-h-screen w-full scroll-mt-20 flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-1.5 md:h-screen md:gap-2 md:px-5 md:pb-2 md:pt-2"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-1.5 md:grid-cols-2 md:grid-rows-[1fr_1fr_0.8fr] md:gap-2">
        <MaskedCard {...card(0)} className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/20 to-transparent md:hidden" />
          <h2 className="absolute left-5 top-4 z-10 font-serif text-4xl leading-none text-white drop-shadow-sm md:left-7 md:top-6 md:text-5xl md:text-ink md:drop-shadow-none">
            Galeria de sorrisos
          </h2>
          <p className="absolute bottom-4 left-5 z-10 text-xs font-semibold text-white md:bottom-6 md:left-7 md:text-sm md:text-ink">
            Nossos trabalhos de odontologia estética
          </p>
        </MaskedCard>

        <MaskedCard {...card(1)} className="relative min-h-[220px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent md:hidden" />
          <p className="absolute bottom-20 left-5 z-10 text-xs font-semibold leading-4 text-white md:bottom-24 md:left-7 md:text-sm md:leading-5">
            Quer um sorriso que tenha a sua cara?
            <br />
            Fale com a gente sobre um design de sorriso.
          </p>
          <Button
            href="#contato"
            variant="white"
            magnet={0.35}
            wrapperClassName="absolute bottom-4 right-4 z-10 md:bottom-6 md:right-6"
            className="px-5 py-3 text-base hover:scale-105 md:px-8 md:py-5 md:text-xl"
          >
            Fale conosco
          </Button>
        </MaskedCard>

        <MaskedCard {...card(2)} className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/20 to-transparent md:hidden" />
          <h3 className="absolute left-5 top-4 z-10 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] text-white md:left-7 md:top-6 md:text-ink">
            Design
            <br />
            <em>de sorriso</em>
          </h3>
        </MaskedCard>

        <MaskedCard {...card(3)} className="relative col-span-1 min-h-[220px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl">
          <div className="absolute inset-0 z-10 flex flex-wrap gap-1.5 p-2 md:flex-nowrap md:gap-2 md:p-3">
            {services.map((svc, i) => {
              const on = i === active;
              return (
                <button
                  key={svc.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onPointerDown={spawnRipple}
                  aria-pressed={on}
                  className={`relative flex min-w-[calc(50%-4px)] flex-1 flex-col justify-between overflow-hidden rounded-xl p-3 text-left transition-[background-color,color,flex-grow] duration-500 ease-expo md:min-w-0 md:rounded-2xl md:p-5 ${
                    on ? 'bg-white/90 text-ink backdrop-blur-md md:flex-[1.35]' : 'bg-white/20 text-white backdrop-blur-xl'
                  }`}
                >
                  <h3 className="whitespace-pre-line text-xl font-bold leading-[1.05] md:text-4xl">{svc.name}</h3>
                  {svc.num && (
                    <span
                      className={`flex h-8 w-8 items-center justify-center self-end rounded-full border text-xs font-semibold transition-colors duration-500 md:h-12 md:w-12 md:text-sm ${
                        on ? 'border-ink' : 'border-white'
                      }`}
                    >
                      {svc.num}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}
