import "./Header.css";
import { Navigation } from "./components/Navigation/Navigation";
import { SearchForm } from "./components/SearchForm/SearchForm";

export function Header({ onSearchRequest, isPopupOpen, onOpenPopup }) {
  return (
    <header className="header" id="header">
      <header className="header__container">
        <Navigation isPopupOpen={isPopupOpen} onOpenPopup={onOpenPopup} />
        <SearchForm onSearchRequest={onSearchRequest} />
      </header>
    </header>
  );
}
