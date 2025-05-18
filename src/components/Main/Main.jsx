import { About } from "./components/About/About";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";
import { PopupWithForm } from "./components/Popup/PopupWithForm";

export function Main({ onClosePopup, isPopupOpen }) {
  return (
    <main className="main">
      <NewsCardList />
      <About />
      {isPopupOpen && <PopupWithForm onClosePopup={onClosePopup} />}
    </main>
  );
}
