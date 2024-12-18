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


const scriptURL = 'https://script.google.com/macros/s/AKfycbxQuN4-slVkRK_d0YRmzel38cb8JTGKnicSaf730B9N4r6iS0yO66sy8CpE0-iZgKzy/exec'
const form = document.forms['application-form-2']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})