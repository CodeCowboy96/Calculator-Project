//Debug
    //1.After setOperation has been run firstNum is stored causing the backspace button to not function
    //  properly
    //  ie. 45 + (backspace) 3 shows 4 + 3 but returns 48
//Additions to create
    //2. Add a backspace button\
        //Add backspace button functionality\
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

      if (button.classList.contains('numberButtons') && justCalculated === true) {
        display.textContent = '0';
        justCalculated = false;
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

  function deleteLastChar() {     //take current display, turn into array, return array minus the last index
    const displayArray = Array.from(display.textContent);
    displayArray.pop();
    display.textContent = displayArray.join(""); //turn back into string
  }

