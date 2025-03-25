//Bugs to fix:
    //1. needs to only evaluate a single pair of numbers at a time 
        //currently if you enter 12+6+8 the program returns 14 because it doesn't store 12 only the last 2 numbers
        //should solve for 12+6 then move on to the sum+8=26
    //2.When a result is displayed, entering a new number should start a new calculation
        //currently new numbers append to the end of displayed number. 
//Additions to create
    //1. Add a decimal button to allow for decimal operations
        //make sure only one decimal allowed at a time
    //2. Add a backspace button 
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

const display = document.getElementById('display');
    display.textContent = "0"
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
//Functions for button handler
function updateDisplay(value) {
    if (display.textContent === '0' || shouldResetDisplay) {
      display.textContent = value;
      shouldResetDisplay = false;
    } else {
      display.textContent += value;
    }
  };

  function setOperation(operator) {
    firstNum = parseFloat(display.textContent);
    currentOperator = operator;
    shouldResetDisplay = true;
  }

  function calculateResult() {
    if (currentOperator && firstNum !== null) {
      secondNum = parseFloat(display.textContent);
      display.textContent = operate(currentOperator, firstNum, secondNum);
      firstNum = null; 
    }
    function operate(operator, a, b) {
        switch(operator) {
          case '+': return add(a, b);
          case '-': return subtract(a, b);
          case '*': return multiply(a, b);
          case '/': return divide(a, b);
          default: return b;  // Fallback to current display value
        }
      }
  }

  

  function clearCalculator() {
    display.textContent = '0';
    firstNum = null;
    secondNum = null;
    currentOperator = null;
  }
