import { Link } from "react-router-dom";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

export function Navigation({ isPopupOpen, onOpenPopup }) {
  const [width, setWidth] = useState(window.innerWidth <= 544);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth <= 544);
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
          isPopupOpen && width ? " navigation_hidden" : ""
        }`}
      >
        {width && (
          <div
            onClick={handleClickOutside}
            className={`navigation__overlay${
              isMenuOpen ? " navigation__overlay_active" : ""
            }`}
          ></div>
        )}
        <div
          className={`navigation__container${
            isMenuOpen ? " navigation__container_mb_open" : ""
          }`}
        >
          <h1 className="navigation__logo">
            <Link onClick={handleClick} to="/" className="navigation__link">
              NewsExplorer
            </Link>
          </h1>

          {width && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`navigation__burger-menu${
                isMenuOpen ? " navigation__burger-menu_open" : ""
              }`}
            >
              <div className="navigation__burger-menu-line"></div>
              <div className="navigation__burger-menu-line"></div>
            </button>
          )}

          {!width && (
            <NavBar onCloseMenu={closeMenu} onOpenPopup={onOpenPopup} />
          )}
        </div>
        {width && (
          <NavBar
            onOpenPopup={onOpenPopup}
            onCloseMenu={closeMenu}
            isMenuOpen={isMenuOpen}
            mobile
          />
        )}
      </div>
    </>
  );
}
