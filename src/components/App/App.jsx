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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false); // Desativa o scroll automatico para a seção news ao renderizar os cards.
  const [isFreshSearch, setIsFreshSearch] = useState(false); // Desativa o scroll automatico para a seção news ao retornar de outra rota.
  const [savedNews, setSavedNews] = useState([]);
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    isSaved: [],
  });

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

  //Lógica vai ser refatorada ao finalizar o backend
  function handleSaveArticle(articleData) {
    setSavedNews((prevState) => [articleData, ...prevState]);
    setUserData((prev) => ({
      ...prev,
      isSaved: [...prev.isSaved, articleData.article.url],
    }));
    if (!savedKeywords.includes(articleData.keyword)) {
      setSavedKeywords((prevState) => [...prevState, articleData.keyword]);
    }
  }

  // Lógica vai ser refatorada ao finalizar o backend
  function handleRemoveArticle({ url, keyword }) {
    const updatedArticles = savedNews.filter(
      (currentArticle) => currentArticle.article.url !== url
    );
    setSavedNews(updatedArticles);
    const keywordExists = updatedArticles.some((article) =>
      article.keyword.includes(keyword)
    );
    // Verifica se a palavra-chave existe ainda antes de remover
    if (!keywordExists) {
      setSavedKeywords((prevKeywords) =>
        prevKeywords.filter((currentKeyword) => currentKeyword !== keyword)
      );
    }
    setUserData((prevUserData) => ({
      ...prevUserData,
      isSaved: prevUserData.isSaved.filter((savedURL) => savedURL !== url),
    }));
  }

  // Lógica vai ser refatorada ao finalizar o backend
  async function handleSignIn(user) {
    if (user.email !== userData.email || user.password !== userData.password) {
      return Promise.reject({ message: "Nome de usuário ou senha inválida!" });
    } else {
      setIsLoggedIn(true);
    }
  }

  /// Lógica vai ser refatorada ao finalizar o backend
  function handleSignUp(user) {
    setUserData((prevUserData) => ({
      ...prevUserData,
      username: user.username,
      password: user.password,
    }));
  }

  // Lógica vai ser refatorada ao finalizar o backend
  function handleLogout() {
    setIsLoggedIn(false);
    setSavedNews([]);
    setUserData({
      username: "",
      password: "",
      isSaved: [],
    });
  }

  return (
    <CurrentUserContext
      value={{
        userData,
        onSignIn: handleSignIn,
        onSignUp: handleSignUp,
        onLogout: handleLogout,
        onSaveArticle: handleSaveArticle,
        onRemoveArticle: handleRemoveArticle,
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
