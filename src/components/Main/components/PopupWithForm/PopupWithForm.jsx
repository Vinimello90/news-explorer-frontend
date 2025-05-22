import "./PopupWithForm.css";
import { useContext, useEffect, useState } from "react";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import FormValidator from "../../../../utils/FormValidator";
import { CurrentUserContext } from "../../../../../../../Sprint_18/web_project_api_full/frontend/src/contexts/CurrentUserContext";

export function PopupWithForm({ onClosePopup, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("signin");
  const [errorMsg, setErrorMsg] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [formValidator, setFormValidator] = useState();

  const { onSignUp, onSignIn } = useContext(CurrentUserContext);

  useEffect(() => {
    const formValidator = new FormValidator({
      classObj: {
        formSelector: ".popup__form",
        fieldsetSelector: ".popup__fieldset",
        inputSelector: ".popup__input",
      },
      handleFormErrorState: ({ name, errorMessage }) => {
        // Atualiza o estado da mensagem de erro de forma dinamica de acordo com o nome do input.
        setErrorMsg((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      },
      // Atualiza o estado do botão habiltando/desabilitando de acordo com a validação do formulário.
      handleFormButtonState: (isDisabled) => {
        setbuttonDisabled(isDisabled);
      },
    });
    setFormValidator(formValidator);
    formValidator.validateForm();
  }, [currentPopup]);

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
    setCurrentPopup("signin");
    setErrorMsg("");
  }

  function handleGoToSignUp() {
    setCurrentPopup("signup");
    setErrorMsg("");
  }

  async function handleSignUpSubmit(user) {
    onSignUp(user);
    setCurrentPopup("success");
  }

  async function handleSignInSubmit(user) {
    try {
      await onSignIn(user);
    } catch (err) {
      setErrorMsg({ submit: err.message });
    }
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
          {currentPopup === "signin" && "Entrar"}
          {currentPopup === "signup" && "Inscrever-se"}
          {currentPopup === "success" && "Cadastro concluído com sucesso!"}
        </h2>

        {currentPopup === "signin" && (
          <SignIn
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSignInSubmit}
          />
        )}

        {currentPopup === "signup" && (
          <SignUp
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSignUpSubmit}
          />
        )}

        {currentPopup === "success" && (
          <button
            onClick={handleGoToSignIn}
            type="button"
            className="popup__button popup__button_goto popup__button_goto_signin"
          >
            Entrar
          </button>
        )}

        {currentPopup !== "success" && (
          <p className="popup__signup-text">
            ou{" "}
            <button
              onClick={
                currentPopup === "signin" ? handleGoToSignUp : handleGoToSignIn
              }
              type="button"
              className="popup__button popup__button_goto"
            >
              {currentPopup === "signin" ? "Inscrever-se" : "Entrar"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
