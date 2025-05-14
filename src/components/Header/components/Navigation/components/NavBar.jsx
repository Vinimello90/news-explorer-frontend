import { NavLink } from "react-router-dom";

export function NavBar({ onCloseMenu, isMenuOpen = false, mobile = false }) {
  const menuClassName = mobile
    ? `navigation__menu navigation__menu_mb${
        isMenuOpen ? " navigation__menu_mb_open" : ""
      }`
    : "navigation__menu";

  const navLinkClassName = ({ isActive }) =>
    isActive ? "navigation__link navigation__link_active" : "navigation__link";

  function handleClick() {
    onCloseMenu();
  }
  return (
    <nav className={menuClassName}>
      <ul className="navigation__menu-list">
        <li className="navigation__menu-item">
          <NavLink onClick={handleClick} to="/" className={navLinkClassName}>
            Início
          </NavLink>
        </li>
        <li className="navigation__menu-item">
          <button
            type="button"
            className={`navigation__button-signin${
              mobile ? " navigation__button-signin_mb" : ""
            }`}
          >
            Entrar
          </button>
        </li>
      </ul>
    </nav>
  );
}
