import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";
import { useContext, useMemo } from "react";

export function SavedNewsHeader() {
  const { userData, savedNews } = useContext(CurrentUserContext);

  const savedKeywords = useMemo(() => {
    const keywords = savedNews.map((news) => news.keyword);
    const keywordsByCount = keywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    const sortedKeywords = Array.from(new Set(keywords)).sort(
      (a, b) => keywordsByCount[b] - keywordsByCount[a]
    );
    return sortedKeywords;
  }, [savedNews]);

  const totalKeywords = savedKeywords.length;

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__text">Artigos salvos</p>

      <h2 className="saved-news-header__title">{`${
        userData.username
      }, você tem ${savedNews.length} ${
        savedNews.length === 1 ? "artigo salvo" : "artigos salvos"
      }`}</h2>

      <p className="saved-news-header__keywords">
        {totalKeywords > 0 &&
          `Por palavras-chave: ${
            totalKeywords > 3
              ? savedKeywords.slice(0, 2).join(", ")
              : savedKeywords.slice(0, 3).join(", ")
          } ${totalKeywords > 3 ? ` e outra ${totalKeywords - 2}` : ""}`}

        {totalKeywords === 0 &&
          "Salve artigos para ver as palavras-chave listadas aqui."}
      </p>
    </section>
  );
}
