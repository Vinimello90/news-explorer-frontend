import { useState } from "react";

export function SignUp(props) {
  const { formValidator, buttonDisabled, errorMsg, onSubmit } = props;

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleInputChange(evt) {
    const inputElement = evt.target;
    formValidator.validateInput(inputElement);
    formValidator.validateForm();
    setInputValues((prev) => ({
      ...prev,
      [inputElement.id]: inputElement.value,
    }));
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    onSubmit(inputValues);
  }

  return (
    <form onSubmit={handleSubmitButton} name="signup" className="popup__form">
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
            value={inputValues.email}
            spellCheck={false}
            required
            autoComplete="new-email"
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
            value={inputValues.password}
            spellCheck={false}
            minLength={8}
            autoComplete="new-password"
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
        <label className="popup__field">
          Nome de usuário
          <input
            onChange={handleInputChange}
            type="text"
            name="username"
            id="username"
            className={`popup__input${
              errorMsg?.username ? " popup__input_error" : ""
            }`}
            placeholder="Insira um nome de usário"
            value={inputValues.username}
            spellCheck={false}
            minLength={2}
            maxLength={10}
            autoComplete="new-username"
            required
          />
          <span
            className={`popup__form-error popup__form-error_input${
              errorMsg?.username ? " popup__form-error_input_show" : ""
            }`}
          >
            {errorMsg?.username}
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
          className="popup__button popup__button_submit"
          disabled={buttonDisabled}
        >
          Inscrever-se
        </button>
      </fieldset>
    </form>
  );
}
