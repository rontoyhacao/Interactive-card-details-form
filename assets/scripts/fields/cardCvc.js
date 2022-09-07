import {
  showInputError,
  hideInputError,
  showValidField,
  hideValidField,
} from '../main.js';
import { cardNetwork } from '../fields/cardNumber.js';

export let cardCvcInputFieldElement = document.querySelector(`#cc-csc`);
let cardCvcTextElement = document.querySelector(`#card-cvc-text`);

export let validCvc;

export const resetCvc = function () {
  validCvc = undefined;
  cardCvcInputFieldElement.value = ``;
  hideValidField(cardCvcInputFieldElement);
  cardCvcTextElement.textContent = `000`;
};

export const validateCvc = function () {
  let errorTextElement = cardCvcInputFieldElement.parentNode.nextElementSibling;

  cardCvcTextElement.textContent = cardCvcInputFieldElement.value;

  if (cardCvcInputFieldElement.value.trim() === ``) {
    showInputError(
      cardCvcInputFieldElement,
      errorTextElement,
      `Please enter CVC`
    );
    hideValidField(cardCvcInputFieldElement);
    validCvc = false;
  } else {
    if (/^[0-9]+$/.test(cardCvcInputFieldElement.value)) {
      if (cardNetwork === `Visa` || cardNetwork === `Mastercard`) {
        if (cardCvcInputFieldElement.value.length === 3) {
          showValidField(cardCvcInputFieldElement);
          hideInputError(cardCvcInputFieldElement, errorTextElement);
          validCvc = true;
        } else if (cardCvcInputFieldElement.value.length > 3) {
          hideValidField(cardCvcInputFieldElement);
          showInputError(
            cardCvcInputFieldElement,
            errorTextElement,
            `Please enter a valid CVC`
          );
          validCvc = false;
        } else {
          validCvc = false;
          hideValidField(cardCvcInputFieldElement);
        }
      }
      if (cardNetwork === `AmEx`) {
        if (cardCvcInputFieldElement.value.length === 4) {
          showValidField(cardCvcInputFieldElement);
          hideInputError(cardCvcInputFieldElement, errorTextElement);
          validCvc = true;
        } else {
          validCvc = false;
          hideValidField(cardCvcInputFieldElement);
        }
      }
    } else {
      showInputError(
        cardCvcInputFieldElement,
        errorTextElement,
        `Please enter a valid CVC`
      );
      hideValidField(cardCvcInputFieldElement);
      validCvc = false;
    }
  }
};

export const checkCvc = function () {
  let errorTextElement = cardCvcInputFieldElement.parentNode.nextElementSibling;

  if (cardCvcInputFieldElement.value.trim() === ``) {
    showInputError(
      cardCvcInputFieldElement,
      errorTextElement,
      `Please enter CVC`
    );
    hideValidField(cardCvcInputFieldElement);
    validCvc = false;
  } else if (!validCvc) {
    hideValidField(cardCvcInputFieldElement);
    showInputError(
      cardCvcInputFieldElement,
      errorTextElement,
      `Please enter a valid CVC`
    );
  }
};
