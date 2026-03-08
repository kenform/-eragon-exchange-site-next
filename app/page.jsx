'use client';

import { useEffect } from 'react';
import ExchangeCard from '../components/ExchangeCard';
import { exchanges } from '../components/exchange-data';
import { assets } from '../src/config/assets';

export default function HomePage() {
  useEffect(() => {
    const root = document.documentElement;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let moveRaf = null;
    let scrollRaf = null;
    let fpsRaf = null;
    let moveX = 0;
    let moveY = 0;
    let lastX = 999;
    let lastY = 999;

    const applyMove = () => {
      moveRaf = null;
      if (Math.abs(moveX - lastX) < 0.15 && Math.abs(moveY - lastY) < 0.15) return;
      lastX = moveX;
      lastY = moveY;
      root.style.setProperty('--mx', `${moveX}px`);
      root.style.setProperty('--my', `${moveY}px`);
    };

    const onMove = (e) => {
      moveX = (e.clientX / window.innerWidth - 0.5) * 14;
      moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      if (!moveRaf) moveRaf = requestAnimationFrame(applyMove);
    };

    const applyScroll = () => {
      scrollRaf = null;
      const hero = document.getElementById('hero');
      if (!hero) return;
      const h = hero.offsetHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / h));
      root.style.setProperty('--portalProgress', `${progress}`);
      root.style.setProperty('--portalShift', `${(progress * 8).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(applyScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    const onPortalTone = (event) => {
      const tone = event.detail?.tone;
      if (tone) {
        root.setAttribute('data-portal-tone', tone);
      } else {
        root.removeAttribute('data-portal-tone');
      }
    };

    const onClick = (event) => {
      const el = event.target.closest('[data-track="exchange-click"]');
      if (!el) return;
      const exchange = el.getAttribute('data-exchange') || 'unknown';
      const key = `eragon_click_${exchange}`;
      const curr = Number(localStorage.getItem(key) || '0') + 1;
      localStorage.setItem(key, String(curr));
    };

    const onCopy = (event) => {
      const el = event.target.closest('[data-track="copy-ref"]');
      if (!el) return;
      const exchange = el.getAttribute('data-exchange') || 'unknown';
      const key = `eragon_copy_${exchange}`;
      const curr = Number(localStorage.getItem(key) || '0') + 1;
      localStorage.setItem(key, String(curr));
    };

    const fpsProbe = () => {
      if (reducedMotion) return;
      let frames = 0;
      let start = performance.now();
      const tick = (now) => {
        frames += 1;
        if (now - start >= 2500) {
          const fps = (frames * 1000) / (now - start);
          if (fps < 45) root.classList.add('low-fps');
          return;
        }
        fpsRaf = requestAnimationFrame(tick);
      };
      fpsRaf = requestAnimationFrame(tick);
    };

    const cinematicKey = 'eragon_cinematic_mode';
    const savedCinematic = localStorage.getItem(cinematicKey);
    if (savedCinematic === 'off') root.classList.add('cinematic-off');

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.addEventListener('click', onClick, true);
    document.addEventListener('click', onCopy, true);
    window.addEventListener('portal-tone', onPortalTone);

    if (supportsHover && !reducedMotion && !root.classList.contains('low-fps')) {
      window.addEventListener('mousemove', onMove, { passive: true });
    } else {
      root.style.setProperty('--mx', '0px');
      root.style.setProperty('--my', '0px');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    fpsProbe();

    const toggleBtn = document.getElementById('cinematic-toggle');
    const onToggle = () => {
      const off = root.classList.toggle('cinematic-off');
      localStorage.setItem(cinematicKey, off ? 'off' : 'on');
    };
    if (toggleBtn) toggleBtn.addEventListener('click', onToggle);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('click', onCopy, true);
      window.removeEventListener('portal-tone', onPortalTone);
      if (toggleBtn) toggleBtn.removeEventListener('click', onToggle);
      observer.disconnect();
      if (moveRaf) cancelAnimationFrame(moveRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (fpsRaf) cancelAnimationFrame(fpsRaf);
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
          <button id="cinematic-toggle" className="mini-cta mini-cta-toggle" type="button">FX</button>
          <a href="#gates" className="mini-cta">Войти</a>
        </div>
      </div>

      <header id="hero" className="hero reveal" style={heroBackgroundStyle}>
        <div className="hero-scene" aria-hidden="true">
          <span className="portal-halo" />
          <span className="portal-ornament" />
          <div className="moonbeams">
            <span className="moonbeam" style={{ '--beamRot': '-12deg', left: '18%' }} />
            <span className="moonbeam" style={{ '--beamRot': '0deg', left: '46%' }} />
            <span className="moonbeam" style={{ '--beamRot': '12deg', right: '16%' }} />
          </div>
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

          <p className="hero-micro">Enter the Gates</p>
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

        <section className="section rider-path reveal" id="path">
          <h2>Путь Всадника</h2>
          <p>
            В Эллесмере торговля — это не хаос графиков. Это дисциплина. Выбор дома. Следование пути.
          </p>
          <div className="path-principles">
            <span>Discipline</span>
            <span>Liquidity</span>
            <span>Longevity</span>
          </div>
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

      <footer className="reveal site-footer">
        <p className="footer-brand">Elven AI Lab</p>
        <p className="footer-sub">Sacred Market Discipline</p>
        <p className="footer-note">Built by Riders of the Sapphire Path</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://t.me/Elven_Ai_Lab" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      </footer>
    </>
  );
}
