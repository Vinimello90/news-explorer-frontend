import "./PopupWithForm.css";
import { useEffect, useState } from "react";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import FormValidator from "../../../../utils/FormValidator";

export function PopupWithForm({ onClosePopup }) {
  const [isOpen, setIsOpen] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [formValidator, setFormValidator] = useState();

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
  }, [signUp]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function handleClosePopup() {
    onClosePopup();
  }

  function handleSignupClick() {
    setSignUp(!signUp);
    setErrorMsg("");
  }

  function handleSubmit(user) {
    setErrorMsg(user);
  }

  return (
    <div className={`popup${isOpen ? " popup_show" : ""}`}>
      <div className="popup__container">
        <button
          onClick={handleClosePopup}
          className="popup__button popup__close_button"
        ></button>
        <h2 className="popup__title">{!signUp ? "Entrar" : "Inscrever-se"}</h2>
        {!signUp && (
          <SignIn
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSubmit}
          />
        )}
        {signUp && (
          <SignUp
            formValidator={formValidator}
            buttonDisabled={buttonDisabled}
            errorMsg={errorMsg}
            onSubmit={handleSubmit}
          />
        )}
        <p className="popup__signup-text">
          ou{" "}
          <button
            onClick={handleSignupClick}
            type="button"
            className="popup__button popup__button_goto"
          >
            {signUp ? "Entrar" : "Inscrever-se"}
          </button>
        </p>
      </div>
    </div>
  );
}
