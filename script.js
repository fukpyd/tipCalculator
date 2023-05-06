`strict mode`;

const billValueWrapper = document.getElementById("bill-value-wrapper");
const inputWrapper = document.querySelectorAll(".input-wrapper");
const peopleAmountWrapper = document.getElementById("people-amount-wrapper");
const billValueInput = document.querySelector("#bill-value");
const peopleAmountInput = document.querySelector("#input-people-amount");
const calcBtn = document.querySelector(".btn-primary");
const resetBtn = document.querySelector(".btn-secondary");
const radioInputs = document.querySelectorAll(".radio-input");
const tipsOptions = document.querySelector(".tips-options");
const tipsFieldset = document.querySelector(".tips");
const tip = document.querySelectorAll(".tip");
const customTipInput = document.querySelector(".custom-input");
const inputsWithIcon = document.querySelectorAll(
  ".input-wrapper > .input-with-icon"
);
const outputTipValue = document.querySelector(".output-value");
let shouldAddListener = true;

// outputTipValue.textContent = formattedOutputTip;

const outputValueTotal = document.querySelector(".output-value-total");

// const formattedValueTotal = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// }).format(DEFAULT_VALUE);
// outputValueTotal.textContent = formattedValueTotal;

const getSelectedTip = () => {
  return document.querySelector(".tip > .radio-input:checked");
};

let isValidationMode = false;

const createInputError = function (customClass) {
  const inputError = document.createElement("span");
  inputError.textContent = "Can't be empty or zero!";
  inputError.classList.add("input-error-message", customClass);
  return inputError;
};

inputsWithIcon.forEach((inputWithIcon, index) => {
  inputWithIcon.addEventListener("blur", function () {
    if (inputWithIcon.value < 1) {
      inputWithIcon.value = "";
      const errorMessage = createInputError();
      inputWrapper[index].appendChild(errorMessage);
      inputsWithIcon[index].style.border = "1px solid red";
    }
  });
});

inputsWithIcon.forEach((inputWithIcon) =>
  inputWithIcon.addEventListener("focus", function () {
    inputWithIcon.style.border = "none";
    inputWithIcon.nextElementSibling?.remove();
  })
);

// customTip.addEventListener("blur", function () {}

const validateTips = (e) => {
  const isTipsOptionsContent = e.target.closest(".tips-options");
  if (!isTipsOptionsContent) {
    const selectedTip = getSelectedTip();
    console.log(shouldAddListener, "added, then false");
    shouldAddListener = false; // false
    if (!customTipInput.valueAsNumber && !selectedTip) {
      const errorMessage = createInputError("tips-error-message");
      tipsFieldset.appendChild(errorMessage);
      tipsOptions.style.border = "1px solid red";
    }
    document.removeEventListener("click", validateTips);
    shouldAddListener = true;
  }
};

tipsOptions.addEventListener("click", function (e) {
  const isTipsContent = e.target.closest(".tip");
  console.log(isTipsContent, shouldAddListener);
  if (isTipsContent && shouldAddListener) {
    document.addEventListener("click", validateTips);
  }
});

// false -> add, true --- true -> remove, false

customTipInput.addEventListener("focus", function () {
  const selectedTip = getSelectedTip();
  if (selectedTip?.checked) {
    selectedTip.checked = false;
  }
});

tipsOptions.addEventListener("click", function () {
  tipsOptions.style.border = "none";
  tipsOptions.nextElementSibling?.remove();
  customTipInput.value = "";
});

calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedTip = getSelectedTip();
  let tipAmount, totalValue;
  if (selectedTip) {
    tipAmount =
      (billValueInput.valueAsNumber * selectedTip.value) /
      peopleAmountInput.valueAsNumber;
  } else {
    tipAmount =
      ((customTipInput.valueAsNumber / 100) * billValueInput.valueAsNumber) /
      peopleAmountInput.valueAsNumber;
  }
  totalValue =
    billValueInput.valueAsNumber / peopleAmountInput.valueAsNumber + tipAmount;

  outputTipValue.textContent = `$ ${tipAmount}`;
  outputValueTotal.textContent = `$ ${totalValue}`;
});

resetBtn.addEventListener("click", function () {});
