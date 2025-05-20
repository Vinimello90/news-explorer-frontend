import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../../../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";
import logoutIcon from "../../../../../images/logout.svg";

export function NavBar(props) {
  const {
    isSavedNews = false,
    onOpenPopup,
    onCloseMenu,
    isMenuOpen = false,
    isMobile = false,
  } = props;

  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  function handleCloseMenu() {
    onCloseMenu();
  }

  function handleOpenPopup() {
    onOpenPopup();
    if (isMobile) {
      handleCloseMenu();
    }
  }

  return (
    <nav
      className={
        isMobile // Adiciona os estilos para tela menor e ativer o efeito ao abrir o menu de hambúrguer
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
          <NavLink
            onClick={handleCloseMenu}
            to="/saved-news"
            className={({ isActive }) =>
              isActive
                ? `navigation__link navigation__link_active${
                    isSavedNews ? " navigation__link_active_saved-news" : ""
                  }`
                : "navigation__link"
            }
          >
            Artigos salvos
          </NavLink>
        </li>
        <li className="navigation__menu-item">
          {!isLoggedIn && (
            <button
              onClick={handleOpenPopup}
              type="button"
              className={`navigation__button navigation__button_signin${
                isMobile ? " navigation__button_signin_mb" : ""
              }`}
            >
              Entrar
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={handleOpenPopup}
              type="button"
              className={`navigation__button navigation__button_logout${
                isMobile ? " navigation__button_logout_mb" : ""
              }`}
            >
              {`${currentUser}`}
              <img className="navigation_logout-icon" src={logoutIcon} alt="" />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
