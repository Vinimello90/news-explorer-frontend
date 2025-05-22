import "./NewsCardList.css";
import { NewsCard } from "./components/NewsCard/NewsCard";
import notFound from "../../../../../../images/not-found_v1.svg";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../../../../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";

export function NewsCardList({ newsData }) {
  const [cardsLimit, setCardsLimit] = useState(3);

  const { articles, keyword } = newsData;

  const { savedNews } = useContext(CurrentUserContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  function handleClickButton() {
    setCardsLimit(cardsLimit + 3);
  }

  useEffect(() => {
    if (isOnSavedNews) {
      setCardsLimit(isOnSavedNews.length);
    }
  }, [isOnSavedNews]);

  if (!articles && !isOnSavedNews) {
    return (
      <>
        <img className="news__not-found-image" src={notFound} alt="" />
        <h2 className="news__not-found-title">Ocorreu um erro</h2>
        <p className="news__not-found-content">
          Desculpe, algo deu errado durante a solicitação. Pode haver um
          problema de conexão ou o servidor pode estar inativo. Por favor, tente
          novamente mais tarde.
        </p>
      </>
    );
  }

  if (
    (!isOnSavedNews && articles?.length === 0) ||
    (isOnSavedNews && savedNews?.length === 0)
  ) {
    return (
      <>
        <img className="news__not-found-image" src={notFound} alt="" />
        <h2 className="news__not-found-title">
          {!isOnSavedNews ? "Nada Encontrado" : "Nenhum artigo salvo"}
        </h2>
        <p className="news__not-found-content">
          {!isOnSavedNews
            ? "Desculpe, mas nada corresponde aos seus termos de pesquisa."
            : "Nenhum cartão salvo encontrado. Salve os artigos para serem exibidos aqui"}
        </p>
      </>
    );
  }

  return (
    <>
      {!isOnSavedNews && (
        <h2 className="news__title">{`Resultados encontrados para "${keyword}"`}</h2>
      )}
      <ul className="news__card-list">
        {(!isOnSavedNews ? articles : savedNews)
          .slice(0, cardsLimit)
          .map((news) => {
            return (
              <NewsCard
                key={!isOnSavedNews ? news.url : news.article.url}
                article={!isOnSavedNews ? news : news.article}
                keyword={!isOnSavedNews ? keyword : news.keyword}
                isOnSavedNews={isOnSavedNews}
              />
            );
          })}
      </ul>
      {cardsLimit < articles?.length && (
        <button
          onClick={handleClickButton}
          type="button"
          className="news__button"
        >
          Mostrar mais
        </button>
      )}
    </>
  );
}
