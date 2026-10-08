import type { CSSProperties } from 'react';
import type { TreatmentIcon as TreatmentIconName } from '../data';

/** Seta do briefing (girada -45°). */
export function ArrowIcon({ className = '', angle = -45 }: { className?: string; angle?: number }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      style={{ transform: `rotate(${angle}deg)` }}
      aria-hidden="true"
    >
      <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" fill="currentColor" />
    </svg>
  );
}

const MOLAR =
  'M22 12c-6 0-10 5-10 12 0 6 3 9 5 14 2 6 2 14 6 14 4 0 4-8 6-12 1-2 2-3 3-3s2 1 3 3c2 4 2 12 6 12 4 0 4-8 6-14 2-5 5-8 5-14 0-7-4-12-10-12-5 0-6 3-10 3s-5-3-10-3z';

const ICONS: Record<TreatmentIconName, string[]> = {
  veneer: [
    'M21 13h22c3 0 5 3 4.4 6.6l-3.8 21C42.4 47 39 54 32 54s-10.4-7-11.6-13.4l-3.8-21C16 16 18 13 21 13z',
    'M14 18c0-5 3-9 8-9h20c5 0 8 4 8 9',
    'M27 24c-1 6-1 12 1 18',
  ],
  whitening: [MOLAR, 'M50 4v10M45 9h10', 'M8 40v6M5 43h6', 'M24 22c2-2 5-3 8-3'],
  implant: [
    'M20 10c0-3 3-5 6-5 2 0 4 1 6 1s4-1 6-1c3 0 6 2 6 5 0 7-4 12-12 12s-12-5-12-12z',
    'M27 25h10v5H27z',
    'M26 33h12l-2.5 22h-7z',
    'M24 39h16M25 45h14M26 51h12',
  ],
  aligner: [
    'M8 46c0-19 11-34 24-34s24 15 24 34',
    'M17 46c0-13 7-24 15-24s15 11 15 24',
    'M8 46h9M47 46h9',
    'M23 23l-3-5M32 21v-6M41 23l3-5',
  ],
  crown: [MOLAR, 'M13 27c6 3 12 4 19 4s13-1 19-4', 'M20 20c3-2 6-3 9-3'],
  prevention: ['M32 5l20 7v17c0 13-9 22-20 29C21 51 12 42 12 29V12z', 'M23 31l6 6 12-13'],
};

/** Ícones de linha desenhados à mão; com .fx-draw o traço se desenha (22). */
export function TreatmentIcon({ name, className = '' }: { name: TreatmentIconName; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={`fx-draw ${className}`} aria-hidden="true">
      {ICONS[name].map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ '--i': i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** 08 · Girar: selo circular com texto em volta e seta no centro. */
export function CircleBadge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 100 100" className="fx-spin absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text fill="currentColor" fontSize="8.6" style={{ textTransform: 'uppercase' }}>
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="grid h-[38%] w-[38%] place-items-center rounded-full border border-current">
        <ArrowIcon angle={45} />
      </span>
    </span>
  );
}
