import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useState } from "react";
import { getNews } from "../../utils/thirdPartyApi";

function App() {
  const [newsData, setNewsData] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
      <Main
        isSearching={isSearching}
        showResults={showResults}
        newsData={newsData}
        isPopupOpen={isPopupOpen}
        onClosePopup={closePopup}
      />
      <Footer />
    </div>
  );
}

export default App;
