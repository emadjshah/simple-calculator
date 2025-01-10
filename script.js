document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const keys = document.querySelector(".keys");

  let currentInput = "0"; 
  let operator = null; 
  let previousInput = null; 
  let resetInput = false; 

  keys.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;

    if (!action) {
      if (currentInput === "0" || resetInput) {
        currentInput = keyContent;
        resetInput = false;
      } else {
        currentInput += keyContent;
      }
    } else if (action === "decimal") {

      if (!currentInput.includes(".")) {
        currentInput += ".";
      }
    } else if (["add", "subtract", "multiply", "divide"].includes(action)) {

      if (previousInput !== null && operator) {
        currentInput = calculate(previousInput, operator, currentInput);
      }
      operator = action;
      previousInput = currentInput;
      resetInput = true;
    } else if (action === "equals") {

      if (previousInput !== null && operator) {
        currentInput = calculate(previousInput, operator, currentInput);
        operator = null;
        previousInput = null;
        resetInput = true;
      }
    } else if (action === "clear") {

      currentInput = "0";
      previousInput = null;
      operator = null;
    } else if (action === "pi") {

      currentInput = Math.PI.toFixed(6);
    } else if (action === "sqrt") {

      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    } else if (action === "abs") {

      currentInput = Math.abs(parseFloat(currentInput)).toString();
    } else if (action === "exp") {

      currentInput = Math.exp(parseFloat(currentInput)).toString();
    }

    updateDisplay(currentInput);
  });

  function calculate(n1, operator, n2) {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    switch (operator) {
      case "add":
        return (n1 + n2).toString();
      case "subtract":
        return (n1 - n2).toString();
      case "multiply":
        return (n1 * n2).toString();
      case "divide":
        return (n2 !== 0 ? n1 / n2 : "Error").toString();
      default:
        return n2.toString();
    }
  }

  function updateDisplay(value) {
    display.textContent = value.length > 10 ? value.slice(0, 10) : value;
  }
});
