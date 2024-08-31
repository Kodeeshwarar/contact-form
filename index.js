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
  let isValid = true;
  elementsList.map((ele) => {

    if (ele.type === "radio" || ele.type === "checkbox") {
      const groupElements = document.getElementsByName(ele.name);
      const checked = Array.from(groupElements).some(
        (inputs) => inputs.checked
      );
        groupElements.forEach((input) =>input.closest(".form__radio-groups, .form__checkbox-group").classList[checked ? "remove":"add"]("validation-error")
        );
        isValid = isValid && checked;
            }

    if (ele.type === "text" || ele.tagName === "TEXTAREA") {
      const isEmpty = ele.value.trim() === ""
       ele.parentElement.classList[isEmpty ? "add":"remove"]("validation-error"); 
        isValid = isValid && isEmpty ;
    }
    if (ele.type === "email") {
      const errorInfo = ele.parentElement.querySelector(".error-info");
      const emailValue = ele.value.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    
      if (!emailValue) {
        errorInfo.textContent = "This field is required";
      } else if (!isValidEmail) {
        errorInfo.textContent = "Please enter a valid email address";
      }
    
      ele.parentElement.classList.toggle("validation-error", !emailValue || !isValidEmail);
      isValid = isValid && emailValue && isValidEmail;
    }    
  });
  return isValid; 

}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const hasTrue = validateInput(elementsList);
  toggleSuccessMessage(hasTrue);

});

function toggleSuccessMessage(show) {
  if (show) {
    successMsg.classList.remove("hide");
    successMsg.classList.add("show");
  } else {
    successMsg.classList.add("hide");
    successMsg.classList.remove("show");
  }
}