import "./NewsCardList.css";
import { NewsCard } from "../shared/NewsCard/NewsCard";
import notFound from "../../../../../images/not-found_v1.svg";
import { useState } from "react";

export function NewsCardList({ newsData }) {
  const [cardsLimit, setCardsLimit] = useState(3);
  const { articles, keyword } = newsData;

  function handleClickButton() {
    setCardsLimit(cardsLimit + 3);
  }

  if (articles?.length > 0) {
    return (
      <>
        <h2 className="news__title">{`Resultados encontrados para "${keyword}"`}</h2>
        <ul className="news__card-list">
          {articles.slice(0, cardsLimit).map((article) => {
            return <NewsCard key={article.url} article={article} />;
          })}
        </ul>
        {cardsLimit < articles.length && (
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

  if (articles?.length === 0) {
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

  return (
    <>
      <img className="news__not-found-image" src={notFound} alt="" />
      <h2 className="news__not-found-title">Ocorreu um erro</h2>
      <p className="news__not-found-content">
        Desculpe, algo deu errado durante a solicitação. Pode haver um problema
        de conexão ou o servidor pode estar inativo. Por favor, tente novamente
        mais tarde.
      </p>
    </>
  );
}
