import "./NewsCard.css";

export function NewsCard(props) {
  const { title, content, date, image, source } = props.newsCard;
  return (
    <li className="card">
      <img
        src={image}
        alt={`imagem do artigo ${title}`}
        className="card__image"
      />
      <button type="button" className="card__favorite-button"></button>
      <div className="card__content">
        <p className="card__date">{date}</p>
        <h3 className="card__news-title">{title}</h3>
        <p className="card__news-text">{content}</p>
        <p className="card__news-source">{source}</p>
      </div>
    </li>
  );
}
