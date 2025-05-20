import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNews } from "../../utils/thirdPartyApi";
import { PopupWithForm } from "../Main/components/PopupWithForm/PopupWithForm";
import { getNewsStorage, setNewsStorage } from "../../utils/searchStorage";

function App() {
  const [newsData, setNewsData] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false);

  useEffect(() => {
    const latestResults = JSON.parse(getNewsStorage());
    if (latestResults) {
      setNewsData(latestResults);
      setIsLocalData(true);
      setShowResults(true);
    }
  }, []);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  async function SearchRequest(keyword) {
    try {
      setIsSearching(true);
      setShowResults(true);
      const { articles } = await getNews(keyword);
      setNewsData({ articles, keyword });
      setNewsStorage({ articles, keyword });
      setIsLocalData(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="page">
      <Header
        onSearchRequest={SearchRequest}
        isPopupOpen={isPopupOpen}
        onOpenPopup={openPopup}
      />
      {isPopupOpen && <PopupWithForm onClosePopup={closePopup} />}
      <Main
        isLocalData={isLocalData}
        isSearching={isSearching}
        showResults={showResults}
        newsData={newsData}
      />
      <Footer />
    </div>
  );
}

export default App;
