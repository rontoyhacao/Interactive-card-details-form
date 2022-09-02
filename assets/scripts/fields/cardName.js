import {
  showInputError,
  hideInputError,
  showValidField,
  hideValidField,
} from '../main.js';

let validName;

export const validateCardName = function (e) {
  let cardNameInputFieldElement = e.target;
  let errorTextElement =
    cardNameInputFieldElement.parentNode.nextElementSibling;

  document.querySelector(`#cardholder-text`).textContent =
    cardNameInputFieldElement.value.toUpperCase();

  if (cardNameInputFieldElement.value.trim() === ``) {
    showInputError(
      cardNameInputFieldElement,
      errorTextElement,
      `Please enter a name`
    );
    hideValidField(cardNameInputFieldElement);
    validName = false;
  } else {
    if (/^[A-Za-z\s]+$/.test(cardNameInputFieldElement.value.trim())) {
      hideInputError(cardNameInputFieldElement, errorTextElement);
      showValidField(cardNameInputFieldElement);
      validName = true;
    } else {
      showInputError(
        cardNameInputFieldElement,
        errorTextElement,
        `Please enter a valid name`
      );
      hideValidField(cardNameInputFieldElement);
      validName = false;
    }
  }
  return validName;
};
