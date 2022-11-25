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

const form = document.querySelector("form"); // Select the form

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

let readyToSent = []; // Create empty array for stock each fields of form

const regExpName = new RegExp( // Regexp for control the field of form
  "^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$",
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
  // Create an array of object for stock differents param of each field
  {
    el: form.first, //Select form field
    name: "Prénom",
    // select the right message
    errorMessage:
      "Le prénom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)",
    regExp: regExpName, // Use the regexp
    listenerMethod: "change",
  },
  {
    el: form.last,
    name: "Nom",
    errorMessage:
      "Le nom doit comporter au moins deux lettres (caractères spéciaux et chiffre non autorisé)",
    regExp: regExpName,
    listenerMethod: "change",
  },
  {
    el: form.email,
    name: "Email",
    errorMessage: "Veuillez entrer une adresse électronique valide.",
    regExp: regExpEmail,

    listenerMethod: "change",
  },
  {
    el: form.quantity,
    name: "quantity",
    errorMessage: "Veuillez entrer un nombre.",
    regExp: regExpQuantity,
    listenerMethod: "change",
  },
  {
    el: form.birthdate,
    name: "birthdate",
    errorMessage: "Vous devez entrer votre date de naissance.",
    regExp: regExpQuantity,
    listenerMethod: "change",
  },
  {
    el: form.checkbox1,
    name: "checkbox1",
    errorMessage:
      "Vous devez vérifier que vous acceptez les termes et conditions.",
    checkBoxController: true,
    listenerMethod: "change",
    valid: true,
  },
  {
    el: form.checkbox2,
    name: "checkbox2",
    checkBoxController: false,
    listenerMethod: "change",
    errorMessage: "",
  },
];
// ***************************************************************************************************************

const handleInput = (obj) => {
  // create one function for control each field of form (exept Radio button) on "Change" listenerMethod

  obj.el.addEventListener(obj.listenerMethod, function () {
    // Choice listener methode (change)
    const errorMessage = obj.el.parentNode.querySelector(".errorMessage"); // select the parent element for select each error message field
    if (obj.regExp) {
      // If there is a regexp field on "[inputName]" object
      const testFirst = obj.regExp.test(obj.el.value); // test with the right regexp
      obj.valid = testFirst === true; // if the regexp OK

      if (obj.valid === true) {
        // create a new field valid on "[inputName]" object if the regexp OK
        obj.el.classList.remove("errorMessageName"); // remove the errorMessage class if is it
        errorMessage.innerText = ""; // and remove the message
        return true;
      } else {
        // When the value doesn't pass the regexp
        errorMessage.innerText = obj.errorMessage; // Write error message in the error class

        obj.el.classList.add("errorMessageName"); // And add error class for create a red border
        return false;
      }
    } else if (obj.checkBoxController === true) {
      // if there isn't regexp field but checkBoxController field, check if is it checked and add error message add valid on object
      if (obj.el.checked) {
        // there is the control only in checkbox 1
        obj.valid = true;
        errorMessage.innerText = "";
      } else {
        obj.valid = false;
        errorMessage.innerText = obj.errorMessage;
      }
    } else {
      // there is the control for checkbox 2 but here, there isn't error message because this field isn't require
      if (obj.el.checked) {
        obj.valid = true;
      } else {
        obj.valid = false;
      }
    }
  });
};
inputName.forEach(handleInput); // Call handleInput for each object of [inputName] array
// ***************************************************************************************************************
const handleSubmit = (obj) => {
  // create one function for control each field of form  on "Submit" listenerMethod
  const errorMessage = obj.el.parentNode.querySelector(".errorMessage"); // select the parent element for select each error message field

  if (obj.valid === true) {
    // If there is a field valid = true, on [inputname] array
    errorMessage.innerText = ""; // supr the error message
    const newObj = { [obj.name]: obj.el.value }; // and create a new object with name and value of field
    readyToSent.push(newObj); // and send each object to [readyToSent] array
  } else {
    errorMessage.innerText = obj.errorMessage; // otherwise write the right error message
  }
};

const checkRadioValue = (radioArray) => {
  //this function controle just Radio button 'location'
  const errorRadioMessage = document.querySelector(".ErrorCheckbox");

  if (radioArray.value.length > 1) {
    // if one of radio button is selected return the value to Readytosent array
    errorRadioMessage.innerText = "";
    const newObj = { location: radioArray.value };
    readyToSent.push(newObj); // send to the array
    return radioArray.value;
  } else {
    errorRadioMessage.innerText = "Vous devez choisir une option.";
    return false;
  }
};

form.addEventListener("submit", function (e) {
  // On submit
  e.preventDefault(); // don't refresh the page
  inputName.forEach(handleSubmit); // And call the handleSubmit function for each element of inputname array
  checkRadioValue(form.location); // Call the function for control radio button 'location'
  if (readyToSent.length > 6) {
    // If the object contain 7 or more object, console log "readyToSent" array and valid the form (call modal confirmation)
    launchModalConfirmation();
    console.log(readyToSent);
  } else {
    readyToSent = []; // otherwise clean the array
  }
});
// ***************************************************************************************************************

const launchModalConfirmation = () => {
  // Show the modal confirmation
  modalBody.style.display = "none";
  ConfirmationContainer.style.display = "block";
};
