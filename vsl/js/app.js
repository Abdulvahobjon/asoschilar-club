const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxM-EEXzpaPTWlzOcsZO4wcpzb3ppCmmCDURZsEfO5CpdYhSDQKuHawDE7X8F4a5IXQ/exec';

// Har bir mamlakat uchun format
const phoneFormats = {
  '+998': { pattern: '99 999 99 99', maxLength: 12, placeholder: '99 999 99 99' }, // Uzbekistan
  '+7': { pattern: '999 999 9999', maxLength: 11, placeholder: '999 999 9999' }, // Russia, Kazakhstan
  '+992': { pattern: '99 999 9999', maxLength: 10, placeholder: '99 999 9999' }, // Tajikistan
  '+996': { pattern: '999 99 9999', maxLength: 10, placeholder: '999 99 9999' }, // Kyrgyzstan
  '+993': { pattern: '99 99 9999', maxLength: 9, placeholder: '99 99 9999' }, // Turkmenistan
  '+994': { pattern: '99 999 9999', maxLength: 10, placeholder: '99 999 9999' }, // Azerbaijan
  '+374': { pattern: '99 999999', maxLength: 9, placeholder: '99 999999' }, // Armenia
  '+375': { pattern: '99 999 99 99', maxLength: 11, placeholder: '99 999 99 99' }, // Belarus
  '+373': { pattern: '99 999999', maxLength: 9, placeholder: '99 999999' }, // Moldova
  '+995': { pattern: '999 999999', maxLength: 9, placeholder: '999 999999' }, // Georgia
  '+44': { pattern: '9999 999999', maxLength: 10, placeholder: '9999 999999' }, // UK
  '+49': { pattern: '999 9999999', maxLength: 11, placeholder: '999 9999999' }, // Germany
  '+33': { pattern: '9 99 99 99 99', maxLength: 11, placeholder: '9 99 99 99 99' }, // France
  '+39': { pattern: '999 9999999', maxLength: 10, placeholder: '999 9999999' }, // Italy
  '+34': { pattern: '999 999999', maxLength: 9, placeholder: '999 999999' }, // Spain
  '+1': { pattern: '(999) 999-9999', maxLength: 14, placeholder: '(999) 999-9999' }, // USA, Canada
  '+52': { pattern: '99 9999 9999', maxLength: 11, placeholder: '99 9999 9999' }, // Mexico
  '+55': { pattern: '(99) 99999-9999', maxLength: 15, placeholder: '(99) 99999-9999' }, // Brazil
  '+54': { pattern: '9 9999 9999', maxLength: 11, placeholder: '9 9999 9999' }, // Argentina
  '+90': { pattern: '999 999 9999', maxLength: 10, placeholder: '999 999 9999' }, // Turkey
  '+971': { pattern: '99 999 9999', maxLength: 10, placeholder: '99 999 9999' }, // UAE
  '+966': { pattern: '99 9999 9999', maxLength: 11, placeholder: '99 9999 9999' }, // Saudi Arabia
  '+86': { pattern: '9999 9999999', maxLength: 11, placeholder: '9999 9999999' }, // China
  '+82': { pattern: '9999 9999999', maxLength: 11, placeholder: '9999 9999999' }, // South Korea
  '+81': { pattern: '99 9999 9999', maxLength: 11, placeholder: '99 9999 9999' }, // Japan
  '+91': { pattern: '99999 99999', maxLength: 10, placeholder: '99999 99999' } // India
};

const form = document.getElementById('bookingForm');
const phoneInput = document.getElementById('phone');
const countryCode = document.getElementById('countryCode');
const submitButton = form.querySelector('button[type="submit"]');

// Format telefon raqamini ko'rsatilgan formatga asosan
function formatPhoneNumber(value, format) {
  let numbersOnly = value.replace(/\D/g, '');
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < format.length && digitIndex < numbersOnly.length; i++) {
    if (format[i] === '9') {
      formatted += numbersOnly[digitIndex];
      digitIndex++;
    } else {
      formatted += format[i];
    }
  }

  return formatted;
}

