let resultClicked = false;
let buttons = document.getElementsByTagName("button");
const resultField = document.getElementById("resultField");
let mathString = "";

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.char === "=") {
      try {
        mathString = eval(mathString);
        resultField.innerHTML = mathString;
      } catch (err) {
        resultField.innerHTML =
          '<span style="color: red; font-weight: bold;">Überprüfen Sie Ihre Eingabe!</span>';
        console.log(err);
      }
      resultClicked = true;
    } else if (button.dataset.char === "delete") {
      resetMathString();
    } else if (button.dataset.char === "backspace") {
      deleteLastChar();
    } else if (button.dataset.char === "exponentiate") {
      //console.log("Hallo ich bin hier");
      console.log(mathString.split(/[\-+*/()]/g).pop());
      let base = mathString.split(/[\-+*/()]/g).pop();
      mathString += base * base;
      resultField.innerHTML += base * base;
    } else {
      if (resultClicked) {
        resetMathString();
        resultClicked = false;
      }
      mathString += button.dataset.char;
      switch(button.dataset.char){
        case "/":
          resultField.innerHTML += ':';
          break;
        default:
          resultField.innerHTML += button.dataset.char;
      }
    }
  });
});

function resetMathString() {
  resultField.innerHTML = "";
  mathString = "";
}

function deleteLastChar() {
  resultField.innerHTML = resultField.innerHTML.slice(0, -1);
  mathString = mathString.slice(0, -1);
}
