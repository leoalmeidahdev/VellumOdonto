import type { CSSProperties } from 'react';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import Typewriter from '../components/Typewriter';
import { contact } from '../data';

const WORD = 'sorriso';
const phrases = ['lentes de contato dental.', 'implantes dentários.', 'clareamento natural.', 'alinhadores invisíveis.'];

/** Chamada final: gradiente vivo (20), formas que mudam (28) e respiram (14), máquina de escrever (19). */
export default function CallToAction() {
  return (
    <section id="contato" data-theme-section="vellum" className="scroll-mt-20 px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2">
      <div className="fx-grad-light relative isolate overflow-hidden rounded-xl px-6 py-20 md:rounded-2xl md:px-16 md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="fx-blob absolute -right-24 -top-24 h-[420px] w-[420px] bg-white/70 blur-2xl md:h-[620px] md:w-[620px]" />
          <div
            className="fx-blob absolute -bottom-32 -left-20 h-[360px] w-[360px] bg-[#E3D6C3]/70 blur-2xl md:h-[520px] md:w-[520px]"
            style={{ animationDelay: '-4s' }}
          />
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal variant="slide-l" className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-graphite">
              <span className="h-px w-10 bg-graphite" aria-hidden="true" />
              Agende sua avaliação
            </Reveal>
            <Reveal as="h2" variant="blur" className="font-serif text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.88] tracking-tight text-ink">
              Seu novo{' '}
              <span className="fx-wave-hover italic" aria-label={WORD}>
                {WORD.split('').map((ch, i) => (
                  <span key={i} style={{ '--i': i } as CSSProperties} aria-hidden="true">
                    {ch}
                  </span>
                ))}
              </span>
              <br />
              começa aqui.
            </Reveal>
            <Reveal variant="up" delay={150} className="mt-8 text-lg text-graphite md:text-2xl">
              Converse com a gente sobre <Typewriter phrases={phrases} className="text-ink" />
            </Reveal>
            <Reveal variant="up" delay={250} className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={contact.whatsapp} target="_blank" shine magnet={0.3} className="px-8 py-5 text-base md:text-lg">
                Agendar pelo WhatsApp
              </Button>
              <Button href={contact.phoneHref} variant="outline" className="px-8 py-5 text-base md:text-lg">
                Ligar {contact.phone}
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-1.5 md:gap-2">
          <dl className="grid gap-1.5 sm:grid-cols-2 md:gap-2">
            {[
              ['Endereço', `${contact.address}\n${contact.city}`],
              ['Horário', contact.hours],
              ['Telefone', contact.phone],
              ['E-mail', contact.email],
            ].map(([k, v], i) => (
              <Reveal key={k} variant="pop" delay={i * 90} className="rounded-xl bg-white/60 p-5 backdrop-blur-md md:rounded-2xl">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-graphite">{k}</dt>
                <dd className="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{v}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal variant="pop" delay={360}>
            <a href={contact.phoneHref} className="fx-breathe flex items-center gap-3 rounded-xl bg-ink p-5 text-vellum md:rounded-2xl">
              <span className="fx-pulse h-2.5 w-2.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
              <span className="text-sm">
                <b className="font-bold">Urgência odontológica 24h</b> — dor, trauma ou dente quebrado? Ligue agora.
              </span>
            </a>
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
