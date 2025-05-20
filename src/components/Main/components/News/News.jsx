import "./News.css";
import { useEffect, useRef } from "react";
import { Preloader } from "../Preloader/Preloader";
import { NewsCardList } from "./NewsCardList/NewsCardList";

export function News({ isSearching, newsData }) {
  const searchRef = useRef();

  useEffect(() => {
    if (newsData.articles?.length > 0) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newsData]);

  return (
    <section ref={searchRef} className="news">
      <div className="news__container">
        {isSearching && <Preloader />}
        {!isSearching && <NewsCardList newsData={newsData} />}
      </div>
    </section>
  );
}
