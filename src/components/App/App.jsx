import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useState } from "react";
import { getNews } from "../../utils/Api";

function App() {
  const [articles, setArticles] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  async function SearchRequest(keyword) {
    try {
      const { articles } = await getNews(keyword);
      setArticles(articles);
      console.log(articles);
    } catch (err) {
      console.log(err);
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
        articles={articles}
        isPopupOpen={isPopupOpen}
        onClosePopup={closePopup}
      />
      <Footer />
    </div>
  );
}

export default App;
