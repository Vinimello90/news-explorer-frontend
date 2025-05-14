import { Link } from "react-router-dom";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

export function Navigation() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, []);

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
      <div className="navigation">
        {width <= 544 && (
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

          {width <= 544 && (
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

          {width > 544 && <NavBar />}
        </div>
        {width <= 544 && (
          <NavBar onCloseMenu={closeMenu} isMenuOpen={isMenuOpen} mobile />
        )}
      </div>
    </>
  );
}
