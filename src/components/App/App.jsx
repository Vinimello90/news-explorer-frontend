import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNews } from "../../utils/thirdPartyApi";
import { PopupWithForm } from "../Main/components/PopupWithForm/PopupWithForm";
import { getNewsStorage, setNewsStorage } from "../../utils/searchStorage";
import { CurrentUserContext } from "../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { SavedNews } from "../Main/components/News/SavedNews";

function App() {
  const [newsData, setNewsData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false); // Desativa o scroll automatico para a seção news ao renderizar os cards.
  const [isFreshSearch, setIsFreshSearch] = useState(false); // Desativa o scroll automatico para a seção news ao retornar de outra rota.
  const [savedNews, setSavedNews] = useState([]);
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [userData, setUserData] = useState({ name: "Elise", isSaved: [] });

  useEffect(() => {
    const latestResults = JSON.parse(getNewsStorage());
    if (latestResults?.articles.length > 0) {
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
      setIsFreshSearch(true);
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

  function saveArticle(articleData) {
    setSavedNews((prevState) => [articleData, ...prevState]);
    setUserData((prev) => ({
      ...prev,
      isSaved: [...prev.isSaved, articleData.article.url],
    }));

    if (!savedKeywords.includes(articleData.keyword)) {
      setSavedKeywords((prevState) => [...prevState, articleData.keyword]);
    }
  }

  function signIn() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
    setSavedNews([]);
    setUserData({ name: "Elise", isSaved: [] });
  }

  return (
    <CurrentUserContext
      value={{
        userData,
        onSignIn: signIn,
        onLogout: logout,
        onSaveArticle: saveArticle,
        savedNews,
        savedKeywords,
        isLoggedIn,
      }}
    >
      <div className="page">
        <Header
          onSearchRequest={SearchRequest}
          isPopupOpen={isPopupOpen}
          onOpenPopup={openPopup}
        />
        {isPopupOpen && <PopupWithForm onClosePopup={closePopup} />}
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLocalData={isLocalData}
                isSearching={isSearching}
                showResults={showResults}
                newsData={newsData}
                isFreshSearch={isFreshSearch}
                setIsFreshSearch={setIsFreshSearch}
              />
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext>
  );
}

export default App;
