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
const outputValueTotal = document.querySelector(".output-value-total");
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

tipsOptions.addEventListener("focusout", function (e) {
  const isTipsContent = e.target.closest(".tip");
  console.log(e.target.closest(".tip"));
  const selectedTip = getSelectedTip();
  if (!customTipInput.valueAsNumber && !selectedTip && !isTipsContent) {
    const errorMessage = createInputError("tips-error-message");
    tipsFieldset.appendChild(errorMessage);
    tipsOptions.style.border = "1px solid red";
  }
  // console.log(document.querySelector(".tip > .radio-input:checked"));
});

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
  if (selectedTip) {
    outputTipValue.textContent =
      (billValueInput.valueAsNumber * selectedTip.value) /
      peopleAmountInput.valueAsNumber;
  } else {
    outputTipValue.textContent =
      ((customTipInput.valueAsNumber / 100) * billValueInput.valueAsNumber) /
      peopleAmountInput.valueAsNumber;
  }
  outputValueTotal.textContent =
    billValueInput.valueAsNumber / peopleAmountInput.valueAsNumber +
    Number(outputTipValue.textContent);
});

resetBtn.addEventListener("click", function (e) {
  outputValueTotal.textContent = "$0.00";
  outputTipValue.textContent = "$0.00";
});
