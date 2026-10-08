import { useState, type CSSProperties } from 'react';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import { journey } from '../data';
import { spawnRipple } from '../hooks/interaction';

/** Jornada do paciente: título fixo à esquerda e etapas em sanfona (12) à direita. */
export default function Journey() {
  const [open, setOpen] = useState(0);

  return (
    <section id="jornada" data-theme-section="ink" className="scroll-mt-20 px-3 pb-1.5 pt-1.5 text-vellum md:px-5 md:pb-2 md:pt-2">
      <div className="grid gap-1.5 md:grid-cols-2 md:gap-2">
        <div className="rounded-xl bg-[#262422] p-6 md:sticky md:top-24 md:self-start md:rounded-2xl md:p-10">
          <Reveal variant="slide-l" className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
            <span className="h-px w-10 bg-taupe" aria-hidden="true" />
            Sua jornada
          </Reveal>
          <Reveal as="h2" variant="blur" className="font-serif text-[clamp(2.6rem,5vw,5rem)] leading-[0.95]">
            Do primeiro olhar
            <br />
            <em>ao último retoque</em>
          </Reveal>
          <Reveal variant="up" delay={150} className="mt-6 max-w-md text-sm leading-6 text-vellum/70">
            Um caminho claro, sem surpresas. Você entende cada etapa, vê o resultado planejado antes de começar e tem a gente por
            perto depois do tratamento.
          </Reveal>

          {/* Traço que se desenha (22): a curva de um sorriso */}
          <Reveal variant="fade" delay={200} className="mt-10 md:mt-16">
            <svg viewBox="0 0 400 90" className="fx-draw w-full max-w-md text-taupe" fill="none" aria-hidden="true">
              <path d="M8 22c60 54 130 66 192 66S332 76 392 22" pathLength={1} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path
                d="M30 30c50 38 110 48 170 48s120-10 170-48"
                pathLength={1}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                style={{ '--i': 2 } as CSSProperties}
              />
            </svg>
          </Reveal>

          <div className="mt-10">
            <Button href="#contato" variant="cream" shine className="px-7 py-4 text-sm">
              Começar minha jornada
            </Button>
          </div>
        </div>

        <ol className="flex flex-col gap-1.5 md:gap-2">
          {journey.map((step, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={step.title} variant="up" delay={i * 90}>
                <div className="fx-acc rounded-xl bg-[#262422] md:rounded-2xl" data-open={isOpen}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onPointerDown={spawnRipple}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-5 overflow-hidden rounded-xl p-6 text-left md:gap-8 md:rounded-2xl md:p-10"
                  >
                    <span className="font-serif text-2xl tabular-nums text-taupe md:text-3xl">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-serif text-3xl leading-none md:text-5xl">{step.title}</span>
                    <span className="fx-acc-sign grid h-10 w-10 shrink-0 place-items-center rounded-full border border-vellum/30 text-xl leading-none md:h-12 md:w-12">
                      +
                    </span>
                  </button>
                  <div className="fx-acc-body">
                    <div>
                      <div className="px-6 pb-7 md:pl-[6.5rem] md:pr-10 md:pb-10">
                        <p className="max-w-lg text-sm leading-6 text-vellum/75 md:text-base md:leading-7">{step.text}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-vellum/20 px-3 py-1 text-xs text-vellum/80">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
