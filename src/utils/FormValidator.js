// A classe FormValidator é responsável por válidar o formulário.
export default class FormValidator {
  constructor({ classObj, handleFormErrorState, handleFormButtonState }) {
    this._classObj = classObj;
    this._formElements = document.querySelectorAll(classObj.formSelector);
    this._formList = Array.from(this._formElements);
    this._handleFormErrorState = handleFormErrorState;
    this._handleFormButtonState = handleFormButtonState;
  }

  // Passa os dados da validação para alterar o estado e exibir a mensagem de erro.
  _showInputError = (inputName, errorMessage) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: errorMessage,
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // Passa os dados da validação para alterar o estado e esconder a mensagem de erro.
  _hideInputError = (inputName) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: "",
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // passa o valor da validação pra alterar o estado do botão.
  _toggleButtonState = (hasInvalidInput) => {
    this._handleFormButtonState(hasInvalidInput);
  };

  _isPasswordValid = (inputElement) => {
    const value = inputElement.value;
    const checkInput = [
      { regex: /[A-Z]/, message: "1 letra maiúscula" },
      { regex: /[a-z]/, message: "1 letra minúscula" },
      { regex: /[0-9]/, message: "1 número" },
      {
        regex: /[!@#$%^&*()\-_=+[\]{};:,.<>?]/,
        message: "1 caractere especial",
      },
      { regex: /.{8,}/, message: "mínimo de 8 caracteres" },
    ];

    const errors = checkInput
      .filter(({ regex }) => !regex.test(value))
      .map(({ message }) => message);

    const message = `Precisa conter ${errors.join(", ")}.`;
    return { isValid: errors.length === 0, message };
  };

  // Válida os inputs dos formulários e retorna verdadeiro ou falso.
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      const isSignup = inputElement.form.name === "signup";
      if (inputElement.value && inputElement.type === "password" && isSignup) {
        const validation = this._isPasswordValid(inputElement);
        return !validation.isValid;
      }
      return !inputElement.validity.valid;
    });
  };

  // Válida o input de senha para exibir ou esconder a mensagem de erro
  _validatePasswordInput = (inputElement) => {
    const validation = this._isPasswordValid(inputElement);
    if (!validation.isValid) {
      this._showInputError(inputElement.id, validation.message);
    } else {
      this._hideInputError(inputElement.id);
    }
  };

  _validateStandardInput = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement.id, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement.id);
    }
  };

  // Válida os inputs para exibir ou esconder a mensagem de erro
  validateInput = (inputElement) => {
    const isSignup = inputElement.form.name === "signup";
    if (inputElement.value && inputElement.type === "password" && isSignup) {
      this._validatePasswordInput(inputElement);
    } else {
      this._validateStandardInput(inputElement);
    }
  };

  // Válida o formulário.
  validateForm = () => {
    this._formList.forEach((formElement) => {
      const fieldsetList = Array.from(
        formElement.querySelectorAll(this._classObj.fieldsetSelector)
      );
      fieldsetList.forEach((fieldset) => {
        const inputList = Array.from(
          fieldset.querySelectorAll(this._classObj.inputSelector)
        );
        const hasInvalidInput = this._hasInvalidInput(inputList);
        this._toggleButtonState(hasInvalidInput);
      });
    });
  };
}
