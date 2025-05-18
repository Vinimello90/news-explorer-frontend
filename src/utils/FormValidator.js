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

  // Válida os inputs dos formulários e retorna verdadeiro ou falso.
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Válida os inputs para exibir ou esconder a mensagem de erro
  validateInput = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement.id, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement.id);
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
        console.log(hasInvalidInput);
        this._toggleButtonState(hasInvalidInput);
      });
    });
  };
}
