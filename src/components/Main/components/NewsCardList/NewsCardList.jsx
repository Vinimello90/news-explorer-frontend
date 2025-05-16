import "./NewsCardList.css";
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
      <div className="news__container">
        <h2 className="news__title">Procurar resultados</h2>
        <ul className="news__card-list">
          {news.slice(0, newsLimit).map((newsCard) => {
            return <NewsCard key={newsCard._id} newsCard={newsCard} />;
          })}
        </ul>
        {newsLimit < news.length && (
          <button
            onClick={handleClickButton}
            type="button"
            className="news__button"
          >
            Mostrar mais
          </button>
        )}
      </div>
    </section>
  );
}
