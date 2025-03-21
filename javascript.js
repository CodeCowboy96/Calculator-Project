//1.import logic for the 4 cardinal math expressions
//2.create UI through java/css
    //should include clear button
    //don't let decimals roll over the display

//Button Grid
createInitialGrid();
const resetButton = document.createElement("button") 
resetButton.textContent = "Reset";
resetButton.addEventListener("click", () => {
    let userInput = prompt("Enter the number of squares per side for the new grid (max 100):");
    
    let number = parseInt(userInput);

    if (isNaN(number) || number < 1 || number > 100) {
        alert("Please enter a valid number between 1 and 100.");
      } else {
        console.log(`Resetting grid with ${number} squares per side.`);

        resetGrid(number);
      }
  });