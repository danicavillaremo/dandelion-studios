document.addEventListener("DOMContentLoaded", function () {
  const scrollButtons = document.querySelectorAll("[data-scroll-to]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetSelector = btn.getAttribute("data-scroll-to");
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.classList.remove("text-success", "text-danger");
      }

      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      function validateRequired(input) {
        if (!input.value.trim()) {
          input.classList.add("is-invalid");
          isValid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      }

      validateRequired(nameInput);
      validateRequired(emailInput);
      validateRequired(messageInput);

      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailValue && !emailPattern.test(emailValue)) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.textContent = "Please fix the highlighted fields and try again.";
          formStatus.classList.add("text-danger");
        }
        return;
      }

      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach((el) =>
        el.classList.remove("is-invalid")
      );

      if (formStatus) {
        formStatus.textContent = "Thank you! Your message has been sent.";
        formStatus.classList.add("text-success");
      }
    });
  }

});
