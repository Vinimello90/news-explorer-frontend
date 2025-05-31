import "./NavBar.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logoutIconDark from "../../../../../images/logout_dark.svg";
import logoutIconLight from "../../../../../images/logout_light.svg";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export function NavBar(props) {
  const {
    isSavedNews = false,
    onOpenPopup,
    onCloseMenu,
    isMenuOpen,
    isMobile = false,
  } = props;

  const { isLoggedIn, userData, onLogout } = useContext(CurrentUserContext);

  function handleCloseMenu() {
    if (isMobile) {
      onCloseMenu();
    }
  }

  function handleClickOutside(evt) {
    if (evt.target.classList.contains("navbar_mb_overlay_active")) {
      handleCloseMenu();
    }
  }

  function handleOpenPopup() {
    onOpenPopup();
    if (isMobile) {
      handleCloseMenu();
    }
  }

  function handleLogout() {
    onLogout();
    if (isMobile) {
      handleCloseMenu();
    }
  }

  const getLinkClass = (isActive) =>
    `navbar__link${isActive ? " navbar__link_active" : ""}${
      isMobile ? " navbar__link_mb" : ""
    }`;

  const navClass = `navbar navbar_mb${
    isMenuOpen && isMobile ? " navbar_mb_overlay_active" : ""
  }`;

  const menuClass = `navbar__menu navbar__menu_mb${
    isMenuOpen && isMobile ? " navbar__menu_mb_opened" : ""
  }`;

  const buttonClass = `navbar__button${
    isLoggedIn ? " navbar__button_logout" : ""
  }${isMobile ? " navbar__button_mb" : ""}`;

  return (
    <nav onClick={handleClickOutside} className={navClass}>
      <ul className={menuClass}>
        <li className="navbar__menu-item">
          <NavLink
            onClick={handleCloseMenu}
            to="/"
            className={({ isActive }) => getLinkClass(isActive)}
            replace
          >
            Início
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navbar__menu-item">
            <NavLink
              onClick={handleCloseMenu}
              to="/saved-news"
              className={({ isActive }) => getLinkClass(isActive)}
              replace
            >
              Artigos salvos
            </NavLink>
          </li>
        )}

        <li className="navbar__menu-item">
          <button
            onClick={!isLoggedIn ? handleOpenPopup : handleLogout}
            className={buttonClass}
          >
            {!isLoggedIn ? (
              "Entre"
            ) : (
              <p className="navbar__username">
                {userData.username.split(" ")[0]}
              </p>
            )}
            {isLoggedIn && (
              <img
                src={isSavedNews ? logoutIconLight : logoutIconDark}
                alt="Sair"
                className="navbar__logout-icon"
              />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
