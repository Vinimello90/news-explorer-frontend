import { NavLink } from "react-router-dom";

export function NavBar(props) {
  const {
    onOpenPopup,
    onCloseMenu,
    isMenuOpen = false,
    mobile = false,
  } = props;

  function handleCloseMenu() {
    onCloseMenu();
  }

  function handleOpenPopup() {
    onOpenPopup();
    if (mobile) {
      handleCloseMenu();
    }
  }

  return (
    <nav
      className={
        mobile
          ? `navigation__menu navigation__menu_mb${
              isMenuOpen ? " navigation__menu_mb_open" : ""
            }`
          : "navigation__menu"
      }
    >
      <ul className="navigation__menu-list">
        <li className="navigation__menu-item">
          <NavLink
            onClick={handleCloseMenu}
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
          <button
            onClick={handleOpenPopup}
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
