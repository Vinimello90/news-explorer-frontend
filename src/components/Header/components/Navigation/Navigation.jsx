import { Link } from "react-router-dom";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

export function Navigation({ isPopupOpen, onOpenPopup }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 544);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 544);
      if (isMenuOpen && window.innerWidth > 544) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleClickOutside(evt) {
    if (evt.target.classList.contains("navigation__overlay")) {
      closeMenu();
    }
  }

  function handleClick() {
    closeMenu(false);
  }

  return (
    <>
      <div
        className={`navigation ${
          isPopupOpen && isMobile ? " navigation_hidden" : ""
        }`}
      >
        {isMobile && ( // Renderiza o overlay se estiver em tela menor
          <div
            onClick={handleClickOutside}
            className={`navigation__overlay${
              isMenuOpen ? " navigation__overlay_active" : "" //ativa o overlay se  o menu de hambúrguer estiver aberto
            }`}
          ></div>
        )}
        <div
          className={`navigation__container${
            isMenuOpen ? " navigation__container_mb_open" : "" // Se for apertado o botão do menu de hambúrguer, adiciona a classe para abrir o menu
          }`}
        >
          <h1 className="navigation__logo">
            <Link onClick={handleClick} to="/" className="navigation__link">
              NewsExplorer
            </Link>
          </h1>

          {isMobile && ( // renderiza o menu de hambúrguer em tela menor
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`navigation__burger-menu${
                isMenuOpen ? " navigation__burger-menu_open" : "" // adiciona a classe para mudar o icone se aberto
              }`}
            >
              <div className="navigation__burger-menu-line"></div>
              <div className="navigation__burger-menu-line"></div>
            </button>
          )}

          {!isMobile && (
            <NavBar onCloseMenu={closeMenu} onOpenPopup={onOpenPopup} /> // barra de navegação de telas maiores
          )}
        </div>
        {isMobile && ( // barra de navegação do menu de hambúrguer
          <NavBar
            onOpenPopup={onOpenPopup}
            onCloseMenu={closeMenu}
            isMenuOpen={isMenuOpen}
            isMobile={isMobile}
          />
        )}
      </div>
    </>
  );
}
