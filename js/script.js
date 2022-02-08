let resultClicked = false;
let buttons = document.getElementsByTagName("button");
const resultField = document.getElementById("resultField");
let mathStringIntern = ""; // String for calculation
//let mathStringView = ""; // Sting for presentation

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.intern === "=") {
      try {
        mathStringIntern = eval(mathStringIntern);
        resultField.innerHTML = mathStringIntern;
      } catch (err) {
        resultField.innerHTML =
          '<span style="color: red; font-weight: bold;">Überprüfen Sie Ihre Eingabe!</span>';
        console.log(err);
      }
      resultClicked = true;
    } else if (button.dataset.intern === "delete") {
      resetMathString();
    } else if (button.dataset.intern === "backspace") {
      deleteLastChar();
    } else if (button.dataset.intern === "exponentiate") {
      //console.log(mathStringIntern.split(/[\-+*/()]/g).pop());
      let base = mathStringIntern.split(/[\-+*/()]/g).pop();
      mathStringIntern = mathStringIntern.replace(
        mathStringIntern.split(/[\-+*/()]/g).pop(),
        Math.pow(base, 2)
      );
      resultField.innerHTML = mathStringIntern;
    } else {
      if (resultClicked) {
        resetMathString();
        resultClicked = false;
      }
      mathStringIntern += button.dataset.intern;
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
  mathStringIntern = "";
  //mathStringView = "";
  arrMathString = [];
  resultField.innerHTML = mathStringIntern;
}

function deleteLastChar() {
  resultField.innerText = resultField.innerText.slice(0, -1);
  mathStringIntern = mathStringIntern.slice(0, -1);
}
