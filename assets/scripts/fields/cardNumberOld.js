import { showInputError } from '../mainOld.js';

export const ccErrors = [];
ccErrors[0] = 'Please enter a card number';
ccErrors[1] = 'Please enter a valid card number';

export const validateCardNumber = function (e) {
  let cardNumberInput = e.target.value;

  const cards = [
    {
      network: 'Visa',
      length: '16',
      prefixes: '4',
      checkdigit: true,
    },
    {
      network: 'MasterCard',
      length: '16',
      prefixes: '51,52,53,54,55',
      checkdigit: true,
    },
    { network: 'AmEx', length: '15', prefixes: '34,37', checkdigit: true },
  ];

  const response = function (success, message = null, cardNetwork = null) {
    console.log(message, success, cardNetwork);
    //   return { message, success, cardNetwork };
  };

  // * display card network
  const showCardNetwork = function (cardNetwork) {
    console.log(cardNetwork);
  };

  // * hide card number error
  const hideCardNumberError = function () {
    document.querySelector(`.cc-number-error`).classList.remove(`active`);
  };

  // * if card number input field goes empty return an error
  if (cardNumberInput.length === 0) {
    showInputError();
    document.querySelector(`.cc-number-error`).textContent = ccErrors[0];
  } else {
    if (/^[0-9]+$/.test(cardNumberInput)) {
      let lengthValid = false;
      let prefixValid = false;
      let cardNetwork = ``;

      // * loop over the cards array to test the entered card number
      for (let i = 0; i < cards.length; i++) {
        const selectedCardPrefixes = cards[i].prefixes.split(`,`);

        // * loop over the prefixes of the currently selected card from the array to test the entered card number's prefix
        for (let j = 0; j < selectedCardPrefixes.length; j++) {
          const formulatedPrefixRegEx = new RegExp(
            `^` + selectedCardPrefixes[j]
          );
          if (formulatedPrefixRegEx.test(cardNumberInput)) {
            prefixValid = true;
          }
        }
        if (prefixValid) {
          hideCardNumberError();
          cardNetwork = cards[i].network;

          if (/^[0-9]{13,16}$/.test(cardNumberInput)) {
            for (let i = 0; i < cards.length; i++) {
              if (cardNetwork === cards[i].network) {
                const selectedCardLength = cards[i].length;

                if (cardNumberInput.length == selectedCardLength) {
                  lengthValid = true;
                }
              }
            }
            if (lengthValid) {
              return response(`all valid!`, cardNetwork);
            }
            // else {
            //   showCardNumberError();
            //   document.querySelector(`.cc-number-error`).textContent =
            //     ccErrors[1];
            // }
          }
          return showCardNetwork(cardNetwork);
        } else {
          showInputError();
          document.querySelector(`.cc-number-error`).textContent = ccErrors[1];
        }
      }
    } else {
      showInputError();
      document.querySelector(`.cc-number-error`).textContent = ccErrors[1];
    }
    // if (/^[0-9]{13,19}$/.test(cardNumberInput)) {

    //   // * loop over the cards array to test the entered card number
    //   for (let i = 0; i < cards.length; i++) {
    //     const selectedCardPrefixes = cards[i].prefixes.split(`,`);

    //     // * loop over the currently selected card's prefixes to test the entered card number's prefix
    //     for (let j = 0; j < selectedCardPrefixes.length; j++) {
    //       const formulatedPrefixRegEx = new RegExp(
    //         `^` + selectedCardPrefixes[j]
    //       );
    //       if (formulatedPrefixRegEx.test(cardNumberInput)) {
    //         prefixValid = true;
    //       }
    //     }

    //     if (prefixValid) {
    //       const selectedCardLengths = cards[i].length.split(`,`);

    //       // * loop over the currently selected card's lengths to test the entered card number's length
    //       for (let j = 0; j < selectedCardLengths.length; j++) {
    //         if (cardNumberInput.length == selectedCardLengths[j]) {
    //           lengthValid = true;
    //         }
    //       }
    //     }

    //     if (prefixValid && lengthValid) {
    //       cardNetwork = cards[i].network;
    //       return response(true, null, cardNetwork);
    //     }
    //   }
    //   if (!prefixValid) response(false);
    //   if (!lengthValid) response(false);
    //   return response(true, null, cardNetwork);
    // }
    // else {
    //   document.querySelector(`.cc-number-error`).classList.add(`active`);
    //   document.querySelector(`.cc-number-error`).textContent = ccErrors[1];
    //   console.log(`invalid`);
    // }
  }
};
