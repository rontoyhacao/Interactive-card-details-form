import {
  showInputError,
  hideInputError,
  showValidField,
  hideValidField,
} from '../main.js';

export let cardNameInputFieldElement = document.querySelector(`#cc-name`);
let cardNameTextElement = document.querySelector(`#cardholder-text`);

export let validName;

export const resetCardName = function () {
  validName = undefined;
  cardNameInputFieldElement.value = ``;
  hideValidField(cardNameInputFieldElement);
  cardNameTextElement.textContent = `JANE APPLESEED`;
};

export const validateCardName = function () {
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

    cardNameTextElement.textContent = `JANE APPLESEED`;

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
