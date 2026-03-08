import { useRef, useState } from 'react';

export default function ExchangeCard({ item }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const onCopy = async () => {
    if (!item.refCode) return;
    try {
      await navigator.clipboard.writeText(item.refCode);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  };

  const onEnter = () => {
    window.dispatchEvent(new CustomEvent('portal-tone', { detail: { tone: item.tone } }));
  };

  const onLeave = () => {
    window.dispatchEvent(new CustomEvent('portal-tone', { detail: { tone: null } }));
  };

  return (
    <article
      className={`gate reveal tone-${item.tone} ${item.highlight ? 'highlighted' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="gate-topline" aria-hidden="true" />
      <span className="rune" aria-hidden="true" />
      <span className={`gate-glyph glyph-${item.tone}`} aria-hidden="true" />

      <div className="gate-head">
        <span className="sigil" aria-hidden="true">{item.sigil}</span>
        <span className="gate-badge">{item.badge}</span>
      </div>

      <p className="gate-house">{item.house}</p>
      <h3>{item.name}</h3>
      <p>{item.desc}</p>

      <div className="gate-meta">
        <div><span>Risk</span><b>{item.risk}</b></div>
        <div><span>Style</span><b>{item.style}</b></div>
      </div>

      <div className="gate-actions">
        <a
          className="btn btn-ghost"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="exchange-click"
          data-exchange={item.id}
        >
          Войти в гильдию
        </a>
        {item.refCode ? (
          <button
            type="button"
            className="btn btn-copy"
            onClick={onCopy}
            data-track="copy-ref"
            data-exchange={item.id}
            aria-label={`Скопировать код ${item.name}`}
          >
            Скопировать код
          </button>
        ) : null}
      </div>
      {copied ? <p className="copy-hint">Код скопирован</p> : null}

      {item.note ? <p className="note">{item.note}</p> : null}
    </article>
  );
}
