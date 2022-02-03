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
    } else if (button.dataset.char === "C") {
      resultField.innerHTML = "";
    } else if (button.dataset.char === "") {
      resultField.innerHTML = resultField.innerHTML.slice(0, -1);
      mathString = mathString.slice(0, -1);
      console.log(mathString);
    } else if (button.dataset.char === "**") {
      console.log("Hallo ich bin hier");
    } else {
      if (resultClicked) {
        resultField.innerHTML = "";
        mathString = "";
        resultClicked = false;
      }
      mathString += button.dataset.char;
      resultField.innerHTML += button.innerText;
      console.log(mathString);
    }
  });
});