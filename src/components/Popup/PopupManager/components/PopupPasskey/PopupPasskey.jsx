import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../../../contexts/PopupContext";

export function PopupPasskey() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { onPasskeyRegister } = useContext(CurrentUserContext);
  const { onClosePopup } = useContext(PopupContext);

  function setLoadingState(loading) {
    setIsProcessing(loading);
    setButtonDisabled(loading);
  }

  function handleRegisterButton() {
    setLoadingState(true);
    onPasskeyRegister().finally(() => {
      setLoadingState(false);
      onClosePopup();
    });
  }

  return (
    <>
      <h2 className="popup__title">Deseja ativar o Passkey?</h2>
      <p className="popup__passkey-description">
        Com o Passkey, você pode fazer login com segurança, sem precisar de
        senha.
      </p>
      <button
        onClick={handleRegisterButton}
        type="button"
        className={`popup__button popup__button_passkey${
          isProcessing ? " popup__button_processing" : ""
        }`}
        disabled={buttonDisabled}
      >
        {!isProcessing ? (
          "Registrar Passkey"
        ) : (
          <>
            Registrando...<span className="popup__spinner"></span>
          </>
        )}
      </button>
    </>
  );
}
