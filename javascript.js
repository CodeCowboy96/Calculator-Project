//1.import logic for the 4 cardinal math expressions
//Calculator Logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : "Error";


let firstNum = null;
let secondNum = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');


// Button click handler
buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.textContent;
      if (button.id === 'clear') {
        clearCalculator();
        return;
      }
  
      if (button.id === 'equals') {
        calculateResult();
        return;
      }

      if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
        setOperation(buttonValue);
        return;
      }
      updateDisplay(buttonValue);
    });
});

function updateDisplay(value) {
    if (display.textContent === '0' || shouldResetDisplay) {
      display.textContent = value;
      shouldResetDisplay = false;
    } else {
      display.textContent += value;
    }
  }
//2.create UI through java/css
    //should include clear button
    //don't let decimals roll over the display

//Button Grid
