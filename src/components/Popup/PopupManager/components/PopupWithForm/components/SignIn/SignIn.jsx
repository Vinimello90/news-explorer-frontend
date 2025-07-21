import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../../contexts/CurrentUserContext";

export function SignIn(props) {
  const { formRef, formValidator, buttonDisabled, errorMsg, onError } = props;

  const { onSignIn } = useContext(CurrentUserContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(evt) {
    const inputElement = evt.target;
    formValidator.current.validateInput(inputElement);
    formValidator.current.validateForm();
    setInputValues((prev) => ({
      ...prev,
      [inputElement.id]: inputElement.value,
    }));
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    setIsProcessing(true);
    onSignIn(inputValues, onError).finally(() => {
      setIsProcessing(false);
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmitButton}
      name="signin"
      className="popup__form"
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          E-mail
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="email"
            className={`popup__input${
              errorMsg?.email ? " popup__input_error" : ""
            }`}
            placeholder="Insira e-mail"
            value={inputValues?.email}
            spellCheck={false}
            required
          />
          <span
            className={`popup__form-error popup__form-error_input${
              errorMsg?.email ? " popup__form-error_input_show" : ""
            }`}
          >
            {errorMsg?.email}
          </span>
        </label>
        <label className="popup__field">
          Senha
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
            className={`popup__input${
              errorMsg?.password ? " popup__input_error" : ""
            }`}
            placeholder="Insira a senha"
            value={inputValues?.password}
            spellCheck={false}
            required
          />
          <span
            className={`popup__form-error popup__form-error_input${
              errorMsg?.password ? " popup__form-error_input_show" : ""
            }`}
          >
            {errorMsg?.password}
          </span>
        </label>
        <span
          className={`popup__form-error popup__form-error_submit${
            errorMsg?.submit ? " popup__form-error_submit_show" : ""
          }`}
        >
          {errorMsg?.submit}
        </span>
        <button
          type="submit"
          className={`popup__button popup__button_submit${
            isProcessing ? " popup__button_processing" : ""
          }`}
          disabled={buttonDisabled || isProcessing}
        >
          {!isProcessing ? (
            "Entrar"
          ) : (
            <>
              Entrando...<span className="popup__spinner"></span>
            </>
          )}
        </button>
      </fieldset>
    </form>
  );
}
