import { useState } from "react";
import { news } from "../../../../utils/constants";
import { NewsCard } from "../shared/NewsCard/NewsCard";

export function NewsCardList() {
  const [newsLimit, setCardsLimit] = useState(3);

  function handleClickButton() {
    setCardsLimit(newsLimit + 3);
  }

  return (
    <section className="news">
      <h2 className="news__title">Procurar resultados</h2>
      <div className="news__card-list">
        {news.slice(0, newsLimit).map((newsCard) => {
          return <NewsCard key={newsCard._id} newsCard={newsCard} />;
        })}
      </div>
      {cardsLimit < news.length && (
        <button
          onClick={handleClickButton}
          type="button"
          className="news__button"
        >
          Mostrar mais
        </button>
      )}
    </section>
  );
}
