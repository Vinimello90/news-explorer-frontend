import "./PopupConfirmation.css";
import { useState } from "react";

export function PopupConfirmation({ article, onRemoveArticle }) {
  const [isProcessing, setIsProcessing] = useState(false);

  function handleButtonClick() {
    setIsProcessing(true);
    onRemoveArticle(article).finally(() => {
      setIsProcessing(false);
    });
  }
  return (
    <>
      <h2 className="popup__title popup__title_confirmation">
        Você tem certeza que deseja remover o artigo salvo?
      </h2>
      <button
        onClick={handleButtonClick}
        type="button"
        className={`popup__button popup__button_submit ${
          isProcessing ? " popup__submit_processing" : ""
        }`}
        disabled={isProcessing}
      >
        {!isProcessing ? (
          "Confirmar"
        ) : (
          <>
            Removendo... <span className="popup__spinner"></span>
          </>
        )}
      </button>
    </>
  );
}
