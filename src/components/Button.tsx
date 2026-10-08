import type { ReactNode } from 'react';
import { spawnRipple, useMagnet } from '../hooks/interaction';

type Variant = 'ink' | 'white' | 'outline' | 'cream';

const variants: Record<Variant, string> = {
  ink: 'bg-ink text-vellum hover:bg-graphite',
  white: 'bg-white text-ink',
  cream: 'bg-vellum text-ink',
  outline: 'border border-current bg-transparent hover:bg-ink hover:text-vellum hover:border-ink',
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Classes do botão em si (tamanho, tipografia). */
  className?: string;
  /** Classes do invólucro magnético (posicionamento, largura). */
  wrapperClassName?: string;
  shine?: boolean;
  magnet?: number;
  target?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit';
};

/**
 * Botão da marca: ímã no cursor (30), onda no clique (25) e, opcionalmente,
 * brilho que atravessa (10). O ímã fica num invólucro para não brigar com
 * as transições do próprio botão.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'ink',
  className = 'px-6 py-3 text-sm',
  wrapperClassName = '',
  shine = false,
  magnet = 0.25,
  target,
  ariaLabel,
  type = 'button',
}: Props) {
  const magnetRef = useMagnet<HTMLSpanElement>(magnet);
  const classes = `relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold transition-[background-color,color,border-color,transform] duration-300 ease-expo active:scale-[0.97] ${variants[variant]} ${shine ? 'fx-shine' : ''} ${className}`;

  return (
    <span ref={magnetRef} className={`fx-magnet inline-block ${wrapperClassName}`}>
      {href ? (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
          onPointerDown={spawnRipple}
          onClick={onClick}
          className={classes}
        >
          {children}
        </a>
      ) : (
        <button type={type} aria-label={ariaLabel} onPointerDown={spawnRipple} onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </span>
  );
}
