import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

type Props = {
  /** Chamado quando a cortina começa a subir (a página por trás começa a animar). */
  onReveal: () => void;
  /** Chamado quando a splash pode sair do DOM. */
  onComplete: () => void;
};

const WORD = 'Vellum Odonto';

/**
 * Contador de 0 a 100 em 2 s (canto inferior esquerdo), barra de progresso (11)
 * e marca com texto em onda (27). Ao chegar em 100, a tela sobe como uma
 * cortina (21) revelando o site já em movimento.
 */
export default function SplashScreen({ onReveal, onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(id);
          return 100;
        }
        return c + 1;
      });
    }, 20);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (count < 100) return;
    const t1 = window.setTimeout(() => {
      setExiting(true);
      unlockScroll();
      onReveal();
    }, 200);
    const t2 = window.setTimeout(onComplete, 900 + 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [count, onReveal, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-vellum text-ink transition-transform duration-[900ms] ease-curtain ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden={exiting}
      role="status"
      aria-label="Carregando"
    >
      <div
        className={`flex items-start justify-between p-6 md:p-10 transition-opacity duration-300 ${exiting ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="fx-wave font-serif text-2xl md:text-3xl" aria-label={WORD}>
          {WORD.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </span>
        <span className="hidden text-right text-xs font-semibold uppercase tracking-[0.18em] text-graphite sm:block">
          Odontologia
          <br />
          de precisão
        </span>
      </div>

      <div className={`flex items-end justify-start transition-opacity duration-300 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
        <span className="p-6 text-7xl font-bold leading-none tabular-nums md:p-10 md:text-9xl">{count}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
        <div
          className="h-full origin-left bg-ink transition-transform duration-75 ease-linear"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}
