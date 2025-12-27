function initContactForm() {
  // Select form and all input fields from the DOM.
  const form = document.getElementById("contactForm");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // Select element that shows the character counter.
  const charCounter = document.getElementById("charCounter");

  // Add real-time character counter for message field.
  // Safety check ensures elements exist before using them.
  if (message && charCounter) {
    message.addEventListener("input", () => {
      const len = message.value.length;
      charCounter.textContent = `${len} / 20 characters`;
      charCounter.style.color = len >= 20 ? "green" : "red";
    });
  }

  // Check that name contains only letters.
  function validateName(name) {
    return /^[a-zA-Z]+$/.test(name.trim());
  }

  // Check if email format is valid.
  function validateEmail(emailValue) {
    return emailValue.includes("@") && emailValue.includes(".");
  }

  // Show error message below input field.
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

  // Clear error message when input is valid.
  function clearError(input) {
    input.style.borderColor = "green";

    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  }

  // Validate first name when user leaves the field.
  if (fname) {
    fname.addEventListener("blur", () => {
      if (!validateName(fname.value)) {
        showError(fname, "First name must contain only letters");
      } else {
        clearError(fname);
      }
    });
  }

  // Validate last name when user leaves the field.
  if (lname) {
    lname.addEventListener("blur", () => {
      if (!validateName(lname.value)) {
        showError(lname, "Last name must contain only letters");
      } else {
        clearError(lname);
      }
    });
  }

  // Validate email when user leaves the field.
  if (email) {
    email.addEventListener("blur", () => {
      if (!validateEmail(email.value)) {
        showError(email, "Please enter a valid email address");
      } else {
        clearError(email);
      }
    });
  }

  // Validate message when user leaves the textarea
  if (message) {
    message.addEventListener("blur", () => {
      if (message.value.trim().length < 20) {
        showError(message, "Message must be at least 20 characters long");
      } else {
        clearError(message);
      }
    });
  }

  // Log elements to confirm DOM selection works.
  console.log("Form and fields selected:", form, fname, lname, email, subject, message);
}