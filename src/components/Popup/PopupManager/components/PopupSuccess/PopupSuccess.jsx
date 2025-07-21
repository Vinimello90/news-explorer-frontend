import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export function PopupSuccess({ onOpenPopup }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { onPasskeyRegister } = useContext(CurrentUserContext);

  function handleGoToSignIn() {
    onOpenPopup({ type: "signin" });
  }

  function setLoadingState(loading) {
    setIsProcessing(loading);
    setButtonDisabled(loading);
  }

  function handleRegisterButton() {
    setLoadingState(true);
    onPasskeyRegister().finally(() => {
      setLoadingState(false);
    });
  }

  return (
    <>
      <h2 className="popup__title">Cadastro concluído com sucesso!</h2>
      <h3 class="popup__passkey-title">Deseja ativar o Passkey?</h3>
      <p class="popup__passkey-description">
        Com o Passkey, você pode fazer login com segurança, sem precisar de
        senha.
      </p>
      <button
        onClick={handleRegisterButton}
        type="button"
        className="popup__button popup__button_passkey"
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
      <p className="popup__goto-text">
        ou{" "}
        <button
          onClick={handleGoToSignIn}
          type="button"
          className="popup__button popup__button_goto popup__button_goto_signin"
        >
          Entrar com senha
        </button>
      </p>
    </>
  );
}
