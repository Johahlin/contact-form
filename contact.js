// -------------------------------------------
// Contact Form JS
// Handles form validation, character counter, and submission
// -------------------------------------------

function initContactForm() {
  // -------------------------------
  // DOM elements
  // -------------------------------
  const form = document.getElementById("contactForm");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");
  const successMessage = document.getElementById("successMessage");

  // -------------------------------
  // Real-time character counter for message field.
  // -------------------------------
  // Safety check to ensure elements exist before using them.
  if (message && charCounter) {
    message.addEventListener("input", () => {
      const len = message.value.length;
      charCounter.textContent = `${len} / 20 characters`;
      charCounter.style.color = len >= 20 ? "green" : "red";
    });
  }

  // -------------------------------
  // Validation functions.
  // -------------------------------
  function validateName(name) {
    return /^[a-zA-Z]+$/.test(name.trim());
  }

  function validateEmail(emailValue) {
    return emailValue.includes("@") && emailValue.includes(".");
  }

  function validatePhone(phoneValue) {
    return phoneValue.trim() === "" || /^\d{7,15}$/.test(phoneValue.trim());
  }

  function validateMessage(msg) {
    return msg.trim().length >= 20;
  }

  // -------------------------------
  // Show / clear error
  // -------------------------------
  function showError(input, message) {
    input.style.borderColor = "#dc3545";

    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.classList.add("error-message");
      input.after(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    input.style.borderColor = "green";
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  }

  // -------------------------------
  // Reusable form validation
  // -------------------------------
  function validateForm() {
    let isValid = true;

    // Validate first name when user leaves the field.
    if (!validateName(fname.value)) {
      showError(fname, "First name must contain only letters.");
      isValid = false;
    } else {
      clearError(fname);
    }

    // Validate last name when user leaves the field.
    if (!validateName(lname.value)) {
      showError(lname, "Last name must contain only letters.");
      isValid = false;
    } else {
      clearError(lname);
    }

    // Validate email when user leaves the field.
    if (!validateEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(email);
    }

    // Validate phone number when user leaves the field.
    if (phone && !validatePhone(phone.value)) {
      showError(phone, "Phone number must be 7–15 digits.");
      isValid = false;
    } else if (phone) {
      clearError(phone);
    }

    // Validate message when user leaves the textarea.
    if (!validateMessage(message.value)) {
      showError(message, "Message must be at least 20 characters long.");
      isValid = false;
    } else {
      clearError(message);
    }

    return isValid;
  }
  // -------------------------------
  // Clear form function
  // -------------------------------
  function clearForm() {
    form.reset();
    if (charCounter) {
      charCounter.textContent = "0 / 20 characters";
      charCounter.style.color = "red";
    }
  }

  // -------------------------------
  // Blur event listeners (instant feedback)
  // -------------------------------
  if (fname) fname.addEventListener("blur", () => validateName(fname.value) ? clearError(fname) : showError(fname, "First name must contain only letters."));
  if (lname) lname.addEventListener("blur", () => validateName(lname.value) ? clearError(lname) : showError(lname, "Last name must contain only letters."));
  if (email) email.addEventListener("blur", () => validateEmail(email.value) ? clearError(email) : showError(email, "Please enter a valid email address."));
  if (phone) phone.addEventListener("blur", () => validatePhone(phone.value) ? clearError(phone) : showError(phone, "Phone number must be 7–15 digits."));
  if (message) message.addEventListener("blur", () => validateMessage(message.value) ? clearError(message) : showError(message, "Message must be at least 20 characters long."));

  // -------------------------------
  // Submit handler
  // -------------------------------
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (validateForm()) {
        successMessage.textContent = `Thank you ${fname.value}! I will get back to you soon.`;
        clearForm();

        setTimeout(() => {
          successMessage.textContent = "";
        }, 3000);
      }
    });
  }

  // -------------------------------
  // Debug log
  // -------------------------------
  console.log("Form initialized:", form, fname, lname, email, phone, subject, message);
}

// Ensure the DOM is fully loaded before initializing form
document.addEventListener("DOMContentLoaded", initContactForm);