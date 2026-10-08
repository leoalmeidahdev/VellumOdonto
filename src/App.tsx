import { useCallback, useEffect, useState } from 'react';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import { useAnchorLinks, useThemeSections } from './hooks/interaction';
import { initSmoothScroll } from './lib/smoothScroll';
import CallToAction from './sections/CallToAction';
import Footer from './sections/Footer';
import Gallery from './sections/Gallery';
import Hero from './sections/Hero';
import Implants from './sections/Implants';
import Journey from './sections/Journey';
import Manifesto from './sections/Manifesto';
import ServicesStrip from './sections/ServicesStrip';
import Testimonials from './sections/Testimonials';
import Treatments from './sections/Treatments';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !prefersReducedMotion());
  const [ready, setReady] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!location.hash) window.scrollTo(0, 0);
    return initSmoothScroll();
  }, []);

  useThemeSections();
  useAnchorLinks();

  const handleReveal = useCallback(() => setReady(true), []);
  const handleComplete = useCallback(() => setShowSplash(false), []);

  return (
    <div>
      {showSplash && <SplashScreen onReveal={handleReveal} onComplete={handleComplete} />}
      <Navbar />
      <main>
        <Hero ready={ready} />
        <ServicesStrip />
        <Gallery />
        <Implants />
        <Manifesto />
        <Treatments />
        <Journey />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
