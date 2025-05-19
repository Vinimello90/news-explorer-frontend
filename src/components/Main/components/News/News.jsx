import "./News.css";
import { useEffect, useRef } from "react";
import { Preloader } from "../Preloader/Preloader";
import { NewsCardList } from "./NewsCardList/NewsCardList";

export function News({ isSearching, articles }) {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isSearching]);

  return (
    <section ref={searchRef} className="news">
      <div className="news__container">
        {isSearching && <Preloader />}
        {!isSearching && <NewsCardList articles={articles} />}
      </div>
    </section>
  );
}
