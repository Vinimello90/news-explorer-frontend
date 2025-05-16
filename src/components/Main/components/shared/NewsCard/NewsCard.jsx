import { useEffect, useState } from "react";
import "./NewsCard.css";

export function NewsCard(props) {
  const { title, content, date, image, source } = props.newsCard;

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <li className={`card${showAnimation ? " card_visible" : ""} `}>
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
