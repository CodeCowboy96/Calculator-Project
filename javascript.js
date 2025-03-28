//Debug
    //1. If the user presses an operator button (+) then a different one (-) the program will use firstNum 
    //    as secondNum and calculate based on first operator input instead of just switching to last pressed operator
    //2. When a result is displayed with no decimals, pressing a decimal should clear the result and start a 
    //    new calculation instead of appending the digit to the existing result
//Additions to create

    //3. Add keyboard support


//Calculator Logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : "Not happening bro";

let firstNum = null;
let secondNum = null;
let currentOperator = null;
let shouldResetDisplay = false;
let justCalculated = false;
let operatorIsSet = false;

const display = document.getElementById('display');
    display.textContent = "0"
const buttons = document.querySelectorAll('button');


// Button click handler
buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.textContent;
  
      if (button.id === 'backspace') {
        deleteLastChar();
        return;
      }

      if (button.id === 'clear') {
        clearCalculator();
        return;
      }
  
      if (button.id === 'equals') {
        calculateResult();
        return;
      }

      if (button.id === 'decimal') {
        document.getElementById('decimal').disabled = true;
        operatorIsSet = false;
        handleDecimal();
        return;
      }

      if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
        if (currentOperator && firstNum !== null) { 
          calculateResult();
        } 
        setOperation(buttonValue);
        return;
      }

      if (button.classList.contains('numberButtons')) {
        if (justCalculated === true) {
          display.textContent = '0';
          justCalculated = false;
        }
        operatorIsSet = false;
        updateDisplay(buttonValue);
        return;  
      }

      updateDisplay(buttonValue);
    });
});


//Functions for button handler
function updateDisplay(value) {
    if (display.textContent === '0' || shouldResetDisplay) {
      display.textContent = value;
      shouldResetDisplay = false;
    }
    else {
      display.textContent += value;
    }
  };

  function setOperation(operator) { 
    firstNum = parseFloat(display.textContent);
    currentOperator = operator;
    shouldResetDisplay = true;
    document.getElementById('decimal').disabled = false;
    operatorIsSet = true;
  }

  function calculateResult() {
    if (currentOperator && firstNum !== null) {
      secondNum = parseFloat(display.textContent);
      const result = operate(currentOperator, firstNum, secondNum); 
      display.textContent = result;
      document.getElementById('decimal').disabled = false;
      firstNum = result; 
      secondNum = null;
      currentOperator = null;
      justCalculated = true;
    }    
  }

  function operate(operator, a, b) {
    switch(operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return b;  // Fallback to current display value
    };
  }

  function clearCalculator() {
    display.textContent = '0';
    firstNum = null;
    secondNum = null;
    currentOperator = null;
    document.getElementById('decimal').disabled = false;
  }

  function handleDecimal() {
    if (shouldResetDisplay || display.textContent === '0') {
      display.textContent = '0.';
      shouldResetDisplay = false;
    } else if (!display.textContent.includes('.')) {
      display.textContent += '.';
    }
    justCalculated = false;
  }

  function deleteLastChar() {  
    if (operatorIsSet) {
      return;
    }

    const currentDisplay = display.textContent;
    if (currentDisplay.length > 1) {
      display.textContent = currentDisplay.slice (0, -1);
    } else {
      display.textContent = '0';
    }

    if (!display.textContent.includes('.')) {
      document.getElementById('decimal').disabled = false;
    }
  }
