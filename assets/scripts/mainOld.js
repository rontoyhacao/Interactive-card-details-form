import { validateCardName } from './fields/cardName.js';
import { validateCardNumber, ccErrors } from './fields/cardNumberOld.js';

const confirmPaymentBtn = document.querySelector(`#confirm-payment`);
const paymentForm = document.querySelector(`#payment-form`);
// const inputErrorText = document.querySelector(`.input-error`);

document.querySelector(`#cc-name`).addEventListener(`input`, validateCardName);

// * show card number error
export const showInputError = function () {
  document.querySelector(`.cc-number-error`).classList.add(`active`);
  document.querySelector(`#cc-number`).classList.add(`has-error`);
};

// * disable space on card number input
document.querySelector(`#cc-number`).addEventListener(`keypress`, function (e) {
  if (e.keyCode === 32) e.preventDefault();
});

// * validate entered card number on focus out
document.querySelector(`#cc-number`).addEventListener(`focusout`, function (e) {
  if (e.target.value.length === 0) {
    // console.log(`ahhah`);
    showInputError();
    document.querySelector(`.cc-number-error`).textContent = ccErrors[0];
  }
  if (e.target.value.length < 15) {
    showInputError();
    document.querySelector(`.cc-number-error`).textContent = ccErrors[1];
  }
});

// // * show error on every empty input field when focused out
// document.querySelectorAll(`.primary-input`).forEach(function (inputField) {
//   inputField.addEventListener(`focusout`, function (e) {
//     if (e.target.value.length === 0) {
//       e.target.classList.add(`primary-input--error`);
//     } else {
//       e.target.classList.remove(`primary-input--error`);
//     }
//   });
// });

document
  .querySelector(`#cc-number`)
  .addEventListener(`input`, validateCardNumber);

paymentForm.addEventListener(`submit`, function () {
  console.log(this.reportValidity());
  console.log(this);
});
confirmPaymentBtn.addEventListener(`click`, function () {
  console.log(this);
});
