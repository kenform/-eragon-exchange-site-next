'use client';

import { useEffect } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges } from '../components/exchange-data';
import { assets } from '../src/config/assets';

export default function HomePage() {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
    };

    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const h = hero.offsetHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / h));
      root.style.setProperty('--portalProgress', `${progress}`);
      root.style.setProperty('--portalShift', `${(progress * 8).toFixed(2)}px`);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in')),
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const heroBackgroundStyle = {
    backgroundImage: `
      radial-gradient(ellipse at 50% 34%, rgba(124,189,255,.24) 0%, rgba(67,120,214,.12) 38%, rgba(8,16,36,.56) 78%),
      linear-gradient(180deg, rgba(4,8,18,.66) 0%, rgba(5,10,22,.62) 42%, rgba(4,8,17,.74) 100%),
      url(${assets.hero.portalBg})
    `,
    backgroundSize: 'cover, cover, cover',
    backgroundPosition: 'center, center, center calc(32% + var(--portalShift))',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      <div className="atmo atmo-noise" aria-hidden="true" />
      <div className="atmo atmo-stars" aria-hidden="true" />
      <div className="atmo atmo-dust" aria-hidden="true" />
      <div className="atmo atmo-fog-back" aria-hidden="true" />
      <div className="atmo atmo-fog-mid" aria-hidden="true" />
      <div className="atmo atmo-fog-front" aria-hidden="true" />
      <div className="atmo atmo-aether" aria-hidden="true" />
      <div className="atmo atmo-moon" aria-hidden="true" />

      <div className="top-nav reveal">
        <div className="top-nav-inner">
          <a href="#hero" className="brand">Elven AI Lab</a>
          <nav>
            <a href="#hero">Врата</a>
            <a href="#gates">Дома</a>
            <a href="#oath">Клятва</a>
          </nav>
          <a href="#gates" className="mini-cta">Войти</a>
        </div>
      </div>

      <header id="hero" className="hero reveal" style={heroBackgroundStyle}>
        <div className="hero-scene" aria-hidden="true">
          <span
            className="dragon-silhouette-layer"
            aria-hidden="true"
            style={{ backgroundImage: `url(${assets.decor.dragonSilhouette})` }}
          />
        </div>

        <div className="hero-inner">
          <p className="kicker">Elven AI Lab · Ellesméra Gateway</p>
          <h1 className="hero-title">Лунные Врата Эллесмеры</h1>
          <p className="hero-line">Выбери свой путь</p>
          <p className="subtitle">Открой врата и следуй дисциплине.</p>

          <div className="hero-cta-row">
            <a href="#gates" className="btn btn-primary">Открыть Врата</a>
            <a href="#oath" className="btn btn-secondary">Клятва Всадника</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section reveal intro-runes">
          <div className="intro-pill">Ellesméra · Arya · Sacred Geometry · Disciplined Path</div>
        </section>

        <section id="gates" className="section section-gates reveal">
          <div className="section-head">
            <h2>Врата Торговых Домов</h2>
            <p>Сильная атмосфера с простым действием: выбрал, нажал, вошёл.</p>
          </div>
          <div className="gates-grid">
            {exchanges.map((item) => (
              <ExchangeCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="oath" className="section oath reveal">
          <h2>Клятва Всадника</h2>
          <p>Один вход — одна стратегия. Один риск — один лимит. Один путь — без хаоса.</p>
          <div className="oath-steps">
            <div className="step"><b>01</b><span>Выбери гильдию</span></div>
            <div className="step"><b>02</b><span>Проверь условия</span></div>
            <div className="step"><b>03</b><span>Входи по плану</span></div>
          </div>
        </section>
      </main>

      <div className="mobile-sticky-cta">
        <a href="#gates" className="btn btn-primary">Открыть Врата</a>
      </div>

      <footer className="reveal">
        <p>🌿 Elven AI Lab</p>
      </footer>
    </>
  );
}
