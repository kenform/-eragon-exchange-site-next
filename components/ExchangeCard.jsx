export default function ExchangeCard({ item }) {
  return (
    <article className={`exchange-card ${item.featured ? 'exchange-card--featured' : ''}`}>
      <div className="exchange-card__top">
        <span className="exchange-card__type">{item.type}</span>
        <span className="exchange-card__badge">{item.badge}</span>
      </div>

      <h3>{item.name}</h3>
      <p className="exchange-card__description">{item.description}</p>

      <ul>
        {item.points?.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {item.note ? <p className="exchange-card__note">{item.note}</p> : null}

      <div className="exchange-card__bottom">
        <span>REF: {item.refCode || 'soon'}</span>
        <a href={item.href} target={item.href === '#' ? undefined : '_blank'} rel={item.href === '#' ? undefined : 'noreferrer'}>
          Открыть
        </a>
      </div>
    </article>
  );
}
