import { useContext, useEffect, useState } from "react";
import "./NewsCard.css";
import { Link } from "react-router-dom";
import imageUnavailable from "../../../../../../../../images/no-image.jpg";
import { CurrentUserContext } from "../../../../../../../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";

export function NewsCard({ isOnSavedNews, article, keyword }) {
  const { urlToImage, title, description, url, publishedAt, source } = article;

  const { onRemoveArticle, isLoggedIn, onSaveArticle, userData } =
    useContext(CurrentUserContext);

  const [showAnimation, setShowAnimation] = useState(false);
  const [isCardSaved, setIsCardSaved] = useState(false);

  useEffect(() => {
    setIsCardSaved(userData.isSaved.includes(article.url));
    setShowAnimation(true);
  }, []);

  function handleFavoriteButton() {
    if (isCardSaved) {
      onRemoveArticle(url);
      setIsCardSaved(false);
      return;
    }
    onSaveArticle({ article, keyword });
    setIsCardSaved(true);
  }

  return (
    <li className={`card${showAnimation ? " card_visible" : ""} `}>
      <button
        onClick={handleFavoriteButton}
        type="button"
        className={`card__favorite-button${
          isCardSaved && !isOnSavedNews ? " card__favorite-button_saved" : ""
        }${isOnSavedNews ? " card__favorite-button_on_saved-news" : ""}${
          isLoggedIn ? " card__favorite-button_active" : ""
        }`}
        disabled={!isLoggedIn}
      ></button>
      <Link className="card__link" to={url} target="_blank">
        <img
          src={urlToImage ? urlToImage : imageUnavailable}
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
