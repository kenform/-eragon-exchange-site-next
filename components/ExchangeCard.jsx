export default function ExchangeCard({ item }) {
  return (
    <article className={`exchange-card exchange-card--${item.tone} ${item.featured ? 'exchange-card--featured' : ''}`}>
      <div className="exchange-card__top">
        <span className="exchange-card__number">{item.number}</span>
        <span className="exchange-card__badge">{item.badge}</span>
      </div>

      <p className="exchange-card__route">{item.route}</p>
      <h3>{item.name}</h3>
      <p className="exchange-card__text">{item.description}</p>

      <ul className="exchange-card__list">
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {item.note && <p className="exchange-card__note">{item.note}</p>}

      <div className="exchange-card__bottom">
        <span>REF: {item.refCode}</span>
        <a href={item.href} target="_blank" rel="noreferrer">
          Открыть
        </a>
      </div>
    </article>
  );
}
