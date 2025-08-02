import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNews } from "../../utils/thirdPartyApi";
import { getNewsStorage, setNewsStorage } from "../../utils/searchStorage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { SavedNews } from "../Main/components/News/SavedNews";
import { mainApi } from "../../utils/MainApi";
import { authErrorHandler } from "../../utils/authErrorHandler";
import { getToken, removeToken, setToken } from "../../utils/token";
import { PopupContext } from "../../contexts/PopupContext";
import { Popup } from "../Popup/Popup";
import { passkey } from "../../utils/Passkey";

function App() {
  const [userData, setUserData] = useState();
  const [savedNews, setSavedNews] = useState([]);
  const [newsData, setNewsData] = useState({ articles: "", keyword: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false); // Previne o scroll automatico se os dados dos cards são do localStorage.
  const [isFreshSearch, setIsFreshSearch] = useState(false); // Previne o scroll automatico para a seção news ao retornar de outra rota.

  async function initializeSession() {
    try {
      const { user, hasPasskey } = await mainApi.getCurrentUser();
      const articles = await mainApi.getArticles();
      articles.reverse();
      setUserData(user);
      setSavedNews(articles);
      setIsLoggedIn(true);
      if (!hasPasskey) {
        openPopup({ type: "registerPasskey" });
      }
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        removeToken();
        setIsLoggedIn(false);
      }
    } finally {
      setIsAuthChecked(true);
    }
  }

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      initializeSession();
    } else {
      setIsAuthChecked(true);
    }
    // Previne a pagina salvada no bfcache voltar logada caso o usuário tenha feito o logout
    function handleBFCache(evt) {
      if (evt.persisted) {
        setIsAuthChecked(false);
        const refreshedJWT = getToken();
        if (!refreshedJWT) {
          window.location.reload();
          return;
        }
        setIsAuthChecked(true);
      }
    }

    window.addEventListener("pageshow", handleBFCache);
    return () => window.removeEventListener("pageshow", handleBFCache);
  }, []);

  useEffect(() => {
    // Busca a ultima feita pesquisa salva no localStorage
    const latestResults = JSON.parse(getNewsStorage());
    if (latestResults?.articles.length > 0) {
      setNewsData(latestResults);
      setIsLocalData(true);
      setShowResults(true);
    }
  }, []);

  function openPopup(popup) {
    setPopup(popup);
  }

  function closePopup() {
    setPopup("");
  }

  // garante que o scroll automatico para os resultados funcione corretamente retornando o fetch.
  async function fetchNews(keyword) {
    return await getNews(keyword);
  }

  async function SearchRequest(keyword) {
    try {
      setNewsData({ articles: "", keyword: "" }); // desmonta os cards para fazer o scroll automatico quando montar os novos cards da busca.
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

  async function handleRemoveArticle({ url, _id }) {
    try {
      await mainApi.removeArticle(_id);
      setSavedNews((prevSavedNews) =>
        prevSavedNews.filter((savedNews) => savedNews.url !== url)
      );
      closePopup();
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePasskeyRegister() {
    try {
      await passkey.register();
      if (!isLoggedIn) {
        openPopup({ type: "signinPasskey" });
      }
    } catch (err) {
      authErrorHandler(err);
    }
  }

  async function handlePasskeySignIn(user, onError) {
    try {
      const { token } = await passkey.signIn(user);
      if (token) {
        setToken(token);
        initializeSession();
        closePopup();
      }
    } catch (err) {
      err.message = "E-mail ou Passkey inválido.";
      const error = authErrorHandler(err);
      onError({ name: "submit", errorMessage: error.message });
    }
  }

  async function handleSignUp(user, onError) {
    try {
      await mainApi.register(user);
      openPopup({ type: "success" });
    } catch (err) {
      const error = authErrorHandler(err);
      onError({ name: "submit", errorMessage: error.message });
    }
  }

  async function handleSignIn(user, onError) {
    try {
      const { token } = await mainApi.authorize(user);
      if (token) {
        setToken(token);
        initializeSession();
      }
      closePopup();
    } catch (err) {
      const error = authErrorHandler(err);
      onError({ name: "submit", errorMessage: error.message });
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setSavedNews([]);
    setUserData();
    removeToken();
  }

  if (!isAuthChecked) {
    return (
      <div className="page">
        <div className="page__preloader"></div>
      </div>
    );
  }

  return (
    <PopupContext
      value={{
        popup,
        onOpenPopup: openPopup,
        onClosePopup: closePopup,
      }}
    >
      <CurrentUserContext
        value={{
          userData,
          onPasskeySignIn: handlePasskeySignIn,
          onPasskeyRegister: handlePasskeyRegister,
          onSignIn: handleSignIn,
          onSignUp: handleSignUp,
          onLogout: handleLogout,
          onSaveArticle: handleSaveArticle,
          onRemoveArticle: handleRemoveArticle,
          savedNews,
          isLoggedIn,
        }}
      >
        <div className="page">
          <Header onSearchRequest={SearchRequest} />
          {popup && <Popup />}
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext>
    </PopupContext>
  );
}

export default App;
