import "./Navigation.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { PopupContext } from "../../../../contexts/PopupContext";

export function Navigation({ isSavedNews }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { popup } = useContext(PopupContext);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
      setIsMenuOpen((prev) => (window.innerWidth > 600 ? false : prev));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <Link to="/" className="navigation__link" replace>
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
              <NavBar isSavedNews={isSavedNews} isMenuOpen={isMenuOpen} />
            )}
          </div>
        </div>
      }
      {isMobile && (
        <NavBar
          onCloseMenu={closeMenu}
          isMenuOpen={isMenuOpen}
          isMobile={isMobile}
        />
      )}
    </>
  );
}
