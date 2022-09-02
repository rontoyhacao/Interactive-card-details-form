import { validateCardName } from './fields/cardName.js';
import { validateCardNumber, checkCardNumber } from './fields/cardNumber.js';

export const showInputError = function (
  inputFieldElement,
  errorTextElement,
  errorMessage
) {
  inputFieldElement.classList.add(`has-error`);
  errorTextElement.classList.add(`active`);
  errorTextElement.textContent = errorMessage;
};

export const hideInputError = function (inputFieldElement, errorTextElement) {
  inputFieldElement.classList.remove(`has-error`);
  errorTextElement.classList.remove(`active`);
};

export const showValidField = function (inputFieldElement) {
  inputFieldElement.classList.add(`is-valid`);
};

export const hideValidField = function (inputFieldElement) {
  inputFieldElement.classList.remove(`is-valid`);
};

// * validate card name on input
document.querySelector(`#cc-name`).addEventListener(`input`, validateCardName);

// * validate card name on focus out
document
  .querySelector(`#cc-name`)
  .addEventListener(`focusout`, validateCardName);

// * disable space key on card number input
document.querySelector(`#cc-number`).addEventListener(`keypress`, function (e) {
  if (e.keyCode === 32) e.preventDefault();
});

// * validate card number on input
document
  .querySelector(`#cc-number`)
  .addEventListener(`input`, validateCardNumber);

// * validate card number on focus out
document
  .querySelector(`#cc-number`)
  .addEventListener(`focusout`, checkCardNumber);
