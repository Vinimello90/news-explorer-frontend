import { Preloader } from "../Preloader/Preloader";
import "./News.css";
import { NewsCardList } from "./NewsCardList/NewsCardList";

export function News({ isSearching, articles }) {
  return (
    <section className="news">
      <div className="news__container">
        {isSearching && <Preloader />}
        {!isSearching && <NewsCardList articles={articles} />}
      </div>
    </section>
  );
}
