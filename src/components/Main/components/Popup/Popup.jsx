import "./Popup.css";

export function Popup({ popup }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__button popup__close_button"></button>
        <h2 className="popup__title">{popup.title}</h2>
        {popup.children}
        <p className="popup__signup-text">
          ou{" "}
          <button type="button" className="popup__button popup__button_goto">
            Inscreva-se
          </button>
        </p>
      </div>
    </div>
  );
}
