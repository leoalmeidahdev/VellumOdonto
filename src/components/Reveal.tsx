import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks';

type Variant = 'fade' | 'up' | 'blur' | 'pop' | 'slide-l' | 'slide-r' | 'clip';

type Props = {
  as?: ElementType;
  variant?: Variant;
  /** Atraso em ms (cascata). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

/** Anima o elemento quando ele entra na tela (uma vez). */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, style, children, id }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} id={id} data-reveal={variant} className={className} style={{ '--d': `${delay}ms`, ...style } as CSSProperties}>
      {children}
    </Tag>
  );
}
