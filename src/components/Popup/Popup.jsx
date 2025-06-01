import "./PopupWithForm.css";
import { useContext, useState } from "react";
import { PopupContext } from "../../contexts/PopupContext";

export function PopupWithForm() {
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
      </div>
    </div>
  );
}
