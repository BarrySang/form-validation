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
  } else if (
    element.getAttribute("type") === "password" &&
    element.getAttribute("id") === "password"
  ) {
    element.addEventListener("blur", passwordValidator);
  } else if (
    element.getAttribute("type") === "password" &&
    element.getAttribute("id") === "pass-confirm"
  ) {
    element.addEventListener("blur", confirmPasswordValidator);
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

// function to validate passwords
function passwordValidator(event) {
  const activeElement = event.target;
  const data = activeElement.value;
  const dataArray = data.split("");
  const errMsg = activeElement.parentElement.childNodes[3];
  const charError = errMsg.childNodes[1];
  const lenError = errMsg.childNodes[3];
  let errorStatus = true;
  let charStatus = true;
  let lenStatus = true;
  let availableChars = dictionary.concat(numbers);

  // check for special characters
  dataArray.forEach((char) => {
    if (!availableChars.includes(char.toLowerCase())) {
      charStatus = false;
    }
  });

  // check length of password
  if (dataArray.length >= 8) {
    lenStatus = false;
  }

  // check presence of an error in the password entered
  if (!charStatus && !lenStatus) {
    errorStatus = false;
  }

  // handle display of individual length error
  if (lenStatus) {
    lenError.style.display = "block";
  } else {
    lenError.style.display = "none";
  }

  // handle display of individual characters error
  if (charStatus) {
    charError.style.display = "block";
  } else {
    charError.style.display = "none";
  }

  // display or hide error message block
  if (errorStatus) {
    errMsg.style.display = "block";
  } else {
    errMsg.style.display = "none";
  }
}

// function to validate 'confirm pasword' field
function confirmPasswordValidator(event) {
  const activeElement = event.target;
  const data = activeElement.value;
  const dataArray = data.split("");
  const errMsg = activeElement.parentElement.childNodes[2];
  let errorStatus;

  const passwordData = inputElements[4].value;
  const passwordDataArray = passwordData.split("");

  if (dataArray.length !== passwordDataArray.length) {
    errorStatus = true;
  } else {
    for (let i = 0; i < passwordDataArray.length; i++) {
      if (passwordDataArray[i] !== dataArray[i]) {
        if (!errorStatus) {
          errorStatus = true;
        }
      }
    }
  }

  if (errorStatus) {
    errMsg.style.display = "block";
  } else {
    errMsg.style.display = "none";
  }
}
