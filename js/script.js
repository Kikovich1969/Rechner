let resultButtonClicked = false;
let result = null;
let buttons = document.getElementsByTagName("button");
const resultField = document.getElementById("resultField");
let arrSymbols = [];
let mathString = ""; // String for calculation
//let mathStringView = ""; // String for presentation

/* 
  let a = ['3','+','3','/','2'];
  eval(a.join(''));
 */

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    let lastSymbol = arrSymbols[arrSymbols.length - 1];
    let newSymbol = button.dataset.intern;
    let pattern = /[0-9\.]/;

    console.log(`last symbol: ${lastSymbol}`);
    console.log(`new symbol: ${newSymbol}`);

    console.log(pattern.test(lastSymbol));
    console.log(pattern.test(newSymbol));
    console.log(`Array before: ${arrSymbols.length}`);
    
    if (arrSymbols.length === 0) {
      arrSymbols.push(newSymbol);
      console.log('Im here');
      console.log(`Array after: ${arrSymbols.length}`);
    } else {
      if (pattern.test(lastSymbol) && pattern.test(newSymbol)) {
        arrSymbols[arrSymbols.length - 1] += newSymbol;
      } else {
        arrSymbols.push(newSymbol);
      }
    }

    /* if (pattern.test(lastSymbol) && pattern.test(newSymbol)) {
      arrSymbols[arrSymbols.lastIndexOf(lastSymbol)] = lastSymbol + newSymbol;
    } else {
      arrSymbols.push(button.dataset.intern);
    } */
    console.log(arrSymbols);

    //arrSymbols.push(button.dataset.intern);
    if (button.dataset.intern === "=") {
      try {
        result = eval(mathString);
        resultField.innerHTML = result;
      } catch (err) {
        resultField.innerHTML =
          '<span style="color: red; font-weight: bold;">Überprüfen Sie Ihre Eingabe!</span>';
        console.log(err);
      }
      resultButtonClicked = true;
    } else if (button.dataset.intern === "delete") {
      resetMathString();
    } else if (button.dataset.intern === "backspace") {
      deleteLastChar();
    } else if (button.dataset.intern === "exponentiate") {
      //console.log(mathString.split(/[\-+*/()]/g).pop());
      let base = mathString.split(/[\-+*/()]/g).pop();
      mathString = mathString.replace(
        mathString.split(/[\-+*/()]/g).pop(),
        Math.pow(base, 2)
      );
      resultField.innerHTML = mathString;
    } else {
      if (resultButtonClicked) {
        resetMathString();
        resultButtonClicked = false;
      }
      mathString += button.dataset.intern;
      switch (button.dataset.intern) {
        case "/":
          resultField.innerHTML += ":";
          break;
        case ".":
          resultField.innerHTML += ",";
          break;
        case "*":
          resultField.innerHTML += "x";
          break;
        default:
          resultField.innerHTML += button.dataset.intern;
      }
    }
  });
});

function resetMathString() {
  mathString = "";
  //mathStringView = "";
  arrMathString = [];
  resultField.innerHTML = mathString;
}

function deleteLastChar() {
  resultField.innerText = resultField.innerText.slice(0, -1);
  mathString = mathString.slice(0, -1);
}
