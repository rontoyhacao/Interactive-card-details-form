import {
  showInputError,
  hideInputError,
  hideValidField,
  showValidField,
} from '../main.js';

export let cardMonthExpiryInputFieldElement =
  document.querySelector(`#cc-exp-month`);
export let cardYearExpiryInputFieldElement =
  document.querySelector(`#cc-exp-year`);
let cardMonthExpiryTextElement = document.querySelector(`#card-month-text`);
let cardYearExpiryTextElement = document.querySelector(`#card-year-text`);

let validMonth;
let validYear;
export let validExpiryDate;
let currentYear = new Date().toLocaleDateString(undefined, {
  year: `2-digit`,
});
let currentMonth = new Date().toLocaleDateString(undefined, {
  month: `numeric`,
});

export const resetCardExpiry = function () {
  validMonth = undefined;
  validYear = undefined;
  validExpiryDate = undefined;
  cardMonthExpiryInputFieldElement.value = ``;
  cardYearExpiryInputFieldElement.value = ``;
  hideValidField(cardMonthExpiryInputFieldElement);
  hideValidField(cardYearExpiryInputFieldElement);
  cardMonthExpiryTextElement.textContent = `00`;
  cardYearExpiryTextElement.textContent = `00`;
};

const validateExpiry = function (
  valid,
  inputFieldElement,
  errorTextElement,
  time
) {
  if (valid) {
    if (
      /^[0-9]+$/.test(inputFieldElement.value) &&
      inputFieldElement.value.length === 2
    ) {
      if (cardYearExpiryInputFieldElement.value === currentYear) {
        if (
          cardMonthExpiryInputFieldElement.value < Number(`0${currentMonth}`)
        ) {
          validExpiryDate = false;
          showInputError(
            inputFieldElement,
            errorTextElement,
            `Card has been expired`
          );
          hideValidField(inputFieldElement);
        }
        if (
          cardMonthExpiryInputFieldElement.value >=
            Number(`0${currentMonth}`) &&
          cardMonthExpiryInputFieldElement.value <= 12
        ) {
          validExpiryDate = true;
          showValidField(cardMonthExpiryInputFieldElement);
          showValidField(cardYearExpiryInputFieldElement);
        }
      }
      if (cardYearExpiryInputFieldElement.value > currentYear) {
        validExpiryDate = true;
        showValidField(cardMonthExpiryInputFieldElement);
        showValidField(cardYearExpiryInputFieldElement);
      }
    } else {
      validExpiryDate = false;
      showInputError(
        inputFieldElement,
        errorTextElement,
        `Please enter a valid ${time}`
      );
      hideValidField(cardMonthExpiryInputFieldElement);
    }
  } else {
    validExpiryDate = false;
  }
};

export const validateMonthExpiry = function () {
  let errorTextElement =
    cardMonthExpiryInputFieldElement.parentNode.parentNode.nextElementSibling;

  document.querySelector(`#card-month-text`).textContent =
    cardMonthExpiryInputFieldElement.value;

  if (cardMonthExpiryInputFieldElement.value.trim() === ``) {
    showInputError(
      cardMonthExpiryInputFieldElement,
      errorTextElement,
      `Please enter a month`
    );
    hideValidField(cardMonthExpiryInputFieldElement);

    cardMonthExpiryTextElement.textContent = `00`;

    validMonth = false;
  } else {
    if (/^[0-9]+$/.test(cardMonthExpiryInputFieldElement.value)) {
      if (
        cardMonthExpiryInputFieldElement.value >= 0o1 &&
        cardMonthExpiryInputFieldElement.value <= 12 &&
        cardMonthExpiryInputFieldElement.value.length === 2
      ) {
        hideInputError(cardMonthExpiryInputFieldElement, errorTextElement);
        showValidField(cardMonthExpiryInputFieldElement);
        validMonth = true;
      } else {
        showInputError(
          cardMonthExpiryInputFieldElement,
          errorTextElement,
          `Month must be between 01 and 12`
        );
        hideValidField(cardMonthExpiryInputFieldElement);
        validMonth = false;
      }
    } else {
      showInputError(
        cardMonthExpiryInputFieldElement,
        errorTextElement,
        `Please enter a valid month`
      );
      hideValidField(cardMonthExpiryInputFieldElement);
      validMonth = false;
    }
  }

  validateExpiry(
    validYear,
    cardMonthExpiryInputFieldElement,
    errorTextElement,
    `month`
  );
};

export const validateYearExpiry = function () {
  let errorTextElement =
    cardYearExpiryInputFieldElement.parentNode.parentNode.nextElementSibling;

  document.querySelector(`#card-year-text`).textContent =
    cardYearExpiryInputFieldElement.value;

  if (cardYearExpiryInputFieldElement.value.trim() === ``) {
    showInputError(
      cardYearExpiryInputFieldElement,
      errorTextElement,
      `Please enter a year`
    );
    hideValidField(cardYearExpiryInputFieldElement);

    cardYearExpiryTextElement.textContent = `00`;

    validYear = false;
  } else {
    if (/^[0-9]+$/.test(cardYearExpiryInputFieldElement.value)) {
      if (
        cardYearExpiryInputFieldElement.value >= currentYear &&
        cardYearExpiryInputFieldElement.value <= 47 &&
        cardYearExpiryInputFieldElement.value.length === 2
      ) {
        hideInputError(cardYearExpiryInputFieldElement, errorTextElement);
        showValidField(cardYearExpiryInputFieldElement);
        validYear = true;
      }
      if (
        cardYearExpiryInputFieldElement.value < currentYear &&
        cardYearExpiryInputFieldElement.value.length === 2
      ) {
        showInputError(
          cardYearExpiryInputFieldElement,
          errorTextElement,
          `Card has expired`
        );
        hideValidField(cardYearExpiryInputFieldElement);
        validYear = false;
      }
      if (
        cardYearExpiryInputFieldElement.value > 47 &&
        cardYearExpiryInputFieldElement.value.length === 2
      ) {
        showInputError(
          cardYearExpiryInputFieldElement,
          errorTextElement,
          `Year is too far`
        );
        hideValidField(cardYearExpiryInputFieldElement);
        validYear = false;
      }
    } else {
      showInputError(
        cardYearExpiryInputFieldElement,
        errorTextElement,
        `Please enter a valid year`
      );
      hideValidField(cardYearExpiryInputFieldElement);
      validYear = false;
    }
  }

  validateExpiry(
    validMonth,
    cardYearExpiryInputFieldElement,
    errorTextElement,
    `year`
  );
};
