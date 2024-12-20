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

let formModal = document.querySelector(".formModal")
let formModalClose = document.querySelector(".formModalClose")
let formModamValid = document.querySelector(".formModamValid")
let formModamInvalid = document.querySelector(".formModamInvalid")
let formModalText = document.querySelector(".formModalText")
let bgCloseModal = document.querySelector(".bgCloseModal")
let btnImg = document.querySelectorAll(".develop-col-btn-img")


formModal.addEventListener("click", function(){
    bgCloseModal.style.display = "none";
    formModal.classList.remove("active")
})
bgCloseModal.addEventListener("click", function(){
    bgCloseModal.style.display = "none";
    formModal.classList.remove("active")
})

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
            phoneError.textContent = "Telefon raqamini to'g'ri kiriting: +998 XX XXX XX XX";
            isValid = false;
        } else {
            phoneError.textContent = "";
        }

        // Agar validatsiya muvaffaqiyatli bo'lsa, formani yuborish
        if (isValid) {
            btnImg[0].classList.add("rotating")
            btnImg[1].classList.add("rotating")
            
            bgCloseModal.style.display = "flex";
            fetch("https://script.google.com/macros/s/AKfycbxQuN4-slVkRK_d0YRmzel38cb8JTGKnicSaf730B9N4r6iS0yO66sy8CpE0-iZgKzy/exec", {
                method: "POST",
                body: new FormData(form)
            })
            
                .then((response) => {
                    formModal.classList.add("active")
                    bgCloseModal.style.display = "flex";
                    formModalText.textContent = "Thank you! Your data has been submitted"
                    form.reset();
                    btnImg[0].classList.remove("rotating")
                    btnImg[1].classList.remove("rotating")
                })
                .catch((error) => {
                    btnImg[0].classList.remove("rotating")
                    btnImg[1].classList.remove("rotating")
                    formModal.classList.add("active")
                    formModamValid.style.display = "none";
                    bgCloseModal.style.display = "flex";
                    formModamInvalid.style.display = "block";
                    formModalText.textContent = "An error occurred while submitting the data."
                });
        }
    });
}

// Har bir form uchun validatsiyani ishga tushirish
validateForm("application-form-1", "name-1", "phone-1", "name-error1", "phone-error1");
validateForm("application-form-2", "name-2", "phone-2", "name-error", "phone-error");