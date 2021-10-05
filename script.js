// get all input elements
const inputElements = Array.prototype.slice.call(
  document.getElementsByClassName("form-input")
);

const dictionary = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// listen for clicks on every input element
inputElements.forEach((element) => {
  if (element.getAttribute("type") === "email") {
    element.addEventListener("blur", emailValidator);
  } else {
    element.addEventListener("input", inputListener);
  }
});

// function to run on input
function inputListener(event) {
  const activeElement = event.target;
  const type = activeElement.getAttribute("type");
  const data = activeElement.value;
  switch (type) {
    case "text":
      textValidator(data, activeElement);
      break;
    case "password":
      passwordValidator();
      break;
  }
}

// function to validate text inputs
function textValidator(data, activeElement) {
  const dataArray = data.split("");
  const errMsg = activeElement.parentElement.childNodes[2];
  let errorStatus;
  dataArray.forEach((item) => {
    if (!dictionary.includes(item.toLowerCase())) {
      // prevent reassigning of variable value
      if (!errorStatus) {
        errorStatus = true;
      }
    }
  });

  // display or hide error message
  if (errorStatus) {
    errMsg.style.display = "block";
  } else {
    errMsg.style.display = "none";
  }
}

let emailCLickOnce = false;

// function to validate emails
function emailValidator(event) {
  emailCLickOnce = true;
  const activeElement = event.target;
  const data = activeElement.value;
  const dataArray = data.split("");
  const errMsg = activeElement.parentElement.childNodes[2];
  let errorStatus;
  let arrayLastPosition = dataArray.length - 1;
  console.log(arrayLastPosition);

  if (
    dataArray[arrayLastPosition] !== "m" ||
    dataArray[arrayLastPosition - 1] !== "o" ||
    dataArray[arrayLastPosition - 2] !== "c" ||
    dataArray[arrayLastPosition - 3] !== "." ||
    dataArray[arrayLastPosition - 4] === "@" ||
    !dataArray.includes("@")
  ) {
    errorStatus = true;
  }

  // display or hide error message
  if (errorStatus) {
    errMsg.style.display = "block";
  } else {
    errMsg.style.display = "none";
  }
}
