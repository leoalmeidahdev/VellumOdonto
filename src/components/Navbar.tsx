import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { contact, navLinks } from '../data';
import { useScrollFrame } from '../hooks';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';
import Button from './Button';

const menuLinks = [{ label: 'Início', href: '#topo' }, ...navLinks];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Some ao descer, volta ao subir; a barra fina embaixo mostra o progresso da página (11).
  useScrollFrame(({ y, direction }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    setHidden(y > 240 && direction === 1);
  });

  useLayoutEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`nav-shell fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-vellum/80 px-4 py-2 backdrop-blur-md md:px-6 md:py-3 ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <a href="#topo" className="flex flex-col" aria-label="Vellum Odonto — início">
          <span className="text-xl font-extrabold uppercase leading-none tracking-tight md:text-2xl">Vellum</span>
          <span className="-mt-0.5 text-xl font-extrabold uppercase leading-none tracking-tight md:-mt-1 md:text-2xl">Odonto</span>
          <span className="mt-1.5 text-[8px] font-medium leading-none md:mt-2 md:text-[9px]">odontologia de precisão</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="fx-underline text-sm">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={contact.phoneHref} className="mr-2 flex items-center gap-2 text-sm font-semibold">
            <span className="fx-pulse h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
            Urgência 24h
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="nav-btn-outline rounded-full border border-ink bg-white px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-ink hover:text-vellum"
            aria-expanded={open}
            aria-controls="menu-painel"
          >
            Menu
          </button>
          <Button href="#contato" shine className="nav-btn-solid px-6 py-3 text-sm">
            Agendar
          </Button>
        </div>

        <button
          type="button"
          className="nav-burger relative flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-painel"
        >
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ease-curtain ${
              open ? 'translate-y-0 rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ease-curtain ${
              open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ease-curtain ${
              open ? 'translate-y-0 -rotate-45' : 'translate-y-2'
            }`}
          />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-current opacity-40" />
        </div>
      </header>

      {/* Painel do menu (todas as larguras; no celular abre pelo hambúrguer, no desktop pelo botão Menu) */}
      <div className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <aside
          id="menu-painel"
          data-native-scroll
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-vellum text-ink shadow-2xl transition-transform duration-500 ease-curtain md:max-w-md ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Menu"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-vellum"
            aria-label="Fechar menu"
            tabIndex={open ? 0 : -1}
          >
            <span className="absolute h-px w-4 rotate-45 bg-current" />
            <span className="absolute h-px w-4 -rotate-45 bg-current" />
          </button>

          <div className="flex h-full min-h-[560px] flex-col justify-center gap-1 px-8">
            {menuLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`font-serif text-5xl leading-tight text-ink transition-all duration-500 ease-curtain hover:translate-x-2 hover:text-graphite ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
              >
                {l.label}
              </a>
            ))}

            <div
              className={`mt-8 border-t border-ink/15 pt-8 transition-all duration-500 ease-curtain ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: open ? '450ms' : '0ms' }}
            >
              <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
                <span className="fx-pulse h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
                Urgência odontológica 24h
              </p>
              <p className="mb-5 text-sm text-graphite">{contact.phone}</p>
              <Button
                href="#contato"
                onClick={() => setOpen(false)}
                shine
                wrapperClassName="w-full"
                className="w-full px-6 py-4 text-sm"
              >
                Agendar avaliação
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
