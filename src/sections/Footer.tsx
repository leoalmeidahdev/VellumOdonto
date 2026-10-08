import { useState, type CSSProperties, type FormEvent } from 'react';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import { contact, navLinks, treatments } from '../data';
import { useReveal } from '../hooks';

const BRAND = 'Vellum';

export default function Footer() {
  const [sent, setSent] = useState(false);
  const wordRef = useReveal<HTMLDivElement>();

  // Sem back-end: apenas confirma na tela. Conecte ao seu serviço de e-mail aqui.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer data-theme-section="ink" className="px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2">
      <div className="overflow-hidden rounded-xl bg-ink px-5 pb-6 pt-20 text-vellum md:rounded-2xl md:px-10 md:pt-32">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Reveal as="h2" variant="blur" className="max-w-md font-serif text-4xl leading-[1.05] text-taupe md:text-5xl">
            Receba dicas para cuidar do seu sorriso
          </Reveal>
          {sent ? (
            <p className="mt-8 text-sm text-vellum" role="status">
              Obrigado! Em breve você recebe novidades da Vellum.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex max-w-md items-center gap-2 border-b border-vellum/25 pb-2">
              <label htmlFor="newsletter" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Seu e-mail"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-vellum placeholder:text-taupe focus:outline-none"
              />
              <Button type="submit" variant="cream" className="px-5 py-3 text-sm">
                Assinar
              </Button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold text-taupe">Clínica</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="fx-underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-taupe">Tratamentos</h3>
            <ul className="space-y-2">
              {treatments.map((t) => (
                <li key={t.title}>
                  <a href="#tratamentos" className="fx-underline">
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-taupe">Contato</h3>
            <ul className="space-y-2 text-vellum/80">
              <li>{contact.address}</li>
              <li>{contact.city}</li>
              <li>
                <a href={contact.phoneHref} className="fx-underline">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="fx-underline break-all">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="fx-underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Assinatura gigante: as letras sobem em cascata (02 + 05) */}
      <div
        ref={wordRef}
        aria-hidden="true"
        className="mt-16 flex select-none justify-center font-serif text-[33vw] leading-[0.8] tracking-[-0.02em] text-vellum md:mt-24"
      >
        {BRAND.split('').map((ch, i) => (
          <span key={i} data-reveal="up" className="inline-block" style={{ '--d': `${i * 70}ms` } as CSSProperties}>
            {ch}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-vellum/15 pt-6 text-xs text-taupe md:flex-row md:justify-between md:pr-20">
        <p>© {new Date().getFullYear()} Vellum Odonto. Todos os direitos reservados.</p>
        <p>{contact.responsible}</p>
      </div>
      </div>
    </footer>
  );
}
