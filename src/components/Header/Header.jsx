import { Navigation } from "./components/Navigation/Navigation";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <header className="header__container">
        <Navigation />
      </header>
    </header>
  );
}
