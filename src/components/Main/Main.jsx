import { About } from "./components/About/About";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";
import { PopupWithForm } from "./components/Popup/PopupWithForm";

export function Main({ articles, onClosePopup, isPopupOpen }) {
  return (
    <main className="main">
      {articles && <NewsCardList articles={articles} />}
      <About />
      {isPopupOpen && <PopupWithForm onClosePopup={onClosePopup} />}
    </main>
  );
}
