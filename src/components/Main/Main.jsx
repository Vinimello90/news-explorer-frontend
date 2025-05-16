import { useState } from "react";
import { About } from "./components/About/About";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";
import { PopupWithForm } from "./components/Popup/components/PopupWithForm/PopupWithForm";
import { Popup } from "./components/Popup/Popup";

export function Main() {
  const [popup, setPopup] = useState({
    title: "Entrar",
    children: <PopupWithForm signIn />,
  });
  return (
    <main className="main">
      <NewsCardList />
      <About />
      <Popup popup={popup} />
    </main>
  );
}
