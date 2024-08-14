const display = document.getElementById("displayOutput");
const buttons = document.querySelectorAll(".buttons");

let currentValue = "0";
let storedValue = "";
let currentOperator = "";
let resetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function handleNumber(num) {
  if (resetDisplay) {
    currentValue = num;
    resetDisplay = false;
  } else {
    currentValue = currentValue === "0" ? num : currentValue + num;
  }
}

function handleDecimal() {
  if (resetDisplay) {
    currentValue = "0.";
    resetDisplay = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

function handleOperator(operator) {
  if (currentOperator !== "") {
    calculateResult();
  }
  storedValue = currentValue;
  currentOperator = operator;
  resetDisplay = true;
}

function calculateResult() {
  if (currentOperator === "" || storedValue === "") return;

  const prev = parseFloat(storedValue);
  const current = parseFloat(currentValue);
  let result;

  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
  }

  currentValue = result.toString();
  currentOperator = "";
  resetDisplay = true;
}

function clearCalculator() {
  currentValue = "0";
  storedValue = "";
  currentOperator = "";
  resetDisplay = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      handleNumber(value);
    } else if (button.classList.contains("decimal")) {
      handleDecimal();
    } else if (button.classList.contains("operator")) {
      if (value === "=") {
        calculateResult();
      } else {
        handleOperator(value);
      }
    } else if (button.classList.contains("clear")) {
      clearCalculator();
    }

    updateDisplay();
  });
});

// Keyboard event handling
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    handleOperator(key === "*" ? "x" : key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Escape") {
    clearCalculator();
  }

  updateDisplay();
});
