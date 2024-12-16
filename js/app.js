let headerResponsiveClose = document.querySelector(".header-responsive-close");
let headerResponsive = document.querySelector(".header-responsive");
let headerHamburger = document.querySelector(".header-hamburger");

headerResponsiveClose.addEventListener('click' , function(){
    headerResponsive.classList.toggle("active")
    document.body.classList.toggle("active")
})

headerHamburger.addEventListener('click' , function(){
    headerResponsive.classList.toggle("active")
    document.body.classList.toggle("active")
})