import "./PopupWithForm.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import FormValidator from "../../../../../utils/FormValidator";

export function PopupWithForm({ popup, onOpenPopup }) {
  const [errorMsg, setErrorMsg] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  const formValidator = useRef();
  const formRef = useRef();

  // Atualiza o estado da mensagem de erro de forma dinamica de acordo com o nome do input.
  const handleFormErrorState = useCallback(({ name, errorMessage }) => {
    setErrorMsg((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  }, []);

  // Atualiza o estado do botão habiltando/desabilitando de acordo com a validação do formulário.
  const handleFormButtonState = useCallback((isDisabled) => {
    setbuttonDisabled(isDisabled);
  }, []);

  useEffect(() => {
    formValidator.current = new FormValidator({
      formElement: formRef.current,
      inputSelector: ".popup__input",
      handleFormErrorState,
      handleFormButtonState,
    });
    formValidator.current.validateForm();
  }, [handleFormErrorState, handleFormButtonState, popup]);

  function handleGoToSignIn() {
    onOpenPopup({ type: "signin" });
    setErrorMsg("");
  }

  function handleGoToSignUp() {
    onOpenPopup({ type: "signup" });
    setErrorMsg("");
  }

  return (
    <>
      <h2 className="popup__title">
        {popup === "signin" ? "Entrar" : "Inscrever-se"}
      </h2>
      {popup === "signin" && (
        <SignIn
          formRef={formRef}
          formValidator={formValidator}
          buttonDisabled={buttonDisabled}
          errorMsg={errorMsg}
          onError={handleFormErrorState}
        />
      )}
      {popup === "signup" && (
        <SignUp
          formRef={formRef}
          formValidator={formValidator}
          buttonDisabled={buttonDisabled}
          errorMsg={errorMsg}
          onError={handleFormErrorState}
        />
      )}

      <p className="popup__goto-text">
        ou{" "}
        <button
          onClick={popup === "signin" ? handleGoToSignUp : handleGoToSignIn}
          type="button"
          className="popup__button popup__button_goto"
        >
          {popup === "signin" ? "Inscrever-se" : "Entrar"}
        </button>
      </p>
    </>
  );
}
