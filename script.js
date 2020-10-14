class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.readyToReset = false;
  }

  change() {
    this.currentOperand = this.currentOperand - 2 * this.currentOperand;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "" && this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    let prev = +this.previousOperand;
    let current = +this.currentOperand;
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        let comp1 = prev + current;
        if (Number.isInteger(prev) || Number.isInteger(current)) {
          computation = comp1;
        } else {
          computation = comp1.toPrecision(1);
        }
        break;
      case "-":
        let comp2 = prev - current;
        if (Number.isInteger(prev) || Number.isInteger(current)) {
          computation = comp2;
        } else {
          computation = comp2.toPrecision(1);
        }
        break;
      case "*":
        let compp3 = prev * current;
        if (Number.isInteger(prev) || Number.isInteger(current)) {
          computation = compp3;
        } else {
          computation = compp3.toPrecision(1);
        }
        break;
      case "÷":
        let comp4 = prev / current;
        computation = comp4.toPrecision(1);
        break;
      case "^":
        let comp5 = prev ** current;
        computation = comp5;
        break;
      case "sqrt()":
        prev = false;
        let comp6 = Math.sqrt(current);
        if (current >= 0) {
          computation = comp6;
        } else {
          alert("math error!");
        }
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const changeButton = document.querySelector("[data-chenge]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset
    ) {
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

changeButton.addEventListener("click", (button) => {
  calculator.change();
  calculator.updateDisplay();
});
