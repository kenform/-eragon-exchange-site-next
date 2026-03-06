'use client';

import { useEffect } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges } from '../components/exchange-data';

export default function HomePage() {
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
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
      <div className="veil veil-noise" aria-hidden="true" />
      <div className="veil veil-stars" aria-hidden="true" />
      <div className="veil veil-fog-back" aria-hidden="true" />
      <div className="veil veil-fog-front" aria-hidden="true" />
      <div className="veil veil-aura" aria-hidden="true" />

      <header className="hero reveal">
        <div className="hero-dragon" aria-hidden="true">
          <span className="dragon-core" />
          <span className="dragon-wing left" />
          <span className="dragon-wing right" />
          <span className="dragon-eye" />
          <span className="rune-arc" />
        </div>

        <div className="hero-inner">
          <p className="hero-kicker">Elven AI Lab · Rider Gate</p>
          <h1 className="hero-title">
            Sapphire Gate
            <br />
            of the Dragon Rider
          </h1>
          <p className="hero-subtitle">
            Лаконичный хаб избранных маршрутов: древняя дисциплина, чистый фокус,
            сильные входы. Выбери гильдию и открой врата без шума.
          </p>

          <div className="hero-cta-row">
            <a href="#gates" className="btn btn-primary">Открыть Врата</a>
            <a href="#oath" className="btn btn-secondary">Клятва Пути</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section section-sigil reveal" aria-label="Identity">
          <div className="sigil-grid">
            <div className="sigil-card"><b>Saphira</b><span>Сапфировая сила · благородная мощь</span></div>
            <div className="sigil-card"><b>Arya</b><span>Эльфийская ясность · серебряная грация</span></div>
            <div className="sigil-card"><b>Rider Oath</b><span>Дисциплина, лимиты и путь без хаоса</span></div>
          </div>
        </section>

        <section id="gates" className="section section-gates reveal">
          <div className="section-head">
            <h2>Выбор Гильдии</h2>
            <p>Прямые маршруты. Минимум лишнего. Максимум фокуса на действии.</p>
          </div>

          <div className="gates-grid">
            {exchanges.map((item) => (
              <ExchangeCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="oath" className="section oath reveal">
          <h2>Клятва Всадника</h2>
          <p>Один вход — одна стратегия. Один риск — один лимит. Один план — без импровизации.</p>
          <div className="oath-steps">
            <div className="step"><b>01</b><span>Выбери гильдию</span></div>
            <div className="step"><b>02</b><span>Оцени риск и объём</span></div>
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
