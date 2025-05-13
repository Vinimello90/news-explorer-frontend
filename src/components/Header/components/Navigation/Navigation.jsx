import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <h1 className="navigation__logo">
          <Link to="/" class="navigation__link">
            NewsExplorer
          </Link>
        </h1>
        <ul className="navigation__menu">
          <li className="navigation__menu-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link_active"
                  : "navigation__link"
              }
            >
              Início
            </NavLink>
          </li>
          <li className="navigation__menu-item">
            <button type="button" className="navigation__button">
              Entrar
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
