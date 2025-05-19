import { About } from "./components/About/About";
import { News } from "./components/News/News";
import { PopupWithForm } from "./components/Popup/PopupWithForm";

export function Main(props) {
  const { isSearching, showResults, articles, onClosePopup, isPopupOpen } =
    props;

  return (
    <main className="main">
      {showResults && <News isSearching={isSearching} articles={articles} />}
      <About />
      {isPopupOpen && <PopupWithForm onClosePopup={onClosePopup} />}
    </main>
  );
}
