import "./NewsCardList.css";
import { NewsCard } from "../shared/NewsCard/NewsCard";
import notFound from "../../../../../images/not-found_v1.svg";
import { useEffect, useState } from "react";

export function NewsCardList({ articles }) {
  const [newsLimit, setCardsLimit] = useState(3);

  function handleClickButton() {
    setCardsLimit(newsLimit + 3);
  }

  if (articles.length > 0) {
    return (
      <>
        <h2 className="news__title">Procurar resultados</h2>
        <ul className="news__card-list">
          {articles.slice(0, newsLimit).map((article) => {
            return <NewsCard key={article.url} article={article} />;
          })}
        </ul>
        {newsLimit < articles.length && (
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

  return (
    <>
      <img className="news__not-found-image" src={notFound} alt="" />
      <h2 className="news__not-found-title">Nada Encontrado</h2>
      <p className="news__not-found-content">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </>
  );
}
