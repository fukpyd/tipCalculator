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

const outputValueTotal = document.querySelector(".output-value-total");

const DEFAULT_AMOUNT = "$ 0.00";

const getSelectedTip = () => {
  return document.querySelector(".tip > .radio-input:checked");
};

const createInputError = function (customClass) {
  const inputError = document.createElement("span");
  inputError.textContent = "Can't be empty or zero!";
  inputError.classList.add("input-error-message", customClass);
  return inputError;
};

const fieldsCheck = function () {
  const selectedTip = getSelectedTip();
  inputsWithIcon.forEach((inputWithIcon, index) => {
    if (!inputWithIcon.valueAsNumber) {
      const errorMessage = createInputError();
      inputsWithIcon[index].nextElementSibling?.remove();
      inputWrapper[index].appendChild(errorMessage);
      inputsWithIcon[index].style.border = "1px solid red";
    }
  });
  if (!customTipInput.valueAsNumber && !selectedTip) {
    const errorMessage = createInputError("tips-error-message");
    tipsOptions.nextElementSibling?.remove();
    tipsFieldset.appendChild(errorMessage);
    tipsOptions.style.border = "1px solid red";
  }
};

inputsWithIcon.forEach((inputWithIcon, index) => {
  inputWithIcon.addEventListener("blur", function () {
    if (inputWithIcon.value < 1) {
      // powinien być warunek jeszcze że nie kliknęłm w clcBtn i resetBtn zeby nie dublować błędów
      inputWithIcon.value = "";
      const errorMessage = createInputError();
      inputWrapper[index].appendChild(errorMessage);
      inputsWithIcon[index].style.border = "1px solid red";
    }
  });
  inputWithIcon.addEventListener("focus", function () {
    inputWithIcon.style.border = "none";
    inputWithIcon.nextElementSibling?.remove();
  });
});

function validateTips(e) {
  const isTipsOptionsContent = e.target.closest(".tips-options");
  if (!isTipsOptionsContent) {
    const selectedTip = getSelectedTip();
    document.removeEventListener("click", validateTips);
    shouldAddListener = true;
    if (
      !customTipInput.valueAsNumber &&
      !selectedTip &&
      !e.nextElementSibling
    ) {
      const errorMessage = createInputError("tips-error-message");
      tipsFieldset.appendChild(errorMessage);
      tipsOptions.style.border = "1px solid red";
    }
  }
}

tipsOptions.addEventListener("click", function (e) {
  const isTipsContent = e.target.closest(".tip");
  const selectedTip = getSelectedTip();

  if (isTipsContent && shouldAddListener) {
    document.addEventListener("click", validateTips);
    shouldAddListener = false;
  }
  tipsOptions.style.border = "none";
  tipsOptions.nextElementSibling?.remove();
  if (selectedTip) customTipInput.value = "";
});

customTipInput.addEventListener("focus", function () {
  const selectedTip = getSelectedTip();
  if (selectedTip?.checked) {
    selectedTip.checked = false;
  }
});

calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fieldsCheck();
  const selectedTip = getSelectedTip();
  let tipAmount, totalValue;
  if (selectedTip) {
    tipAmount = (
      (billValueInput.valueAsNumber * selectedTip.value) /
      peopleAmountInput.valueAsNumber
    ).toFixed(2);
  } else {
    tipAmount = (
      ((customTipInput.valueAsNumber / 100) * billValueInput.valueAsNumber) /
      peopleAmountInput.valueAsNumber
    ).toFixed(2);
  }
  totalValue = (
    billValueInput.valueAsNumber / peopleAmountInput.valueAsNumber +
    Number(tipAmount)
  ).toFixed(2);

  outputTipValue.textContent = Number(tipAmount)
    ? `$ ${tipAmount}`
    : DEFAULT_AMOUNT;
  outputValueTotal.textContent = Number(totalValue)
    ? `$ ${totalValue}`
    : DEFAULT_AMOUNT;
});

resetBtn.addEventListener("click", function () {
  outputTipValue.textContent = "$ 0.00";
  outputValueTotal.textContent = "$ 0.00";
  tipsOptions.style.border = "none";
  tipsOptions.nextElementSibling?.remove();

  inputsWithIcon.forEach((inputWithIcon) => {
    inputWithIcon.nextElementSibling?.remove();
    inputWithIcon.style.border = "none";
  });
});
