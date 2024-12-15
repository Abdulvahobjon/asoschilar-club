document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.querySelector('.selected-country');
    const dropdown = document.getElementById('countryDropdown');
    const phoneInput = document.getElementById('phone');
    const form = document.getElementById('contactForm');

    // Toggle dropdown
    selectedCountry.addEventListener('click', function() {
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!countrySelect.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Handle country selection
    const countryOptions = document.querySelectorAll('.country-option');
    countryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const flag = this.getAttribute('data-flag');
            const prefix = this.getAttribute('data-prefix');
            
            // Update selected country display
            selectedCountry.querySelector('.country-flag').textContent = flag;
            
            // Update phone input placeholder
            phoneInput.placeholder = prefix;
            
            // Close dropdown
            dropdown.classList.remove('show');
        });
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = phoneInput.value;
        
        console.log('Form submitted:', {
            name: name,
            phone: phone
        });
    });
});