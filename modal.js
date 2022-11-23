function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements select HTML element
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const closeBtnbottom = document.querySelectorAll(".btnConfirmationContainer");
const formData = document.querySelectorAll(".formData");
const ErrorFirst = document.querySelector(".ErrorFirst");
const ErrorLast = document.querySelector(".ErrorLast");
const ErrorEmail = document.querySelector(".ErrorEmail");
const ErrorQuantity = document.querySelector(".ErrorQuantity");
const ErrorCheckbox = document.querySelector(".ErrorCheckbox");
const ErrorCheckbox1 = document.querySelector(".Errorcheckbox1");
const ErrorBirthdate = document.querySelector(".ErrorBirthdate");
const inputfield = document.querySelector(".text-control");
const modalBody = document.querySelector(".modal-body");
const ConfirmationContainer = document.querySelector(".ConfirmationContainer");

const form = document.querySelector("form"); // select form

const readyToSent = [{}];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
closeBtnbottom.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "";
}

const regExpName = new RegExp(
  "^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$", // regExp check the value from field
  "i"
);
const regExpEmail = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
  "g"
);
const regExpQuantity = new RegExp("^[0-9]");
const regExpBirthdate = new RegExp(
  "^d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"
);
const inputName = [
  {
    el: form.first,
    name: "Prénom",
    errorMessage:
      "Le prénom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)",
    regExp: regExpName,
    listenerMethod: "change",
  },
  {
    el: form.last,
    errorMessage:
      "Le nom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)",
    regExp: regExpName,
    listenerMethod: "change",
  },
  {
    el: form.email,
    errorMessage: "Veuillez entrer une adresse électronique valide.",
    regExp: regExpEmail,

    listenerMethod: "change",
  },
  {
    el: form.quantity,
    errorMessage: "Veuillez entrer un nombre.",
    regExp: regExpQuantity,
    listenerMethod: "change",
  },
  {
    el: form.birthdate,
    errorMessage: "Vous devez entrer votre date de naissance.",
    regExp: regExpQuantity,
    listenerMethod: "change",
  },
  {
    el: form.checkbox1,
    errorMessage:
      "Vous devez vérifier que vous acceptez les termes et conditions.",
    checkBoxController: true,
    listenerMethod: "change",
    valid: true,
  },
  {
    el: form.checkbox2,
    checkBoxController: false,
    listenerMethod: "change",
  },
]; // get every field on the form

// ************************************************************************ First form's field 'Prénom'

const handleInput = (obj) => {
  obj.el.addEventListener(obj.listenerMethod, function () {
    const errorMessage = obj.el.parentNode.querySelector(".errorMessage");
    if (obj.regExp) {
      const testFirst = obj.regExp.test(obj.el.value);
      obj.valid = testFirst === true;

      if (obj.valid === true) {
        obj.el.classList.remove("errorMessageName"); // setAttribute use to add a css rule // removeAttribute remove the css rule when it is there
        errorMessage.innerText = ""; // remove text when it is there
        return true; // and return true because the regExp pass
      } else {
        // When the value doesn't pass the regexp
        errorMessage.innerText = obj.errorMessage; // innerText use to add text in HTML

        obj.el.classList.add("errorMessageName"); // setAttribute use to add a css rule
        return false; // the function return false because the regExp doesn't pass
      }
    } else if (obj.checkBoxController === true) {
      if (obj.el.checked) {
        obj.valid = true;

        errorMessage.innerText = "";
      } else {
        obj.valid = false;
        errorMessage.innerText = obj.errorMessage;
      }
    }
  });
};

inputName.forEach(handleInput);

const handleSubmit = (obj) => {
  const errorMessage = obj.el.parentNode.querySelector(".errorMessage");

  if (obj.valid === true) {
    errorMessage.innerText = "";
  } else {
    errorMessage.innerText = obj.errorMessage;
  }
};

form.addEventListener("submit", function (e) {
  // launch the function when the user click on the submit button
  e.preventDefault();
  inputName.forEach(handleSubmit);
  checkRadioValue(form.location);
  // création de l'object final ?
});

const launchModalConfirmation = () => {
  // function for disable the form and replace it to the confirmation message
  modalBody.style.display = "none";
  ConfirmationContainer.style.display = "block";
};

const checkRadioValue = (radioArray) => {
  const errorRadioMessage = document.querySelector(".ErrorCheckbox");

  if (radioArray.value.length > 1) {
    errorRadioMessage.innerText = "";

    return radioArray.value;
  } else {
    errorRadioMessage.innerText = "Vous devez choisir une option.";
    return false;
  }
};

/*

const checkRadioValue = () => {
  const getSelectedValue = document.querySelector(
    'input[name="location"]:checked' // select every name of 'location' to found each radio button selected
  );
  if (getSelectedValue != null) {
    ErrorCheckbox.innerText = "";
    return true;
  } else {
    ErrorCheckbox.innerText = "Vous devez choisir une option.";
    return false;
  }
};

const checkRadio = () => {
  const getSelectedValue = document.querySelector(
    'input[name="location"]:checked'
  );
  if (getSelectedValue != null) {
    return getSelectedValue.value; // return the value of selected radio button
  }
};


  validecheckbox1();
  valideBirthdate();
  valideFirstOnSubmit();
  valideLastOnSubmit();
  valideEmailOnSubmit();
  valideQuantityOnSubmit();
  checkRadioValue();

  if (
    valideFirst(inputFirst) && // last control, for test if every function return 'true'
    valideFirstOnSubmit() &&
    valideLast(inputLast) &&
    valideLastOnSubmit() &&
    valideEmail(inputEmail) &&
    valideEmailOnSubmit() &&
    valideBirthdate(inputBirthdate) &&
    valideQuantity(inputQuantity) &&
    valideQuantityOnSubmit() &&
    validecheckbox1() &&
    checkRadioValue()
  ) {
    const readyToSend = {
      // create an object with each field of form
      firstName: inputFirst.value,
      lastName: inputLast.value,
      email: inputEmail.value,
      birthDate: inputBirthdate.value,
      quantityTournament: inputQuantity.value,
      conditionChecked: inputCheckbox1.checked,
      eventChecked: inputCheckbox2.checked,
      location: checkRadio(),
    };
    console.log(readyToSend);
    launchModalConfirmation(); // launch the function for change the form to confirmation message
  } else {
    console.log("nok");
  }
});
  */

