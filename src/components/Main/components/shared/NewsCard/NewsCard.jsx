import { useEffect, useState } from "react";
import "./NewsCard.css";
import { Link } from "react-router-dom";
import imageUnavailable from "../../../../../images/no-image.jpg";

export function NewsCard({ article }) {
  const { urlToImage, title, description, url, publishedAt, source } = article;

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <li className={`card${showAnimation ? " card_visible" : ""} `}>
      <button type="button" className="card__favorite-button"></button>
      <Link className="card__link" to={url} target="_blank">
        <img
          src={urlToImage}
          alt={`imagem do artigo ${title ? title : "Notícia relacionada"}`}
          className="card__image"
          onError={(evt) => {
            evt.target.src = { imageUnavailable };
          }}
        />
        <div className="card__content">
          <p className="card__date">
            {new Date(publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h3 className="card__news-title">
            {title ? title : "Notícia relacionada"}
          </h3>
          <p className="card__news-text">{description}</p>
          <p className="card__news-source">{source.name}</p>
        </div>
      </Link>
    </li>
  );
}
