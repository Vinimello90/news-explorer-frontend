import "./Navigation.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

export function Navigation({ isSavedNews, popup, onOpenPopup }) {
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

  return (
    <>
      {
        <div
          className={`navigation${
            isSavedNews && !isMenuOpen ? " navigation_light" : ""
          }${popup && isMobile ? " navigation_hidden" : ""}`}
        >
          <div
            className={`navigation__container${
              isSavedNews ? " navigation__container_light" : ""
            }`}
          >
            <Link to="/" className="navigation__link">
              <h1
                className={`navigation__logo${
                  isSavedNews && isMenuOpen ? " navigation__logo_dark" : ""
                }`}
              >
                NewsExplorer
              </h1>
            </Link>
            {isMobile && (
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                type="button"
                className={`navigation__menu-toggle${
                  isMenuOpen ? " navigation__menu-toggle_opened" : ""
                }`}
              >
                <div
                  className={`navigation__menu-line${
                    isSavedNews && !isMenuOpen
                      ? " navigation__menu-lines_light"
                      : ""
                  }`}
                ></div>
                <div
                  className={`navigation__menu-line${
                    isSavedNews && !isMenuOpen
                      ? " navigation__menu-lines_light"
                      : ""
                  }`}
                ></div>
              </button>
            )}
            {!isMobile && (
              <NavBar
                isSavedNews={isSavedNews}
                isMenuOpen={isMenuOpen}
                onOpenPopup={onOpenPopup}
              />
            )}
          </div>
        </div>
      }
      {isMobile && (
        <NavBar
          popup={popup}
          onOpenPopup={onOpenPopup}
          onCloseMenu={closeMenu}
          isMenuOpen={isMenuOpen}
          isMobile={isMobile}
        />
      )}
    </>
  );
}
