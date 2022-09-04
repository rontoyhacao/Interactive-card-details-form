import {
  showInputError,
  hideInputError,
  hideValidField,
  showValidField,
} from '../main.js';

let validMonth;

export const validateMonthExpiry = function (e) {
  let cardMonthExpiryElement = e.target;
  let errorTextElement =
    cardMonthExpiryElement.parentNode.parentNode.nextElementSibling;

  if (cardMonthExpiryElement.value.trim() === ``) {
    showInputError(
      cardMonthExpiryElement,
      errorTextElement,
      `Please enter a month`
    );
    hideValidField(cardMonthExpiryElement);
    validMonth = false;
  } else {
    if (/^[0-9]+$/.test(cardMonthExpiryElement.value)) {
      if (
        cardMonthExpiryElement.value >= 0o1 &&
        cardMonthExpiryElement.value <= 12 &&
        cardMonthExpiryElement.value.length === 2
      ) {
        hideInputError(cardMonthExpiryElement, errorTextElement);
        showValidField(cardMonthExpiryElement);
        validMonth = true;
      } else {
        showInputError(
          cardMonthExpiryElement,
          errorTextElement,
          `Month must be between 01 and 12`
        );
        hideValidField(cardMonthExpiryElement);
        validMonth = false;
      }
    } else {
      showInputError(
        cardMonthExpiryElement,
        errorTextElement,
        `Please enter a valid month`
      );
      hideValidField(cardMonthExpiryElement);
      validMonth = false;
    }
  }
  return validMonth;
};