// test

/*
inputFirst.addEventListener("change", function () {
  // addEventListener call a function when the user modifies the element's value
  handleInput(this);
});
const valideQuantityOnSubmit = function () {
  if (inputQuantity.value) {
    ErrorQuantity.innerText = "";
    document
      .querySelector("#quantity")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  } else {
    ErrorQuantity.innerText = "Veuillez entrer un nombre.";
    document
      .querySelector("#quantity")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  }
};


const valideFirst = function (inputFirst) {
  // the function called by addEventListener

  const testFirst = firstRegExp.test(inputFirst.value); // test the value with regexp
  if (testFirst == false) {
    // When the value doesn't pass the regexp
    ErrorFirst.innerText = // innerText use to add text in HTML
      "Le prénom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)";
    document
      .querySelector("#first")
      .setAttribute("style", "border:2px solid #ff4e5f;"); // setAttribute use to add a css rule
    return false; // the function return false because the regExp doesn't pass
  } else {
    document
      .querySelector("#first")
      .removeAttribute("style", "border:2px solid #ff4e5f;"); // removeAttribute remove the css rule when it is there
    ErrorFirst.innerText = ""; // remove text when it is there
    return true; // and return true because the regExp pass
  }
};
const valideFirstOnSubmit = function () {
  // That function is call only when the user click on the submit button
  if (inputFirst.value.length < 1) {
    // Second check to control if the value isn't empty
    ErrorFirst.innerText =
      "Le prénom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)";

    return false;
  } else {
    ErrorFirst.innerText = "";
    return true;
  }
};
// ************************************************************************ Second form's field 'Nom'

inputLast.addEventListener("change", function () {
  valideLast(this);
});

const valideLast = function (inputLast) {
  const testLast = firstRegExp.test(inputLast.value);
  if (testLast == false) {
    ErrorLast.innerText =
      "Le nom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)";
    document
      .querySelector("#last")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  } else {
    ErrorLast.innerText = "";
    document
      .querySelector("#last")
      .removeAttribute("style", "border:2px solid #ff4e5f;");
    return true;
  }
};

const valideLastOnSubmit = function () {
  if (inputLast.value.length < 1) {
    ErrorLast.innerText =
      "Le nom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)";
    document
      .querySelector("#last")
      .setAttribute("style", "border:2px solid #ff4e5f;");
    return false;
  } else {
    ErrorLast.innerText = "";
    document
      .querySelector("#last")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  }
};

// ************************************************************************ Third form's field 'Email'

inputEmail.addEventListener("change", function () {
  valideEmail(this);
});

const valideEmail = function (inputEmail) {
  const EmailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const testEmail = EmailRegExp.test(inputEmail.value);
  if (testEmail == false) {
    ErrorEmail.innerText =
      "Veuillez entrer une adresse électronique est valide.";
    document
      .querySelector("#email")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  } else {
    ErrorEmail.innerText = "";
    document
      .querySelector("#email")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  }
};
inputBirthdate.addEventListener("change", function () {
  valideBirthdate(this);
});

const valideEmailOnSubmit = function () {
  if (inputEmail.value.length < 1) {
    ErrorEmail.innerText =
      "Veuillez entrer une adresse électronique est valide.";
    document
      .querySelector("#email")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  } else {
    ErrorEmail.innerText = "";
    document
      .querySelector("#email")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  }
};

inputQuantity.addEventListener("change", function () {
  valideQuantity(this);
});
const valideQuantity = function (inputQuantity) {
  const QuantityRegExp = new RegExp("^[0-9]");
  const testQuantity = QuantityRegExp.test(inputQuantity.value);
  if (testQuantity == false) {
    ErrorQuantity.innerText = "Veuillez entrer un nombre.";
    document
      .querySelector("#quantity")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  } else {
    ErrorQuantity.innerText = "";
    document
      .querySelector("#quantity")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  }
};

const valideBirthdate = function () {
  if (inputBirthdate.value) {
    ErrorBirthdate.innerText = "";
    document
      .querySelector("#birthdate")
      .removeAttribute("style", "border:2px solid #ff4e5f;");

    return true;
  } else {
    ErrorBirthdate.innerText = "Vous devez entrer votre date de naissance.";
    document
      .querySelector("#birthdate")
      .setAttribute("style", "border:2px solid #ff4e5f;");

    return false;
  }
};
const validecheckbox1 = function () {
  if (inputCheckbox1.checked) {
    // .checked for verify if the case is check
    ErrorCheckbox1.innerText = "";

    return true;
  } else {
    ErrorCheckbox1.innerText =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    return false;
  }
};

*/
// ************************************************************************ Fourth form's field 'Date de naissance'