// Country code o'zgarsa, placeholder va maxLength ni yangilash
countryCode.addEventListener('change', function () {
  const code = this.value;
  const format = phoneFormats[code] || { pattern: '999999999', maxLength: 15, placeholder: 'Raqamingiz' };
  
  phoneInput.value = '';
  phoneInput.placeholder = format.placeholder;
  phoneInput.maxLength = format.maxLength;
});

// Telefon input uchun formatting
phoneInput.addEventListener('input', function (e) {
  const code = countryCode.value;
  const format = phoneFormats[code] || { pattern: '999999999', maxLength: 15 };
  
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length > 0) {
    e.target.value = formatPhoneNumber(value, format.pattern);
  }
});

// Faqat raqam kiritishga ruxsat
phoneInput.addEventListener('keypress', function (e) {
  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
    e.preventDefault();
  }
});

// Paste qilganda ham formatting
phoneInput.addEventListener('paste', function (e) {
  e.preventDefault();
  const pastedText = (e.clipboardData || window.clipboardData).getData('text');
  const code = countryCode.value;
  const format = phoneFormats[code] || { pattern: '999999999', maxLength: 15 };
  
  let numbersOnly = pastedText.replace(/\D/g, '');
  let formatted = formatPhoneNumber(numbersOnly, format.pattern);
  
  e.target.value = formatted;
});
// Success modal elements
const successModal = document.getElementById('succes'); // E’TIBOR: id 'success' emas, 'succes'
const overlay = document.querySelector('.overlay');
const successBtn = document.querySelector('.succes__btn');

function closeSuccessModal() {
  if (successModal) successModal.classList.remove('succes-active');
  if (overlay) overlay.style.display = 'none';
  form.reset();
  countryCode.value = '+998';
  phoneInput.placeholder = phoneFormats['+998'].placeholder;
}

if (successBtn) {
  successBtn.addEventListener('click', closeSuccessModal);
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name')?.value?.trim() || '';
  const code = countryCode.value;
  const rawPhone = phoneInput.value.replace(/\D/g, '');
  const timeVal = document.getElementById('time')?.value || '';

  if (!code) return alert("Iltimos, mamlakat kodini tanlang!");
  if (!rawPhone) return alert("Iltimos, telefon raqamini kiriting!");

  // Agar time bo'sh bo‘lsa, hozirgi vaqtni ishlatamiz
  let formattedTime = '';
  const now = new Date();
  const todayDate = now.toLocaleDateString('uz-UZ');

  if (timeVal.includes(':')) {
    const [hours, minutes] = timeVal.split(':');
    formattedTime = `${todayDate} ${hours}:${minutes}`;
  } else {
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    formattedTime = `${todayDate} ${hh}:${mm}`;
  }

  const registrationDateTime = now.toLocaleString('uz-UZ');
  const fullPhone = code + rawPhone;

  const formData = new FormData();
  formData.append('sheetName', 'Lead');
  formData.append('Ism', name);
  formData.append('Telefon raqam', fullPhone);
  formData.append('Qulay vaqt', formattedTime);
  formData.append('Royhatdan otgan vaqti', registrationDateTime);

  submitButton.classList.add('loading');
  submitButton.disabled = true;
  submitButton.textContent = 'Yuborilmoqda...';

  try {
    const res = await fetch(GOOGLE_SHEETS_URL, { method: 'POST', body: formData });

    // faqat muvaffaqiyatda modalni ko‘rsatamiz
    if (res.ok) {
      // Agar body JSON bo‘lsa, xohlasang tekshirib olasan:
      // const data = await res.json(); console.log(data);

      if (overlay) overlay.style.display = 'block';
      if (successModal) successModal.classList.add('succes-active');
    } else {
      console.error('Server error:', res.status, await res.text());
      alert('Xatolik: serverdan muvaffaqiyatsiz javob keldi.');
    }
  } catch (err) {
    console.error('Xato:', err);
    alert('Tarmoq xatosi. Keyinroq urinib ko‘ring.');
  } finally {
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    submitButton.textContent = 'Yuborish';
  }
});


// Sahifa yuklanganda default qiymat
window.addEventListener('load', function () {
  countryCode.value = '+998';
  const format = phoneFormats['+998'];
  phoneInput.placeholder = format.placeholder;
  phoneInput.maxLength = format.maxLength;
});