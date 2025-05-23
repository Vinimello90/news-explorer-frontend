import "./SavedNews.css";
import { useContext } from "react";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export function SavedNews() {
  const { savedNews } = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="saved-news">
        <NewsCardList newsData={savedNews} />
      </section>
    </main>
  );
}
