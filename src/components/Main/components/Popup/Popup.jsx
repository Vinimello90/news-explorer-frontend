export function Popup({ popup }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__close_button"></button>
        <h2 className="popup__title">{popup.title}</h2>
        {popup.children}
      </div>
    </div>
  );
}
