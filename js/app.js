var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // optional, paginationni bosib slayderni o'zgartirish uchun
  },
  autoplay: {
    delay: 2000, // Har 3 soniyada slayd almashadi
    disableOnInteraction: false, // Foydalanuvchi bosganda autoplay to'xtamasin
  },
});

let headerResponsiveClose = document.querySelector(".header-responsive-close");
let headerResponsive = document.querySelector(".header-responsive");
let headerResponsiveNavLink = document.querySelectorAll(
  ".header-responsive .nav-link"
);
let headerHamburger = document.querySelector(".header-hamburger");

headerResponsiveClose.addEventListener("click", function () {
  headerResponsive.classList.toggle("active");
  document.body.classList.toggle("active");
});

headerHamburger.addEventListener("click", function () {
  headerResponsive.classList.toggle("active");
  document.body.classList.toggle("active");
});

headerResponsiveNavLink.forEach(function (item, index) {
  item.addEventListener("click", function () {
    headerResponsive.classList.toggle("active");
    document.body.classList.toggle("active");
  });
});

let formModal = document.querySelector(".formModal");
let formModalClose = document.querySelector(".formModalClose");
let formModamValid = document.querySelector(".formModamValid");
let formModamInvalid = document.querySelector(".formModamInvalid");
let formModalText = document.querySelector(".formModalText");
let bgCloseModal = document.querySelector(".bgCloseModal");
let btnImg = document.querySelectorAll(".develop-col-btn-img");

formModal.addEventListener("click", function () {
  bgCloseModal.style.display = "none";
  formModal.classList.remove("active");
});
bgCloseModal.addEventListener("click", function () {
  bgCloseModal.style.display = "none";
  formModal.classList.remove("active");
  arizaModal.classList.remove("active");
});

// Ariza modal logic
const arizaModal = document.querySelector(".arizaModal");
const arizaModalClose = document.querySelector(".arizaModalClose");
const arizaTriggers = document.querySelectorAll(".arizaTrigger");
const arizaForm = document.querySelector(".arizaForm");

function openArizaModal() {
  arizaModal.classList.add("active");
  bgCloseModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeArizaModal() {
  arizaModal.classList.remove("active");
  bgCloseModal.style.display = "none";
  document.body.style.overflow = "";
}

arizaTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openArizaModal();
  });
});

arizaModalClose.addEventListener("click", closeArizaModal);

arizaModal.addEventListener("click", (e) => {
  if (e.target === arizaModal) closeArizaModal();
});

// Telefon raqami uchun mask
const arizaPhone = document.getElementById("ariza-phone");
if (arizaPhone) {
  arizaPhone.addEventListener("input", (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.startsWith("998")) input = input.slice(3);
    let formatted = "+998 ";
    if (input.length > 0) formatted += input.substring(0, 2) + " ";
    if (input.length > 2) formatted += input.substring(2, 5) + " ";
    if (input.length > 5) formatted += input.substring(5, 7) + " ";
    if (input.length > 7) formatted += input.substring(7, 9);
    e.target.value = formatted.trim();
  });
}

function setArizaError(field, message) {
  const el = arizaForm.querySelector(`.arizaError[data-error="${field}"]`);
  if (el) el.textContent = message || "";
}

arizaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("ariza-name").value.trim();
  const phone = document.getElementById("ariza-phone").value.trim();
  const telegram = document.getElementById("ariza-telegram").value.trim();
  const business = document.getElementById("ariza-business").value.trim();
  const turnover = arizaForm.querySelector('input[name="Kompaniya yillik aylanmasi"]:checked');
  const payment = arizaForm.querySelector('input[name="Tolov narxi sizga maqulmi"]:checked');

  let valid = true;

  if (name.length < 2) {
    setArizaError("name", "Ismingizni to'liq kiriting");
    valid = false;
  } else {
    setArizaError("name", "");
  }

  if (!/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(phone)) {
    setArizaError("phone", "Telefon raqamini to'g'ri kiriting: +998 XX XXX XX XX");
    valid = false;
  } else {
    setArizaError("phone", "");
  }

  if (business.length < 2) {
    setArizaError("business", "Tadbirkorlik turini kiriting");
    valid = false;
  } else {
    setArizaError("business", "");
  }

  if (!turnover) {
    setArizaError("turnover", "Yillik aylanmani tanlang");
    valid = false;
  } else {
    setArizaError("turnover", "");
  }

  if (!payment) {
    setArizaError("payment", "Variantni tanlang");
    valid = false;
  } else {
    setArizaError("payment", "");
  }

  if (!valid) return;

  const submitBtn = arizaForm.querySelector(".arizaSubmit");
  submitBtn.disabled = true;

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const royxatVaqti =
    `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} - ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const params = new URLSearchParams();
  params.append("sheetName", "Lead");
  params.append("Ism", name);
  params.append("Telefon raqam", phone);
  params.append("Telegram username", telegram);
  params.append("Tadbirkorlik turi", business);
  params.append("Kompaniya yillik aylanmasi", turnover.value);
  params.append("Tolov narxi sizga maqulmi", payment.value);
  params.append("Royhatdan o'tgan vaqti", royxatVaqti);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzreP0_eE5xpuArPEzp5Q4mux1ukwjQCTxtqMh5Xgq5LGcDXnxlBrkSaGE4bsKnhIKN/exec";

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    keepalive: true,
  }).catch((err) => console.error("Yuborishda xatolik:", err));

  arizaForm.reset();
  window.location.href = "./thankYou.html";
});

// Formlar va validatsiya xabarlarini boshqaruvchi funksiyalar
function validateForm(formName, nameId, phoneId, nameErrorId, phoneErrorId) {
  const form = document.forms[formName];
  const nameInput = document.getElementById(nameId);
  const phoneInput = document.getElementById(phoneId);
  const nameError = document.getElementById(nameErrorId);
  const phoneError = document.getElementById(phoneErrorId);

  // Telefon raqam uchun mask
  phoneInput.addEventListener("input", (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.startsWith("998")) {
      input = input.slice(3);
    }
    let formatted = "+998 ";
    if (input.length > 0) formatted += input.substring(0, 2) + " ";
    if (input.length > 2) formatted += input.substring(2, 5) + " ";
    if (input.length > 5) formatted += input.substring(5, 7) + " ";
    if (input.length > 7) formatted += input.substring(7, 9);

    e.target.value = formatted.trim();
  });

  // Form validatsiyasi
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    // Ism validatsiyasi
    const nameValue = nameInput.value.trim();
    if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      nameError.textContent = "Ism faqat harflardan iborat bo'lishi kerak.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Telefon raqami validatsiyasi
    const phoneValue = phoneInput.value.trim();
    if (!/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(phoneValue)) {
      phoneError.textContent =
        "Telefon raqamini to'g'ri kiriting: +998 XX XXX XX XX";
      isValid = false;
    } else {
      phoneError.textContent = "";
    }

    // Agar validatsiya muvaffaqiyatli bo'lsa, formani yuborish
    if (isValid) {
      btnImg[0].classList.add("rotating");
      btnImg[1].classList.add("rotating");

      bgCloseModal.style.display = "flex";
      fetch(
        "https://script.google.com/macros/s/AKfycbzreP0_eE5xpuArPEzp5Q4mux1ukwjQCTxtqMh5Xgq5LGcDXnxlBrkSaGE4bsKnhIKN/exec",
        {
          method: "POST",
          body: new FormData(form),
        }
      )
        .then((response) => {
          formModal.classList.add("active");
          bgCloseModal.style.display = "flex";
          formModalText.textContent = "Thank you! Your data has been submitted";
          form.reset();
          btnImg[0].classList.remove("rotating");
          btnImg[1].classList.remove("rotating");
        })
        .catch((error) => {
          btnImg[0].classList.remove("rotating");
          btnImg[1].classList.remove("rotating");
          formModal.classList.add("active");
          formModamValid.style.display = "none";
          bgCloseModal.style.display = "flex";
          formModamInvalid.style.display = "block";
          formModalText.textContent =
            "An error occurred while submitting the data.";
        });
    }
  });
}

// Har bir form uchun validatsiyani ishga tushirish (faqat form mavjud bo'lsa)
if (document.forms["application-form-1"]) {
  validateForm("application-form-1", "name-1", "phone-1", "name-error1", "phone-error1");
}
if (document.forms["application-form-2"]) {
  validateForm("application-form-2", "name-2", "phone-2", "name-error", "phone-error");
}
