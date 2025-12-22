function initContactForm() {
  const form = document.getElementById("contactForm");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");

message.addEventListener("input", () => {
  const len = message.value.length;
  charCounter.textContent = `${len} / 20 characters`;
  charCounter.style.color = len >= 20 ? "green" : "red";
});

  console.log("Form and fields selected:", form, fname, lname, email, subject, message);
}