import { Navigation } from "./components/Navigation/Navigation";
import { SearchForm } from "./components/SearchForm/SearchForm";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <header className="header__container">
        <Navigation />
        <SearchForm />
      </header>
    </header>
  );
}
