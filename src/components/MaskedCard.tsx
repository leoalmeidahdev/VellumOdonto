import type { CSSProperties, ReactNode, Ref } from 'react';
import type { MaskPosition } from '../hooks';

type Props = {
  bgImage: string;
  position?: MaskPosition;
  imageWidth: number;
  /** 0–1: qual parte da imagem fica visível quando ela é mais larga que a seção. */
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: Ref<HTMLDivElement>;
  style?: CSSProperties;
};

/**
 * Card que mostra uma "janela" de uma imagem compartilhada pela seção inteira.
 * Vários MaskedCards lado a lado formam um mosaico coeso da mesma foto.
 * Enquanto a imagem carrega, o card exibe o esqueleto (animação 15).
 */
export default function MaskedCard({ bgImage, position, imageWidth, focalX, className = '', children, cardRef, style }: Props) {
  const ready = Boolean(position && imageWidth);
  let bgStyle: CSSProperties = {};

  if (ready && position) {
    const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
    const focalOffset = overflow * focalX;
    bgStyle = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: `auto ${position.sh}px`,
      backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <div ref={cardRef} className={`${className} ${ready ? 'bg-[#FBFBFB]' : 'fx-skel'}`} style={{ ...bgStyle, ...style }}>
      {children}
    </div>
  );
}
