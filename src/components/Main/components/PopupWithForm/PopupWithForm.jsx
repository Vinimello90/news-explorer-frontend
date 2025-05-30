import "./PopupWithForm.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import FormValidator from "../../../../utils/FormValidator";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export function PopupWithForm({ isProcessing, setPopup, popup, onClosePopup }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  const { onSignUp, onSignIn } = useContext(CurrentUserContext);

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
  }, [popup]);

  useEffect(() => {
    setIsOpen(true);
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClosePopup();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClosePopup]);

  function handleClickOutside(evt) {
    if (evt.target.classList.contains("popup")) {
      onClosePopup();
    }
  }

  function handleClosePopup() {
    onClosePopup();
  }

  function handleGoToSignIn() {
    setPopup("signin");
    setErrorMsg("");
  }

  function handleGoToSignUp() {
    setPopup("signup");
    setErrorMsg("");
  }

  function onError(error) {
    setErrorMsg(error);
  }

  function handleSignUpSubmit(user) {
    onSignUp(user, onError);
  }

  function handleSignInSubmit(user) {
    onSignIn(user, onError);
  }

  return (
    <div
      onClick={handleClickOutside}
      className={`popup${isOpen ? " popup_show" : ""}`}
    >
      <div className="popup__container">
        <button
          onClick={handleClosePopup}
          className="popup__button popup__close_button"
        ></button>
        <h2 className="popup__title">
          {popup === "signin" && "Entrar"}
          {popup === "signup" && "Inscrever-se"}
          {popup === "success" && "Cadastro concluído com sucesso!"}
        </h2>

        {popup === "signin" && (
          <SignIn
            formRef={formRef}
            isProcessing={isProcessing}
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSignInSubmit}
          />
        )}

        {popup === "signup" && (
          <SignUp
            formRef={formRef}
            isProcessing={isProcessing}
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSignUpSubmit}
          />
        )}

        {popup === "success" && (
          <button
            onClick={handleGoToSignIn}
            type="button"
            className="popup__button popup__button_goto popup__button_goto_signin"
          >
            Entrar
          </button>
        )}

        {popup !== "success" && (
          <p className="popup__signup-text">
            ou{" "}
            <button
              onClick={popup === "signin" ? handleGoToSignUp : handleGoToSignIn}
              type="button"
              className="popup__button popup__button_goto"
            >
              {popup === "signin" ? "Inscrever-se" : "Entrar"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
