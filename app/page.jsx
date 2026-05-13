'use client';

import { useEffect, useState } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { cexExchanges, dexTools, socialLinks, vpnLinks } from '../components/exchange-data';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Eragon Exchange">
            <img src="/images/brand/eragon_exchange_square_icon.png" alt="" />
            <span>
              <strong>ERAGON</strong>
              <em>EXCHANGE</em>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#social">Ссылки</a>
            <a href="#cex">CEX</a>
            <a href="#dex">DEX</a>
            <a href="#vpn">VPN</a>
          </nav>

          <a className="header-cta" href="#cex">Выбрать биржу</a>

          <button className="burger" type="button" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="menu-backdrop" onClick={closeMenu}></div>

      <aside className="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <a className="brand" href="#top" onClick={closeMenu}>
            <img src="/images/brand/eragon_exchange_square_icon.png" alt="" />
            <span>
              <strong>ERAGON</strong>
              <em>EXCHANGE</em>
            </span>
          </a>
          <button className="mobile-close" type="button" aria-label="Закрыть меню" onClick={closeMenu}>×</button>
        </div>

        <nav className="mobile-menu__links">
          <a href="#social" onClick={closeMenu}>Ссылки</a>
          <a href="#cex" onClick={closeMenu}>CEX биржи</a>
          <a href="#dex" onClick={closeMenu}>DEX / On-chain</a>
          <a href="#vpn" onClick={closeMenu}>VPN</a>
        </nav>

        <a className="mobile-menu__cta" href="#cex" onClick={closeMenu}>Выбрать маршрут</a>
      </aside>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content reveal">
              <p className="eyebrow">Crypto routes · Referral hub</p>
              <h1>Eragon Exchange — твой крипто-портал</h1>
              <p className="hero-lead">
                CEX и DEX биржи, VPN-доступ, Telegram, Discord, YouTube, GitHub и полезные ссылки в одном месте.
                Без хаоса, лишних вкладок и потерянных реферальных маршрутов.
              </p>

              <div className="hero-actions">
                <a className="btn btn--primary" href="#cex">Смотреть биржи</a>
                <a className="btn btn--ghost" href="#social">Мои ссылки</a>
              </div>

              <div className="hero-stats">
                <span><b>{cexExchanges.length}</b><small>CEX</small></span>
                <span><b>{dexTools.length}</b><small>DEX</small></span>
                <span><b>{socialLinks.length}</b><small>links</small></span>
              </div>
            </div>

            <div className="hero-visual reveal">
              <img className="hero-logo-card" src="/images/brand/eragon_exchange_square_icon-1.png" alt="Eragon Exchange icon" />
              <img className="hero-brand-card" src="/images/brand/eragon_exchange_card_mockup.png" alt="Eragon Exchange card" />
              <div className="route-panel">
                <span>ACCESS MAP</span>
                <strong>CEX / DEX / VPN</strong>
                <p>All routes in one clean hub</p>
              </div>
            </div>
          </div>
        </section>

        <section id="social" className="section social-section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Social hub</p>
              <h2>Мои основные ссылки</h2>
              <p>Telegram-канал, Discord, портфолио, GitHub и YouTube. Сейчас стоят заглушки — позже заменим на реальные URL.</p>
            </div>

            <div className="social-grid">
              {socialLinks.map((link) => (
                <a className="social-card reveal" key={link.id} href={link.href}>
                  <span>{link.icon}</span>
                  <strong>{link.label}</strong>
                  <small>{link.value}</small>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="cex" className="section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Centralized exchanges</p>
              <h2>CEX биржи</h2>
              <p>Централизованные биржи и реферальные маршруты. Текущие рабочие ссылки сохраняем, новые добавим позже.</p>
            </div>

            <div className="exchange-grid">
              {cexExchanges.map((item) => (
                <ExchangeCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="dex" className="section section--soft">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">DEX / On-chain</p>
              <h2>DEX и сетевые маршруты</h2>
              <p>Отдельная зона для децентрализованных бирж, агрегаторов, мостов, сетей и будущих on-chain инструментов.</p>
            </div>

            <div className="exchange-grid exchange-grid--dex">
              {dexTools.map((item) => (
                <ExchangeCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="vpn" className="section vpn-section">
          <div className="container vpn-grid">
            <div className="section-head reveal">
              <p className="eyebrow">VPN access</p>
              <h2>VPN для доступа к маршрутам</h2>
              <p>Отдельный блок под два типа VPN: whitelist-решение для крипто-сервисов и обычный VPN для повседневного доступа.</p>
            </div>

            <div className="vpn-cards">
              {vpnLinks.map((item) => (
                <article className="vpn-card reveal" key={item.id}>
                  <span>{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href}>Открыть</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section info-section">
          <div className="container info-card reveal">
            <p className="eyebrow">Important</p>
            <h2>Это не финансовая рекомендация</h2>
            <p>
              Eragon Exchange — это личная витрина ссылок и маршрутов. Перед регистрацией проверяй условия,
              комиссии, KYC, региональные ограничения и правила конкретной платформы.
            </p>
            <a className="btn btn--primary" href="#cex">Вернуться к биржам</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#top">
            <img src="/images/brand/eragon_exchange_square_icon.png" alt="" />
            <span>
              <strong>ERAGON</strong>
              <em>EXCHANGE</em>
            </span>
          </a>
          <p>Crypto referral hub: CEX, DEX, VPN and useful links.</p>
          <nav>
            <a href="#social">Ссылки</a>
            <a href="#cex">CEX</a>
            <a href="#dex">DEX</a>
            <a href="#vpn">VPN</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
