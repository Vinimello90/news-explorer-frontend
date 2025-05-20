import { NavLink } from "react-router-dom";

export function NavBar(props) {
  const {
    onOpenPopup,
    onCloseMenu,
    isMenuOpen = false,
    isMobile = false,
  } = props;

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
          <button
            onClick={handleOpenPopup}
            type="button"
            className={`navigation__button-signin${
              isMobile ? " navigation__button-signin_mb" : ""
            }`}
          >
            Entrar
          </button>
        </li>
      </ul>
    </nav>
  );
}
