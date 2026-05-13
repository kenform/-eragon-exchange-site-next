'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges } from '../components/exchange-data';

const navLinks = [
  { href: '#routes', label: 'Маршруты' },
  { href: '#process', label: 'Процесс' },
  { href: '#rules', label: 'Правила' },
];

const steps = [
  {
    number: '01',
    title: 'Сравни маршрут',
    text: 'Посмотри назначение каждой биржи и выбери сценарий, который подходит под твою задачу.',
  },
  {
    number: '02',
    title: 'Проверь условия',
    text: 'Перед регистрацией проверь комиссии, региональные ограничения, KYC и доступность платформы.',
  },
  {
    number: '03',
    title: 'Входи по плану',
    text: 'Используй 2FA, лимиты риска, отдельные пароли и не открывай сделки без понятного сценария.',
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="Eragon Exchange">
            <span className="logo__icon">
              <Image src="/images/brand/eragon_exchange_square_icon.png" alt="" width={44} height={44} priority />
            </span>
            <span className="logo__text">
              <strong>Eragon</strong>
              <span>Exchange</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="#routes">
            Выбрать биржу
          </a>

          <button
            className={`burger ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={closeMenu} />

      <aside className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Мобильное меню">
        <div className="mobile-menu__top">
          <a className="logo logo--menu" href="#top" onClick={closeMenu}>
            <span className="logo__icon">
              <Image src="/images/brand/eragon_exchange_square_icon.png" alt="" width={44} height={44} />
            </span>
            <span className="logo__text">
              <strong>Eragon</strong>
              <span>Exchange</span>
            </span>
          </a>

          <button type="button" className="mobile-close" aria-label="Закрыть меню" onClick={closeMenu}>
            ×
          </button>
        </div>

        <nav className="mobile-menu__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="mobile-menu__cta" href="#routes" onClick={closeMenu}>
          Выбрать маршрут
        </a>
      </aside>

      <main id="top">
        <section className="hero section">
          <div className="hero__glow" aria-hidden="true" />

          <div className="container hero-grid">
            <div className="hero-content reveal">
              <p className="eyebrow">Crypto routes · Referral gateway</p>
              <h1>Eragon Exchange</h1>
              <p className="hero-subtitle">аккуратный вход в крипто-маршруты</p>
              <p className="hero-lead">
                Сравни биржи, выбери подходящий маршрут и переходи по готовой ссылке без хаоса, лишних вкладок и случайных решений.
              </p>

              <div className="hero-actions">
                <a className="btn btn--primary" href="#routes">
                  Смотреть маршруты
                </a>
                <a className="btn btn--ghost" href="#rules">
                  Правила входа
                </a>
              </div>

              <div className="hero-stats" aria-label="Ключевые параметры">
                <span>
                  <strong>4</strong>
                  маршрута
                </span>
                <span>
                  <strong>0</strong>
                  лишнего шума
                </span>
                <span>
                  <strong>24/7</strong>
                  доступ
                </span>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="hero-logo-card">
                <Image
                  src="/images/brand/eragon_exchange_square_icon-1.png"
                  alt="Eragon Exchange icon"
                  width={520}
                  height={520}
                  priority
                />
              </div>

              <div className="hero-brand-card">
                <Image
                  src="/images/brand/eragon_exchange_card_mockup.png"
                  alt="Eragon Exchange brand card"
                  width={884}
                  height={512}
                  priority
                />
              </div>

              <div className="route-panel">
                <span>Route map</span>
                <strong>4 exchange gates</strong>
                <p>Bybit · Bitget · MEXC · Ourbit</p>
              </div>
            </div>
          </div>
        </section>

        <section id="routes" className="section routes-section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Exchange gates</p>
              <h2>Выбери биржу под свой сценарий</h2>
              <p>
                Это не финансовая рекомендация. Сайт помогает быстро перейти к нужной платформе и держать структуру перед глазами.
              </p>
            </div>

            <div className="exchange-grid">
              {exchanges.map((item) => (
                <ExchangeCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="container process-grid">
            <div className="process-copy reveal">
              <p className="eyebrow">Disciplined path</p>
              <h2>Не просто ссылка, а порядок входа</h2>
              <p>
                Хороший маршрут начинается не с клика, а с понятного плана: условия, лимиты, доступность, безопасность и контроль риска.
              </p>
            </div>

            <div className="steps">
              {steps.map((step) => (
                <article className="step-card reveal" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rules" className="section rules-section">
          <div className="container">
            <div className="risk-card reveal">
              <p className="eyebrow">Risk note</p>
              <h2>Крипта требует дисциплины</h2>
              <p>
                Используй отдельные пароли, 2FA, лимиты риска и не заходи в сделки без понятного сценария. Любая биржа — это инструмент, а не гарантия результата.
              </p>
              <a className="btn btn--primary" href="#routes">
                Вернуться к маршрутам
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="logo footer-logo" href="#top">
              <span className="logo__icon">
                <Image src="/images/brand/eragon_exchange_square_icon.png" alt="" width={40} height={40} />
              </span>
              <span className="logo__text">
                <strong>Eragon</strong>
                <span>Exchange</span>
              </span>
            </a>
            <p>Referral gateway for structured crypto routes.</p>
          </div>

          <nav aria-label="Навигация в подвале">
            <a href="#routes">Биржи</a>
            <a href="#process">Процесс</a>
            <a href="#rules">Правила</a>
            <a href="#top">Наверх</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
