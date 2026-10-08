import { useEffect, useRef, useState } from 'react';

type Props = { phrases: string[]; className?: string };

/** 19 · Máquina de escrever: digita, segura, apaga e passa para a próxima frase. */
export default function Typewriter({ phrases, className }: Props) {
  const [text, setText] = useState(phrases[0]);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    let phrase = 0;
    let chars = 0;
    let deleting = false;
    let started = false;

    const step = () => {
      const full = phrases[phrase];
      if (!deleting) {
        chars++;
        setText(full.slice(0, chars));
        if (chars >= full.length) {
          deleting = true;
          timer = window.setTimeout(step, 2200);
          return;
        }
        timer = window.setTimeout(step, 55 + Math.random() * 45);
      } else {
        chars--;
        setText(full.slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = window.setTimeout(step, 350);
          return;
        }
        timer = window.setTimeout(step, 28);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        setText('');
        timer = window.setTimeout(step, 400);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [phrases]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="fx-caret" aria-hidden="true" />
      <span className="sr-only">{phrases.join(', ')}</span>
    </span>
  );
}
