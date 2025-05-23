import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";
import { useContext } from "react";

export function SavedNewsHeader() {
  const { userData, savedNews, savedKeywords } = useContext(CurrentUserContext);

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
          `Por palavras-chave: ${savedKeywords.slice(0, 2).join(", ")}${
            totalKeywords > 2
              ? ` e ${totalKeywords - 2} outra${
                  totalKeywords - 2 === 1 ? "" : "s"
                }`
              : ""
          }`}

        {totalKeywords === 0 &&
          "Salve artigos para ver suas palavras-chave aqui"}
      </p>
    </section>
  );
}
