import {
  cardNameInputFieldElement,
  resetCardName,
  validateCardName,
  validName,
} from './fields/cardName.js';
import {
  validateCardNumber,
  checkCardNumber,
  validCardNumber,
  resetCardNumber,
  cardNumberInputFieldElement,
} from './fields/cardNumber.js';
import {
  cardMonthExpiryInputFieldElement,
  cardYearExpiryInputFieldElement,
  resetCardExpiry,
  validateMonthExpiry,
  validateYearExpiry,
  validExpiryDate,
} from './fields/cardExpiry.js';
import {
  cardCvcInputFieldElement,
  checkCvc,
  resetCvc,
  validateCvc,
  validCvc,
} from './fields/cardCvc.js';
import { timeline } from './anim/tickAnim.js';

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

const resetForm = function () {
  resetCardName();
  resetCardNumber();
  resetCardExpiry();
  resetCvc();
};

// * validate card name on input
cardNameInputFieldElement.addEventListener(`input`, validateCardName);

// * validate card name on focus out
cardNameInputFieldElement.addEventListener(`focusout`, validateCardName);

// * disable space key on card number input
cardNumberInputFieldElement.addEventListener(`keypress`, function (e) {
  if (e.keyCode === 32) e.preventDefault();
});

// * validate card number on input
cardNumberInputFieldElement.addEventListener(`input`, validateCardNumber);

// * validate card number on focus out
cardNumberInputFieldElement.addEventListener(`focusout`, checkCardNumber);

// * validate card month expiry on input
cardMonthExpiryInputFieldElement.addEventListener(`input`, validateMonthExpiry);

// * validate card month expiry on focusout
cardMonthExpiryInputFieldElement.addEventListener(
  `focusout`,
  validateMonthExpiry
);

// * validate card year expiry on input
cardYearExpiryInputFieldElement.addEventListener(`input`, validateYearExpiry);

// * validate card year expiry on focusout
cardCvcInputFieldElement.addEventListener(`input`, validateCvc);

// * validate card cvc on input
cardCvcInputFieldElement.addEventListener(`input`, validateCvc);

// * validate card cvc on focusout
cardCvcInputFieldElement.addEventListener(`focusout`, checkCvc);

document
  .querySelector(`#payment-form`)
  .addEventListener(`submit`, function (e) {
    e.preventDefault();

    if (!validName) {
      validateCardName();
    }
    if (!validCardNumber) {
      checkCardNumber();
    }
    if (!validExpiryDate) {
      validateMonthExpiry();
      validateYearExpiry();
    }
    if (!validCvc) {
      checkCvc();
    }
    if (validName && validCardNumber && validExpiryDate && validCvc) {
      document
        .querySelector(`#payment-form`)
        .classList.add(`animate__fadeOutLeft`);
      document.querySelector(`#payment-form`).classList.add(`hidden`);

      timeline.restart();
      timeline.play();
      document.querySelector(`.complete-state`).classList.remove(`hidden`);
      document
        .querySelector(`.complete-state`)
        .classList.add(`animate__fadeInRight`);
    }
  });

document
  .querySelector(`#complete-state-btn`)
  .addEventListener(`click`, function () {
    resetForm();
    document.querySelector(`.complete-state`).classList.add(`hidden`);
    document
      .querySelector(`.complete-state`)
      .classList.remove(`animate__fadeInRight`);
    document.querySelector(`#payment-form`).classList.remove(`hidden`);
    document
      .querySelector(`#payment-form`)
      .classList.remove(`animate__fadeOutLeft`);
    document
      .querySelector(`#payment-form`)
      .classList.add(`animate__fadeInLeft`);
  });
