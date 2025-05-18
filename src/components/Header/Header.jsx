import { Navigation } from "./components/Navigation/Navigation";
import { SearchForm } from "./components/SearchForm/SearchForm";
import "./Header.css";

export function Header({ onSearchRequest, isPopupOpen, onOpenPopup }) {
  return (
    <header className="header">
      <header className="header__container">
        <Navigation isPopupOpen={isPopupOpen} onOpenPopup={onOpenPopup} />
        <SearchForm onSearchRequest={onSearchRequest} />
      </header>
    </header>
  );
}
