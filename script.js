// get all input elements
const inputElements = Array.prototype.slice.call(
  document.getElementsByClassName("form-input")
);

// library of all plphabetic characters
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

// library of all numerals
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// library of all available characters
const availableChars = dictionary.concat(numbers);

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
  } else if (
    element.getAttribute("type") === "text" &&
    element.getAttribute("id") === "uname"
  ) {
    element.addEventListener("blur", usernameValidator);
  } else {
    element.addEventListener("input", textValidator);
  }
});

// function to get the active element
function getActiveElement(event) {
  return event.target;
}

// function to get data of element
function getData(element) {
  return element.value;
}

// function to split the string data into an array
function getArray(data) {
  return data.split("");
}

// function to get error message text
function getErrMsg(event, position) {
  return getActiveElement(event).parentElement.childNodes[position];
}

// function to display or hide error message
function toggleErrMsg(errorStatus, errMsg) {
  if (errorStatus) {
    errMsg.style.display = "block";
  } else {
    errMsg.style.display = "none";
  }
}

// function to validate text inputs
function textValidator(event) {
  const dataArray = getArray(getData(getActiveElement(event)));
  const errMsg = getErrMsg(event, 2);
  let errorStatus;
  dataArray.forEach((item) => {
    if (!dictionary.includes(item.toLowerCase())) {
      // prevent reassigning of variable value
      if (!errorStatus) {
        errorStatus = true;
      }
    }
  });

  // toggle visibility of error message
  toggleErrMsg(errorStatus, errMsg);
}

// function to validate emails
function emailValidator(event) {
  const dataArray = getArray(getData(getActiveElement(event)));
  const errMsg = getErrMsg(event, 2);
  let errorStatus;
  let arrayLastPosition = dataArray.length - 1;

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

  // toggle visibility of error message
  toggleErrMsg(errorStatus, errMsg);
}

// function to validate passwords
function passwordValidator(event) {
  const dataArray = getArray(getData(getActiveElement(event)));
  const errMsg = getErrMsg(event, 3);
  let errorStatus = true;
  const charError = errMsg.childNodes[1];
  const lenError = errMsg.childNodes[3];
  let charStatus = true;
  let lenStatus = true;

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
  toggleErrMsg(lenStatus, lenError);

  // handle display of individual characters error
  toggleErrMsg(charStatus, charError);

  // toggle visibility of error message
  toggleErrMsg(errorStatus, errMsg);
}

// function to validate 'confirm pasword' field
function confirmPasswordValidator(event) {
  const dataArray = getArray(getData(getActiveElement(event)));
  const errMsg = getErrMsg(event, 2);
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

  // toggle display of error message
  toggleErrMsg(errorStatus, errMsg);
}

//function to handle username validation
function usernameValidator(event) {
  const dataArray = getArray(getData(getActiveElement(event)));
  const errMsg = getErrMsg(event, 2);
  let errorStatus;

  if (dataArray.length < 1) {
    errorStatus = true;
  }

  // toggle visibility of error message
  toggleErrMsg(errorStatus, errMsg);
}
