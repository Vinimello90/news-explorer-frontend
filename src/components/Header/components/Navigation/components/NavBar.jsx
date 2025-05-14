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
    <ul className={menuClassName}>
      <li className="navigation__menu-item">
        <NavLink onClick={handleClick} to="/" className={navLinkClassName}>
          Início
        </NavLink>
      </li>
      <li className="navigation__menu-item">
        <button type="button" className="navigation__button-signin">
          Entrar
        </button>
      </li>
    </ul>
  );
}
