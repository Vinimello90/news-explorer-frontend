import "./Popup.css";
import { useContext, useState, useEffect } from "react";
import { PopupContext } from "../../contexts/PopupContext";
import { PopupManager } from "./PopupManager/PopupManager";

export function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const { onClosePopup } = useContext(PopupContext);

  useEffect(() => {
    setIsOpen(true);
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClosePopup();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClosePopup]);

  function handleClickOutside(evt) {
    if (evt.target.classList.contains("popup")) {
      onClosePopup();
    }
  }

  function handleClosePopup() {
    onClosePopup();
  }

  return (
    <div
      onClick={handleClickOutside}
      className={`popup${isOpen ? " popup_show" : ""}`}
    >
      <div className="popup__container">
        <button
          onClick={handleClosePopup}
          className="popup__button popup__close_button"
        ></button>
        <PopupManager />
      </div>
    </div>
  );
}
