let headerResponsiveClose = document.querySelector(".header-responsive-close");
let headerResponsive = document.querySelector(".header-responsive");
let headerResponsiveNavLink = document.querySelectorAll(".header-responsive .nav-link");
let headerHamburger = document.querySelector(".header-hamburger");

headerResponsiveClose.addEventListener('click' , function(){
    headerResponsive.classList.toggle("active")
    document.body.classList.toggle("active")
})

headerHamburger.addEventListener('click' , function(){
    headerResponsive.classList.toggle("active")
    document.body.classList.toggle("active")
})

headerResponsiveNavLink.forEach(function(item , index){
    item.addEventListener('click' , function(){
        headerResponsive.classList.toggle("active")
        document.body.classList.toggle("active")
    })
})
