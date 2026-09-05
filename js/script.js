document.addEventListener("DOMContentLoaded", () => {

  // ================= MENU =================

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");

      const icon = menu.querySelector("i");

      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    });

    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }


  // ================= THEME =================

  const themeBtn = document.querySelector(".theme-btn");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  function updateThemeIcon() {

    if (!themeBtn) return;

    themeBtn.innerHTML = document.body.classList.contains("light")
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  }

  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {

      document.body.classList.toggle("light");

      localStorage.setItem(
        "portfolio-theme",
        document.body.classList.contains("light")
          ? "light"
          : "dark"
      );

      updateThemeIcon();
    });
  }


  // ================= TYPING EFFECT =================

  const typing = document.getElementById("typing");

  if (typing) {

    const words = [
      "Java Developer",
      "CSE Student",
      "Web Developer",
      "Problem Solver"
    ];

    let wi = 0;
    let ci = 0;
    let deleting = false;

    function type() {

      const word = words[wi];

      typing.textContent = word.slice(0, ci);

      if (!deleting && ci < word.length) {

        ci++;
        setTimeout(type, 90);

      } else if (!deleting) {

        deleting = true;
        setTimeout(type, 1300);

      } else if (ci > 0) {

        ci--;
        setTimeout(type, 45);

      } else {

        deleting = false;
        wi = (wi + 1) % words.length;

        setTimeout(type, 250);
      }
    }

    type();
  }


  // ================= REVEAL ANIMATION =================

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, {
    threshold: .12
  });

  document.querySelectorAll(".reveal").forEach(el =>
    observer.observe(el)
  );


  // ================= TOP BUTTON =================

  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {

    if (topBtn) {
      topBtn.classList.toggle(
        "show",
        window.scrollY > 450
      );
    }

  });

  if (topBtn) {

    topBtn.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });
  }


  // ================= PROJECT FILTER =================

  document.querySelectorAll(".filters .filter").forEach(btn => {

    btn.addEventListener("click", () => {

      document.querySelectorAll(".filters .filter")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      const filter = btn.dataset.filter;

      document.querySelectorAll(".project-card").forEach(card => {

        card.style.display =
          filter === "all" ||
          card.dataset.category.includes(filter)
            ? ""
            : "none";

      });

    });

  });


  // =====================================================
  // CONTACT FORM VALIDATION
  // =====================================================

  const form = document.getElementById("contactForm");

  if (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Error elements
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");

      // Clear old errors
      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";

      // Remove old error classes
      document.querySelectorAll(
        "#contactForm input, #contactForm textarea"
      ).forEach(field => {
        field.classList.remove("input-error");
      });

      let isValid = true;


      // ================= NAME =================

      const namePattern = /^[A-Za-z\s]+$/;

      if (name === "") {

        nameError.textContent = "Please enter your name.";
        document.getElementById("name")
          .classList.add("input-error");

        isValid = false;

      } else if (name.length < 3) {

        nameError.textContent =
          "Name must be at least 3 characters.";

        document.getElementById("name")
          .classList.add("input-error");

        isValid = false;

      } else if (!namePattern.test(name)) {

        nameError.textContent =
          "Name should contain only letters.";

        document.getElementById("name")
          .classList.add("input-error");

        isValid = false;
      }


      // ================= EMAIL =================

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (email === "") {

        emailError.textContent =
          "Please enter your email.";

        document.getElementById("email")
          .classList.add("input-error");

        isValid = false;

      } else if (!emailPattern.test(email)) {

        emailError.textContent =
          "Please enter a valid email address.";

        document.getElementById("email")
          .classList.add("input-error");

        isValid = false;
      }


      // ================= SUBJECT =================

      if (subject === "") {

        subjectError.textContent =
          "Please enter a subject.";

        document.getElementById("subject")
          .classList.add("input-error");

        isValid = false;

      } else if (subject.length < 3) {

        subjectError.textContent =
          "Subject must be at least 3 characters.";

        document.getElementById("subject")
          .classList.add("input-error");

        isValid = false;
      }


      // ================= MESSAGE =================

      if (message === "") {

        messageError.textContent =
          "Please enter your message.";

        document.getElementById("message")
          .classList.add("input-error");

        isValid = false;

      } else if (message.length < 10) {

        messageError.textContent =
          "Message must be at least 10 characters.";

        document.getElementById("message")
          .classList.add("input-error");

        isValid = false;
      }


      // ================= SUCCESS =================

      if (isValid) {

        showSuccessPopup();

        form.reset();

        document.querySelectorAll(
          "#contactForm input, #contactForm textarea"
        ).forEach(field => {
          field.classList.remove("input-error");
        });
      }

    });
  }


  // =====================================================
  // SUCCESS POPUP
  // =====================================================

  function showSuccessPopup() {

    const popup = document.createElement("div");

    popup.className = "success-popup";

    popup.innerHTML = `
      <div class="success-popup-box">

        <div class="success-icon">
          <i class="fa-solid fa-check"></i>
        </div>

        <h2>Message Sent!</h2>

        <p>
          Thank you for contacting me.
          I'll get back to you soon.
        </p>

        <button class="btn primary" id="closePopup">
          OK
        </button>

      </div>
    `;

    document.body.appendChild(popup);


    // Close button
    document.getElementById("closePopup")
      .addEventListener("click", () => {
        popup.remove();
      });


    // Close by clicking outside
    popup.addEventListener("click", event => {

      if (event.target === popup) {
        popup.remove();
      }

    });

  }


  // ================= DEMO PLACEHOLDER =================

  document.querySelectorAll(".demo-placeholder").forEach(link => {

    link.addEventListener("click", function(e) {

      e.preventDefault();

      const url = this.getAttribute("href");

      if (url && url !== "#") {

        window.open(url, "_blank");

      } else {

        alert("Please add the project Live Demo URL.");

      }

    });

  });

});