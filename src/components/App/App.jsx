import "./App.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useState } from "react";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <div className="page">
      <Header isPopupOpen={isPopupOpen} onOpenPopup={openPopup} />
      <Main isPopupOpen={isPopupOpen} onClosePopup={closePopup} />
      <Footer />
    </div>
  );
}

export default App;
