'use client';

import { useEffect } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges } from '../components/exchange-data';

export default function HomePage() {
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in')),
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="atmo atmo-noise" aria-hidden="true" />
      <div className="atmo atmo-stars" aria-hidden="true" />
      <div className="atmo atmo-fog-back" aria-hidden="true" />
      <div className="atmo atmo-fog-front" aria-hidden="true" />
      <div className="atmo atmo-moon" aria-hidden="true" />

      <header className="hero reveal">
        <div className="hero-scene" aria-hidden="true">
          <span className="portal-halo" />
          <span className="portal-arch outer" />
          <span className="portal-arch inner" />
          <span className="light-ray ray-a" />
          <span className="light-ray ray-b" />
          <span className="light-ray ray-c" />
          <span className="forest-depth" />
          <span className="rune-ring" />
        </div>

        <div className="hero-inner">
          <p className="kicker">Elven AI Lab · Ellesméra Gateway</p>
          <h1 className="hero-title">
            Лунные Врата Эллесмеры
            <br />
            Выбери Свой Путь
          </h1>
          <p className="subtitle">
            Премиальный хаб маршрутов: эльфийская ясность, древняя дисциплина, спокойная сила.
            Открой врата и перейди к нужной бирже без шума и лишней сложности.
          </p>

          <div className="hero-cta-row">
            <a href="#gates" className="btn btn-primary">Открыть Врата</a>
            <a href="#oath" className="btn btn-secondary">Клятва Пути</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section reveal intro-runes">
          <div className="intro-pill">Arya · Ellesméra · Sacred Geometry · Disciplined Path</div>
        </section>

        <section id="gates" className="section section-gates reveal">
          <div className="section-head">
            <h2>Элитные Гильдии</h2>
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
