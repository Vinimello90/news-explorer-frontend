import "./News.css";
import { useEffect, useRef } from "react";
import { Preloader } from "../Preloader/Preloader";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";

export function News({
  isFreshSearch,
  setIsFreshSearch,
  isLocalData,
  isSearching,
  newsData,
}) {
  const searchRef = useRef();

  useEffect(() => {
    // Faz o scroll automático ao renderizar os cards somente se os dados não vierem do localStorage
    if (newsData.articles?.length > 0 && !isLocalData && isFreshSearch) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
      setIsFreshSearch(false);
    }
  }, [newsData, isLocalData, isFreshSearch, setIsFreshSearch]);

  return (
    <section ref={searchRef} className="news">
      <div className="news__container">
        {isSearching && <Preloader />}
        {!isSearching && <NewsCardList newsData={newsData} />}
      </div>
    </section>
  );
}
