let resultButtonClicked = false;
let result = null;
let buttons = document.getElementsByTagName("button");
const resultField = document.getElementById("resultField");
let arrSymbols = [];

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    let lastSymbol = arrSymbols[arrSymbols.length - 1];
    let newSymbol = button.dataset.intern;
    let pattern = /[0-9\.]/; // Only numbers and dots

    switch (newSymbol) {
      case "=":
        calcResult();
        break;
      case "exponentiate":
        exponentiate(pattern);
        break;
      case "square-root":
        squareRoot(pattern);
        break;
      case 'change-of-sign':
        changeOfSign(pattern);
        break;
      case "delete":
        clearDisplay();
        break;
      case "backspace":
        deleteLastChar();
        break;
      case "save":
        saveResult();
        break;
      case "paste":
        paste();
        break;
      case 'console':
        console.log(arrSymbols);
        break;
      default:
        addToString(newSymbol, lastSymbol, pattern);
    }
  });
});

function calcResult() {
  try {
    result = eval(arrSymbols.join(""));
    display(result);
    arrSymbols = [String(result)];
  } catch (err) {
    resultField.innerHTML =
      '<span style="color: red; font-weight: bold;">Überprüfen Sie Ihre Eingabe!</span>';
    console.log(err);
    arrSymbols = [];
  } finally {
    //resultButtonClicked = true;
  }
}

function addToString(newSymbol, lastSymbol, pattern) {
  if (lastSymbol === undefined) {
    arrSymbols.push(newSymbol);
  } else {
    if (pattern.test(lastSymbol) && pattern.test(newSymbol)) {
      arrSymbols[arrSymbols.length - 1] += newSymbol;
    } else {
      arrSymbols.push(newSymbol);
    }
  }
  display(arrSymbols.join(""));
  console.log(arrSymbols);
}

function clearDisplay() {
  arrSymbols = [];
  resultField.innerHTML = "";
}

function deleteLastChar() {
  let lastSymbol = arrSymbols.pop();
  console.log(`last symbol: ${lastSymbol}`);
  if (lastSymbol !== undefined) {
    lastSymbol = lastSymbol.slice(0, -1);
    console.log(`last char: ${lastSymbol}`);
    if (lastSymbol !== "") {
      arrSymbols.push(lastSymbol);
    }
  }
  console.log(`symbols: ${arrSymbols}`);
  display(arrSymbols.join(""));
}

function exponentiate(pattern) {
  let lastSymbol = arrSymbols.pop();
  if (pattern.test(lastSymbol)) {
    arrSymbols.push(String(Math.pow(lastSymbol, 2)));
    display(arrSymbols.join(""));
  }
}

function squareRoot(pattern) {
  let lastSymbol = arrSymbols.pop();
  if (pattern.test(lastSymbol)) {
    arrSymbols.push(String(Math.sqrt(lastSymbol)));
    display(arrSymbols.join(""));
  }
}

function changeOfSign(pattern){
  let lastSymbol = arrSymbols.pop();
  if (pattern.test(lastSymbol)) {
    arrSymbols.push(String(lastSymbol *= -1));
    display(arrSymbols.join(""));
  }
}

function display(symbols) {
  resultField.innerHTML = symbols;
}
