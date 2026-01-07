// -------------------------------------------
// Contact Form JS.
// Author: Johanna Hahlin
// Last updated: 2026-01-07
// Purpose: Handle contact form validation, real-time feedback, and user interaction.
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

  // Safety check to ensure the elements exist before adding event listeners.
  if (message && charCounter) {
    message.addEventListener("input", () => {
      const len = message.value.length;
      charCounter.textContent = `${len} / 20 characters`;
      charCounter.style.color = len === 20 ? "green" : "red";
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
    return msg.trim().length <= 20 && msg.trim().length > 0;
  }

  // -------------------------------
  // Show / clear error.
  // -------------------------------
  function showError(input, message) {
    // Highlight the input border in red to indicate an error.
    input.style.borderColor = "#dc3545";

    // Find the next sibling element and check if it's an error message.
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      // If not, create a new div and add the error-message class.
      error = document.createElement("div");
      error.classList.add("error-message");
      // Insert the error message directly after the input.
      input.after(error);
    }
    // Set the text of the error message.
    error.textContent = message;
  }

  // Clear the error message for a specific input field.
  function clearError(input) {
    // Highlight the input border in green to indicate valid input.
    input.style.borderColor = "green";

    // Find the next sibling element and check if it's an error message.
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      // Fade out the error message using CSS opacity.
      error.style.opacity = "0";

      // Remove the element from the DOM after the fade-out completes.
      setTimeout(() => {
        if (error.parentNode) error.remove();
      }, 500); // 500ms matches the CSS transition.
    }
  }

  // -------------------------------
  // Reusable form validation.
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
      showError(message, "Message must be 20 characters or less.");
      isValid = false;
    } else {
      clearError(message);
    }

    return isValid;
  }

  // -------------------------------
  // Clear form function.
  // -------------------------------

  function clearForm() {
    if (!form) return;

    // Select all text-based inputs and textarea for reset.
    const fields = form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], textarea");
    fields.forEach(field => {
      field.value = "";
      field.style.borderColor = "";
    });

    // Reset character counter.
    if (charCounter) {
      charCounter.textContent = "0 / 20 characters";
      charCounter.style.color = "";
    }

    // Reset subject dropdown.
    if (subject) {
      subject.selectedIndex = 0;
    }

    // Remove all error messages.
    const errors = form.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());
  }

  // -------------------------------
  // Blur event listeners (instant feedback).
  // -------------------------------
  if (fname) fname.addEventListener("blur", () => validateName(fname.value) ? clearError(fname) : showError(fname, "First name must contain only letters."));
  if (lname) lname.addEventListener("blur", () => validateName(lname.value) ? clearError(lname) : showError(lname, "Last name must contain only letters."));
  if (email) email.addEventListener("blur", () => validateEmail(email.value) ? clearError(email) : showError(email, "Please enter a valid email address."));
  if (phone) phone.addEventListener("blur", () => validatePhone(phone.value) ? clearError(phone) : showError(phone, "Phone number must be 7–15 digits."));
  if (message) message.addEventListener("blur", () => validateMessage(message.value) ? clearError(message) : showError(message, "Message must be 20 characters or less."));

  // -------------------------------
  // Submit handler.
  // -------------------------------
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (validateForm()) {
        // Show success message.
        successMessage.textContent = `Thank you ${fname.value}! I will get back to you soon.`;
        successMessage.style.opacity = "1";

        clearForm();

        // Fade out success message after 3 seconds.
        setTimeout(() => {
          successMessage.style.opacity = "0";
          setTimeout(() => { successMessage.textContent = ""; }, 500);
        }, 3000);
      }
    });
  }

  // -------------------------------
  // Reset button handler.
  // -------------------------------
  if (form) {
    form.addEventListener("reset", (event) => {
      event.preventDefault();

      clearForm();

    });
  }
}

// Ensure the DOM is fully loaded before initializing form.
document.addEventListener("DOMContentLoaded", initContactForm);