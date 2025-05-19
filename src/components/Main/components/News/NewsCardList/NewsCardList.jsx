import "./NewsCardList.css";
import { NewsCard } from "../shared/NewsCard/NewsCard";
import notFound from "../../../../../images/not-found_v1.svg";
import { useEffect, useState } from "react";

export function NewsCardList({ newsData }) {
  const [newsLimit, setCardsLimit] = useState(3);
  const { articles, keyword, err = false } = newsData;

  function handleClickButton() {
    setCardsLimit(newsLimit + 3);
  }

  if (articles?.length > 0) {
    return (
      <>
        <h2 className="news__title">{`Procurar "${keyword}" resultados`}</h2>
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

  if (err) {
    return (
      <>
        <img className="news__not-found-image" src={notFound} alt="" />
        <h2 className="news__not-found-title">Ocorreu um erro</h2>
        <p className="news__not-found-content">
          Desculpe, tente novamente mais tarde.
        </p>
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
