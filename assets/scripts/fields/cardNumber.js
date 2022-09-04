import {
  showInputError,
  hideInputError,
  showValidField,
  hideValidField,
} from '../main.js';

let validCardNumber = false;

// * display card network on input
const showCardNetwork = function (cardNetwork) {
  let networks = [];

  const selectedNetworkImageElement = document.querySelector(
    `[src='./assets/images/${cardNetwork}.png']`
  );

  let firstChildNetwork =
    selectedNetworkImageElement.parentNode.parentNode.firstElementChild;

  while (firstChildNetwork) {
    if (
      firstChildNetwork.nodeType === 1 &&
      firstChildNetwork !== selectedNetworkImageElement.parentNode
    ) {
      networks.push(firstChildNetwork);
    }
    firstChildNetwork = firstChildNetwork.nextSibling;
  }
  networks.forEach(function (container) {
    container.classList.add(`hidden`);
  });
};

// * display card number on input
const displayCardNumber = function (cardNetwork, cardNumberInputFieldElement) {
  const cardNumberInput = cardNumberInputFieldElement.value;

  let block1 = ``;
  let block2 = ``;
  let block3 = ``;
  let block4 = ``;
  let cardNumber;

  block1 = cardNumberInput.substring(0, 4);
  if (block1.length === 4) block1 = block1 + ` `;

  if (cardNetwork === `Visa` || cardNetwork === `Mastercard`) {
    block2 = cardNumberInput.substring(4, 8);
    if (block2.length === 4) block2 = block2 + ` `;
    block3 = cardNumberInput.substring(8, 12);
    if (block3.length === 4) block3 = block3 + ` `;
    block4 = cardNumberInput.substring(12, 16);
  }
  if (cardNetwork === `AmEx`) {
    block2 = cardNumberInput.substring(4, 10);
    if (block2.length === 6) block2 = block2 + ` `;
    block3 = cardNumberInput.substring(10, 15);
    block4 = ``;
  }
  cardNumber = block1 + block2 + block3 + block4;
  document.querySelector(`#cardnumber-text`).textContent = cardNumber;
};

const resetShowCardNetwork = function () {
  document
    .querySelectorAll(`.card-network-container`)
    .forEach(function (currentContainer) {
      currentContainer.classList.remove(`hidden`);
    });
};

export const validateCardNumber = function (e) {
  let cardNumberInputFieldElement = e.target;
  let errorTextElement =
    cardNumberInputFieldElement.parentNode.parentNode.nextElementSibling;

  document.querySelector(`#cardnumber-text`).textContent =
    cardNumberInputFieldElement.value;

  const cards = [
    {
      network: 'Visa',
      length: 16,
      prefixes: [4],
    },
    {
      network: 'Mastercard',
      length: 16,
      prefixes: [51, 52, 53, 54, 55],
    },
    { network: 'AmEx', length: 15, prefixes: [34, 37] },
  ];

  // * check if the card number input field element is empty
  if (cardNumberInputFieldElement.value.trim() === ``) {
    showInputError(
      cardNumberInputFieldElement,
      errorTextElement,
      `Please enter a card number`
    );
    resetShowCardNetwork();
    hideValidField(cardNumberInputFieldElement);

    document.querySelector(
      `#cardnumber-text`
    ).textContent = `0000 0000 0000 0000`;

    validCardNumber = false;
  } else {
    // * the following blocks of code is to verify if the entered card number by the user is a valid card number by checking if its prefix (first two digits) matches the prefix of the given credit card networks from the array: American Express (starts with 34 or 37), Visa (4), and Mastercard (51, 52, 53, 54, 55).

    // * check if the entered value in the card number input field element only contains numbers
    if (/^[0-9]+$/.test(cardNumberInputFieldElement.value)) {
      let lengthValid = false;
      let prefixValid = false;
      let cardNetwork;

      // * loop over the cards array to test the entered card number prefix
      for (let i = 0; i < cards.length; i++) {
        const selectedCardPrefixes = cards[i].prefixes;

        // * loop over the prefix array of the currently selected card from the array to test the entered card number's prefix
        for (let j = 0; j < selectedCardPrefixes.length; j++) {
          const formulatedPrefixRegEx = new RegExp(
            `^` + selectedCardPrefixes[j]
          );
          if (formulatedPrefixRegEx.test(cardNumberInputFieldElement.value)) {
            prefixValid = true;
          }
        }
        // * the following blocks of code will check if the length of the entered card number matches the length of the matched prefix card network

        // * if the prefix of the entered card number matches a card network prefix
        if (prefixValid) {
          cardNetwork = cards[i].network;
          hideInputError(cardNumberInputFieldElement, errorTextElement);
          hideValidField(cardNumberInputFieldElement);
          showCardNetwork(cardNetwork);
          displayCardNumber(cardNetwork, cardNumberInputFieldElement);

          if (/^[0-9]{15,16}$/.test(cardNumberInputFieldElement.value)) {
            for (let i = 0; i < cards.length; i++) {
              if (cardNetwork === cards[i].network) {
                const selectedCardLength = cards[i].length;

                if (
                  cardNumberInputFieldElement.value.length ===
                  selectedCardLength
                ) {
                  lengthValid = true;
                }
              }
            }
            if (lengthValid) {
              validCardNumber = true;
              showValidField(cardNumberInputFieldElement);
            } else {
              validCardNumber = false;
              hideValidField(cardNumberInputFieldElement);
            }
          }
          return validCardNumber;
        } else {
          // * if card number entered does not belong to the three card networks
          showInputError(
            cardNumberInputFieldElement,
            errorTextElement,
            `Please enter a valid card number`
          );
          resetShowCardNetwork();
          validCardNumber = false;
        }
      }
    } else {
      // * if card number entered contains invalid characters
      showInputError(
        cardNumberInputFieldElement,
        errorTextElement,
        `Please enter a valid card number`
      );
      hideValidField(cardNumberInputFieldElement);
      validCardNumber = false;
    }
    return validCardNumber;
  }
};

export const checkCardNumber = function (e) {
  let cardNumberInputFieldElement = e.target;
  let errorTextElement =
    cardNumberInputFieldElement.parentNode.parentNode.nextElementSibling;

  if (cardNumberInputFieldElement.value.trim() === ``) {
    showInputError(
      cardNumberInputFieldElement,
      errorTextElement,
      `Please enter a card number`
    );
    resetShowCardNetwork();
    hideValidField(cardNumberInputFieldElement);

    validCardNumber = false;
  }
  if (validCardNumber === true) {
    showValidField(cardNumberInputFieldElement);
  } else {
    showInputError(
      cardNumberInputFieldElement,
      errorTextElement,
      `Please enter a valid card number`
    );
    hideValidField(cardNumberInputFieldElement);
  }
};
