import { useContext, useEffect } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";

export function SavedNewsHeader() {
  const { currentUser, savedArticles, savedKeywords } =
    useContext(CurrentUserContext);

  useEffect(() => {
    console.log(savedKeywords);
  }, []);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__text">Artigos salvos</p>
      <h2 className="saved-news-header__title">{`${currentUser}, você tem ${savedArticles.length} artigos salvos`}</h2>
      <p className="saved-news-header__keywords">
        {savedKeywords.length > 0 &&
          `Por palavras-chave: ${savedKeywords.slice(0, 2).join(",")} e ${
            savedKeywords.slice(2, savedKeywords.length).length
          } outras`}
        {savedKeywords.length === 0 &&
          "Salve artigos para ver suas palavras-chave aqui"}
      </p>
    </section>
  );
}
