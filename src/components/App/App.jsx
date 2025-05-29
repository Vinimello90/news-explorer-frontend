import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNews } from "../../utils/thirdPartyApi";
import { PopupWithForm } from "../Main/components/PopupWithForm/PopupWithForm";
import { getNewsStorage, setNewsStorage } from "../../utils/searchStorage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { SavedNews } from "../Main/components/News/SavedNews";
import { mainApi } from "../../utils/MainApi";
import { authErrorHandler } from "../../utils/authErrorHandler";
import { getToken, removeToken, setToken } from "../../utils/token";

function App() {
  const [userData, setUserData] = useState();
  const [savedNews, setSavedNews] = useState([]);
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [newsData, setNewsData] = useState({ articles: "", keyword: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false); // Desativa o scroll automatico para a seção news seao renderizar os cards.
  const [isFreshSearch, setIsFreshSearch] = useState(false); // Desativa o scroll automatico para a seção news ao retornar de outra rota.

  async function initializeSession() {
    try {
      const currentUser = await mainApi.getCurrentUser();
      setUserData(currentUser);
      setIsLoggedIn(true);
    } catch (err) {}
  }

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      initializeSession();
    }
  }, []);

  useEffect(() => {
    const latestResults = JSON.parse(getNewsStorage());
    if (latestResults?.articles.length > 0) {
      setNewsData(latestResults);
      setIsLocalData(true);
      setShowResults(true);
    }
  }, []);

  function openPopup() {
    setPopup("signin");
  }

  function closePopup() {
    setPopup("");
  }

  // garante que o scroll automatico funcione corretamente
  async function fetchNews(keyword) {
    return await getNews(keyword);
  }

  async function SearchRequest(keyword) {
    try {
      setNewsData({ articles: "", keyword: "" }); // desmonta os dados para fazer o scroll automatico assim que montar novamente
      setIsSearching(true);
      setShowResults(true);
      setIsFreshSearch(true);
      const { articles } = await fetchNews(keyword);
      setNewsData({ articles, keyword });
      setNewsStorage({ articles, keyword });
      setIsLocalData(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSaveArticle(articleData) {
    try {
      const article = await mainApi.createArticle(articleData);
      setSavedNews((prevState) => [article, ...prevState]);
    } catch (err) {
      console.log(err);
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
  }

  async function handleSignUp(user, onError) {
    try {
      setIsProcessing(true);
      await mainApi.register(user);
      setPopup("success");
    } catch (err) {
      const error = authErrorHandler(err);
      onError({
        submit: error.message,
      });
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleSignIn(user, onError) {
    try {
      setIsProcessing(true);
      const { token } = await mainApi.authorize(user);
      if (token) {
        setToken(token);
        initializeSession();
      }
      closePopup();
    } catch (err) {
      const error = authErrorHandler(err);
      onError({
        submit: error.message,
      });
    } finally {
      setIsProcessing(false);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserData();
    removeToken();
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
          popup={popup}
          onOpenPopup={openPopup}
        />
        {popup && (
          <PopupWithForm
            isProcessing={isProcessing}
            setPopup={setPopup}
            popup={popup}
            onClosePopup={closePopup}
          />
        )}
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
