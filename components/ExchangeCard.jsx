export default function ExchangeCard({ item }) {
  return (
    <article className={`gate reveal tone-${item.tone} ${item.highlight ? 'highlighted' : ''}`}>
      <div className="gate-topline" aria-hidden="true" />
      <span className="rune" aria-hidden="true" />
      <span className="gate-glyph" aria-hidden="true" />

      <div className="gate-head">
        <span className="sigil" aria-hidden="true">{item.sigil}</span>
        <span className="gate-badge">{item.badge}</span>
      </div>

      <p className="gate-house">{item.house}</p>
      <h3>{item.name}</h3>
      <p>{item.desc}</p>

      <a className="btn btn-ghost" href={item.href} target="_blank" rel="noopener noreferrer">
        Войти в гильдию
      </a>

      {item.note ? <p className="note">{item.note}</p> : null}
    </article>
  );
}
