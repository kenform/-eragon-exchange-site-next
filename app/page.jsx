'use client';

import { useEffect, useState } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges, stats, steps } from '../components/exchange-data';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#hero" onClick={closeMenu}>
            <span>Eragon</span>
            <small>Exchange</small>
          </a>

          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#routes">Маршруты</a>
            <a href="#process">Процесс</a>
            <a href="#safety">Правила</a>
          </nav>

          <a className="header-cta" href="#routes">Выбрать биржу</a>

          <button
            className="burger"
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <div className="mobile-panel">
          <nav aria-label="Мобильная навигация">
            <a href="#routes" onClick={closeMenu}>Маршруты</a>
            <a href="#process" onClick={closeMenu}>Процесс</a>
            <a href="#safety" onClick={closeMenu}>Правила</a>
            <a href="#routes" className="mobile-cta" onClick={closeMenu}>Выбрать биржу</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-bg" aria-hidden="true">
            <span className="orb orb-a" />
            <span className="orb orb-b" />
            <span className="grid-glow" />
          </div>

          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Crypto routes · referral gateway</p>
              <h1>Eragon Exchange — аккуратный вход в крипто-маршруты</h1>
              <p className="hero-text">
                Сравни биржи, выбери подходящий маршрут и переходи по готовой ссылке без хаоса,
                лишних вкладок и случайных решений.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#routes">Смотреть маршруты</a>
                <a className="btn secondary" href="#safety">Правила входа</a>
              </div>
            </div>

            <div className="portal-card" data-reveal>
              <div className="portal-ring" aria-hidden="true" />
              <p>Route map</p>
              <strong>4 exchange gates</strong>
              <span>Bybit · Bitget · MEXC · Ourbit</span>
            </div>
          </div>
        </section>

        <section className="stats container" aria-label="Краткая статистика">
          {stats.map(([value, label]) => (
            <div className="stat" key={label} data-reveal>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="routes" className="section container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Exchange gates</p>
            <h2>Выбери биржу под свой сценарий</h2>
            <span>
              Это не финансовая рекомендация. Сайт помогает быстро перейти к нужной платформе и
              держать структуру перед глазами.
            </span>
          </div>

          <div className="exchange-grid">
            {exchanges.map((item) => (
              <ExchangeCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="process" className="section container split-section">
          <div className="section-head left" data-reveal>
            <p className="eyebrow">Disciplined path</p>
            <h2>Не просто ссылка, а порядок входа</h2>
            <span>
              Перед регистрацией проверь региональные ограничения, комиссии, KYC и свои лимиты.
              Хороший маршрут начинается не с клика, а с плана.
            </span>
          </div>

          <div className="steps">
            {steps.map(([num, title, text]) => (
              <div className="step" key={num} data-reveal>
                <b>{num}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="safety" className="section container safety" data-reveal>
          <p className="eyebrow">Risk note</p>
          <h2>Крипта требует дисциплины</h2>
          <p>
            Используй отдельные пароли, 2FA, лимиты риска и не заходи в сделки без понятного
            сценария. Любая биржа — это инструмент, а не гарантия результата.
          </p>
          <a className="btn primary" href="#routes">Вернуться к маршрутам</a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Eragon Exchange</strong>
            <p>Referral gateway for structured crypto routes.</p>
          </div>
          <nav>
            <a href="#hero">Наверх</a>
            <a href="#routes">Биржи</a>
            <a href="#safety">Правила</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
