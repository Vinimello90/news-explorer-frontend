import "./NewsCardList.css";
import { NewsCard } from "../shared/NewsCard/NewsCard";
import { useState } from "react";

export function NewsCardList({ articles }) {
  const [newsLimit, setCardsLimit] = useState(3);

  function handleClickButton() {
    setCardsLimit(newsLimit + 3);
  }

  return (
    <section className="news">
      <div className="news__container">
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
      </div>
    </section>
  );
}
