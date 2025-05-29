import "./NewsCard.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import unavailableImage from "../../../../../../../../images/no-image.jpg";
import { CurrentUserContext } from "../../../../../../../../contexts/CurrentUserContext";

export function NewsCard({ isOnSavedNews, article, keyword }) {
  const { urlToImage, title, description, url, publishedAt, source } = article;

  const { onRemoveArticle, isLoggedIn, onSaveArticle, savedNews } =
    useContext(CurrentUserContext);

  const [showAnimation, setShowAnimation] = useState(false);
  const [isCardSaved, setIsCardSaved] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsCardSaved(savedNews.some((savedNew) => savedNew.url === url));
      return;
    }
    setIsCardSaved(false); // remove o icone do bookmark ativo sem apagar os dados temporarios
  }, [isLoggedIn, savedNews, article]);

  function handleRemoveButton() {
    onRemoveArticle(url);
  }

  function handleSaveButton() {
    const newsArticle = {
      title,
      description,
      keyword,
      source: source.name,
      url,
      urlToImage,
      publishedAt,
    };
    onSaveArticle(newsArticle);
  }

  return (
    <li className={`card${showAnimation ? " card_visible" : ""} `}>
      <button
        onClick={!isCardSaved ? handleSaveButton : handleRemoveButton}
        type="button"
        className={`card__favorite-button${
          isCardSaved && !isOnSavedNews ? " card__favorite-button_saved" : ""
        }${isOnSavedNews ? " card__favorite-button_on_saved-news" : ""}${
          isLoggedIn && !isOnSavedNews ? " card__favorite-button_active" : ""
        }`}
        disabled={!isLoggedIn}
      ></button>
      <Link className="card__link" to={url} target="_blank">
        {isOnSavedNews && <p className="card__keyword-label">{keyword}</p>}
        <img
          src={urlToImage ? urlToImage : unavailableImage}
          alt={`imagem do artigo ${title ? title : "Notícia relacionada"}`}
          className="card__image"
          onError={(evt) => {
            evt.target.src = { unavailableImage };
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
