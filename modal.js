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

const inputFirst = form.first; // get every field on the form
const inputLast = form.last;
const inputEmail = form.email;
const inputQuantity = form.quantity;
const inputBirthdate = form.birthdate;
const inputCheckbox1 = form.checkbox1;
const inputCheckbox2 = form.checkbox2;

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

// ************************************************************************ First form's field 'Prénom'

const firstRegExp = new RegExp(
  "^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$", // regExp check the value from field
  "gi"
);

inputFirst.addEventListener("change", function () {
  // addEventListener call a function when the user modifies the element's value
  valideFirst(this);
});

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

// ************************************************************************ Fourth form's field 'Date de naissance'

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

// ************************************************************************ fifth form's field 'À combien de tournois GameOn avez-vous déjà participé ?'

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

// ************************************************************************  sixth form's field 'A quel tournoi souhaitez-vous participer cette année ?'

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
// ************************************************************************

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

// ************************************************************************
const launchModalConfirmation = () => {
  // function for disable the form and replace it to the confirmation message
  modalBody.style.display = "none";
  ConfirmationContainer.style.display = "block";
};

// ************************************************************************

form.addEventListener("submit", function (e) {
  // launch the function when the user click on the submit button
  e.preventDefault();
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
