export default function ExchangeCard({ item }) {
  return (
    <article className={`exchange-card tone-${item.tone} ${item.featured ? 'is-featured' : ''}`}>
      <div className="card-orbit" aria-hidden="true" />
      <div className="card-top">
        <span className="sigil">{item.sigil}</span>
        <span className="badge">{item.badge}</span>
      </div>

      <p className="house">{item.house}</p>
      <h3>{item.name}</h3>
      <p className="card-desc">{item.desc}</p>

      <ul className="point-list">
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {item.note ? <p className="note">{item.note}</p> : null}

      <div className="card-bottom">
        <span>REF: {item.refCode}</span>
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          Открыть
        </a>
      </div>
    </article>
  );
}
