const successMsg = document.querySelector(".success-toast");

function getElments(elements) {
  return Array.from(document.querySelectorAll(`.${elements}`));
}
const elementsList = [
  ...getElments("form__input"),
  ...getElments("form-radio"),
  ...getElments("form__checkbox"),
];
function validateInput(elementsList) {
  let inputsValid  = true;
  elementsList.map((ele) => {

    if (ele.type === "radio" || ele.type === "checkbox") {
      const groupElements = document.getElementsByName(ele.name);
      const checked = Array.from(groupElements).some(
        (inputs) => inputs.checked
      );
        groupElements.forEach((input) =>input.closest(".form__radio-groups, .form__checkbox-group").classList[checked ? "remove":"add"]("validation-error")
        );
        inputsValid  = inputsValid  && checked;
            }

    if (ele.type === "text" || ele.tagName === "TEXTAREA") {
      const isEmpty = ele.value.trim() === ""
       ele.parentElement.classList[isEmpty ? "add":"remove"]("validation-error"); 
        inputsValid  = inputsValid  && !isEmpty ;
    }
    if (ele.type === "email") {
      const errorInfo = ele.parentElement.querySelector(".error-info");
      const emailValue = ele.value.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    
      if (!emailValue) {
        errorInfo.textContent = "This field is required";
        errorInfo.id="emailAddress-error"
      } else if (!isValidEmail) {
        errorInfo.textContent = "Please enter a valid email address";
        errorInfo.id="emailValidationError"
      }
    
      ele.parentElement.classList.toggle("validation-error", !emailValue || !isValidEmail);
      inputsValid = inputsValid && emailValue && isValidEmail;
    }    
  });
  return inputsValid; 

}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  toggleSuccessMessage(validateInput(elementsList));

});
function toggleSuccessMessage(show) {
  if (!show) {
    console.error('successMsg element is not defined');
    return;
  }
  successMsg.classList.toggle('show', show);
  successMsg.classList.toggle('hide', !show);
}