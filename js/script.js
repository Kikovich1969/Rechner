let resultClicked = false;
let buttons = document.getElementsByTagName("button");
const resultField = document.getElementById("resultField");
let mathString = "";

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.intern === "=") {
      try {
        mathString = eval(mathString);
        resultField.innerHTML = mathString;
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
      //console.log(mathString.split(/[\-+*/()]/g).pop());
      let base = mathString.split(/[\-+*/()]/g).pop();
      mathString = mathString.replace(
        mathString.split(/[\-+*/()]/g).pop(),
        base * base
      );
      resultField.innerHTML = mathString;
    } else {
      if (resultClicked) {
        resetMathString();
        resultClicked = false;
      }
      mathString += button.dataset.intern;
      switch (button.dataset.intern) {
        case "/":
          resultField.innerHTML += ":";
          break;
        case ".":
          resultField.innerHTML += ",";
          break;
        default:
          resultField.innerHTML += button.dataset.intern;
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
