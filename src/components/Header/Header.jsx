import "./Header.css";
import { useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { SavedNewsHeader } from "./components/SavedNewsHeader/SavedNewsHeader";
import { SearchForm } from "./components/SearchForm/SearchForm";

export function Header({ onSearchRequest, popup, onOpenPopup }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header${isSavedNews ? " header_saved-news" : ""}`}>
      <header className="header__container">
        <Navigation
          isSavedNews={isSavedNews}
          popup={popup}
          onOpenPopup={onOpenPopup}
        />
        {!isSavedNews && <SearchForm onSearchRequest={onSearchRequest} />}
        {isSavedNews && <SavedNewsHeader />}
      </header>
    </header>
  );
}
