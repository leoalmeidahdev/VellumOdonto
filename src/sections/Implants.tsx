import { useRef, useState, type CSSProperties } from 'react';
import Button from '../components/Button';
import { ArrowIcon } from '../components/Icons';
import {
  SECTION3_BG,
  SECTION3_BG_SM,
  SECTION3_IMG1,
  SECTION3_IMG1_SM,
  SECTION3_IMG2,
  SECTION3_IMG2_SM,
} from '../data';
import { useReveal, useScrollFrame, useStaggeredReveal } from '../hooks';
import { useTilt } from '../hooks/interaction';

/** Imagem com esqueleto (15) até carregar. */
function Photo({ src, srcSm, alt, className = '', imgClassName = '' }: { src: string; srcSm: string; alt: string; className?: string; imgClassName?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${loaded ? '' : 'fx-skel'} ${className}`}>
      <img
        src={src}
        srcSet={`${srcSm} 700w, ${src} 1200w`}
        sizes="(max-width: 767px) 50vw, 25vw"
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}

/** Seção 3 — Implantes. */
export default function Implants() {
  const s3Reveal = useStaggeredReveal(4);
  const curtainRef = useReveal<HTMLHeadingElement>();
  const tiltRef = useTilt<HTMLDivElement>(6);
  const [flipped, setFlipped] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const bgRef = useRef<HTMLImageElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);

  // Parallax lento da foto grande: a imagem anda mais devagar que a página.
  useScrollFrame(() => {
    const wrap = bgWrapRef.current;
    const img = bgRef.current;
    if (!wrap || !img) return;
    const r = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
    img.style.transform = `translate3d(0, ${p * -6}%, 0) scale(1.14)`;
  });

  return (
    <section
      id="implantes"
      data-theme-section="vellum"
      ref={(el) => {
        s3Reveal.containerRef.current = el;
      }}
      className="flex min-h-screen w-full scroll-mt-20 flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-1.5 md:h-screen md:gap-2 md:px-5 md:pb-2 md:pt-2"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          {/* Cortina (21) revelando o título */}
          <div
            className="flex min-h-[200px] flex-[1.2] flex-col justify-between rounded-xl bg-paper p-5 md:min-h-0 md:rounded-2xl md:p-7"
            style={s3Reveal.getAnimStyle(0)}
          >
            <h2 ref={curtainRef} className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-ink">
              <span className="fx-curtain" style={{ '--d': '200ms' } as CSSProperties}>
                <span>Implantes</span>
              </span>
              <br />
              <span className="fx-curtain" style={{ '--d': '380ms' } as CSSProperties}>
                <span>
                  <em>dentários</em>
                </span>
              </span>
            </h2>
            <p className="text-xs font-semibold text-ink md:text-sm">Reponha dentes perdidos com segurança e naturalidade</p>
          </div>

          <div className="flex min-h-[150px] flex-1 gap-1.5 md:min-h-0 md:gap-2" style={s3Reveal.getAnimStyle(1)}>
            {/* Flutuar (13): a coroa paira sobre o implante */}
            <div className="relative flex-1 overflow-hidden rounded-xl bg-[#BAD1D5] md:rounded-2xl">
              <div className="fx-float absolute inset-0" style={{ '--float': '-10px' } as CSSProperties}>
                <Photo src={SECTION3_IMG1} srcSm={SECTION3_IMG1_SM} alt="Coroa dentária sobre implante" className="h-full w-full" imgClassName="scale-110" />
              </div>
            </div>
            {/* Inclinar em 3D (24) */}
            <div ref={tiltRef} className="fx-tilt relative flex-1 overflow-hidden rounded-xl md:rounded-2xl">
              <Photo src={SECTION3_IMG2} srcSm={SECTION3_IMG2_SM} alt="Implante dentário instalado entre dentes naturais" className="h-full w-full" />
            </div>
          </div>

          <div
            className="flex min-h-[170px] flex-[0.8] items-end justify-between gap-4 rounded-xl bg-sand p-5 md:min-h-0 md:rounded-2xl md:p-7"
            style={s3Reveal.getAnimStyle(2)}
          >
            <div>
              <p className="mb-2 text-xs font-semibold text-ink md:mb-3 md:text-sm">Consulta</p>
              <h3 className="text-xl font-bold leading-6 text-ink md:text-3xl md:leading-8">
                Restauração
                <br />
                dentária
                <br />
                completa
              </h3>
            </div>
            <Button href="#contato" variant="white" shine magnet={0.35} className="px-5 py-3 text-base hover:scale-105 md:px-8 md:py-5 md:text-xl">
              Agendar online
            </Button>
          </div>
        </div>

        <div
          ref={bgWrapRef}
          className="relative min-h-[420px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={s3Reveal.getAnimStyle(3)}
        >
          <img
            ref={bgRef}
            src={SECTION3_BG}
            srcSet={`${SECTION3_BG_SM} 800w, ${SECTION3_BG} 1360w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Paciente sorrindo"
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.14] object-cover will-change-transform"
          />

          <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 md:bottom-5 md:left-5 md:right-5 md:gap-2">
            {/* Card que vira (23) */}
            <button
              type="button"
              className="fx-flip h-40 flex-1 text-left md:h-56"
              data-flipped={flipped}
              onClick={() => setFlipped((f) => !f)}
              aria-label="O processo de instalação de implantes"
            >
              <div className="fx-flip-faces">
                <div className="fx-face flex flex-col justify-between rounded-xl bg-white p-3 md:rounded-2xl md:p-5">
                  <h4 className="text-lg font-bold leading-5 text-ink md:text-2xl md:leading-7">
                    O processo
                    <br />
                    de instalação
                    <br />
                    de implantes
                  </h4>
                  <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-ink md:h-12 md:w-12">
                    <ArrowIcon />
                  </span>
                </div>
                <div className="fx-face fx-face-back flex flex-col justify-between rounded-xl bg-ink p-3 text-vellum md:rounded-2xl md:p-5">
                  <ol className="space-y-1 text-[11px] leading-4 md:space-y-2 md:text-sm md:leading-5">
                    <li>
                      <b className="font-bold">1.</b> Avaliação e tomografia
                    </li>
                    <li>
                      <b className="font-bold">2.</b> Instalação do implante
                    </li>
                    <li>
                      <b className="font-bold">3.</b> Cicatrização e integração ao osso
                    </li>
                    <li>
                      <b className="font-bold">4.</b> Coroa definitiva sob medida
                    </li>
                  </ol>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-taupe md:text-xs">Etapas do tratamento</span>
                </div>
              </div>
            </button>

            {/* Vidro: ao passar o mouse, o título sobe e as dicas deslizam (06) */}
            <button
              type="button"
              onClick={() => setCareOpen((o) => !o)}
              aria-expanded={careOpen}
              className="group relative flex h-40 flex-1 flex-col justify-between overflow-hidden rounded-xl bg-white/20 p-3 text-left backdrop-blur-xl md:h-56 md:rounded-2xl md:p-5"
            >
              <h4
                className={`text-lg font-bold leading-5 text-white transition-all duration-500 ease-expo md:text-2xl md:leading-7 ${
                  careOpen ? '-translate-y-3 opacity-0' : 'group-hover:-translate-y-3 group-hover:opacity-0'
                }`}
              >
                Cuidados
                <br />
                com seus
                <br />
                implantes
              </h4>
              <p
                className={`absolute inset-x-3 top-3 text-[11px] leading-4 text-white transition-all duration-500 ease-expo md:inset-x-5 md:top-5 md:text-sm md:leading-5 ${
                  careOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                Escovação suave, fio ou escova interdental todos os dias e retornos de manutenção a cada 6 meses.
              </p>
              <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-white text-white transition-transform duration-500 ease-expo group-hover:rotate-45 md:h-12 md:w-12">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
