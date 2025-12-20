// --- 1. Slideshow Logic ---
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 15000);

// --- 2. Music Logic ---
const music = document.getElementById('bg-music');
const songInfo = document.getElementById('song-info');
const musicIcon = document.getElementById('music-icon');
let hideInfoTimer; 

// Set Volume to 50%
music.volume = 0.5;

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicIcon.innerText = "🎵";
        
        // Show Info
        songInfo.innerText = "Music is playing - At My Worst by Pink Sweat$";
        songInfo.classList.add('visible');
        
        // No longer auto-hide when playing
        clearTimeout(hideInfoTimer);
    } else {
        music.pause();
        musicIcon.innerText = "🔇";
        
        // Show "Music is muted" and auto-hide after 5 seconds
        songInfo.innerText = "Music is muted";
        songInfo.classList.add('visible');
        clearTimeout(hideInfoTimer);
        hideInfoTimer = setTimeout(() => {
            songInfo.classList.remove('visible');
        }, 5000);
    }
}

// --- ATTEMPT AUTOPLAY ON LOAD ---
// This tries to play the music as soon as the page loads.
// If the browser blocks it, the 'catch' block runs and keeps it muted.
music.play().then(() => {
    // Autoplay Successful
    musicIcon.innerText = "🎵";
    songInfo.innerText = "Music is playing - At My Worst by Pink Sweat$";
    songInfo.classList.add('visible');
    // No setTimeout, stays visible
}).catch(error => {
    // Autoplay Blocked by Browser (User must click manually)
    console.log("Autoplay prevented by browser policy.");
    musicIcon.innerText = "🔇";
    songInfo.innerText = "Music is muted";
    songInfo.classList.add('visible');
    hideInfoTimer = setTimeout(() => {
        songInfo.classList.remove('visible');
    }, 5000);
});


// --- 3. Language Toggle Logic ---
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vn' : 'en';

    const flagIcon = document.getElementById('flag-icon');
    const langText = document.getElementById('lang-text');

    if (currentLang === 'vn') {
        flagIcon.className = "fi fi-vn"; 
        langText.innerText = "VN";
    } else {
        flagIcon.className = "fi fi-us";
        langText.innerText = "EN";
    }

    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentLang}`);
    });

    document.getElementById('form-lang').value = (currentLang === 'vn') ? "Vietnamese" : "English";

    // Update country code default based on language
    const countrySelect = document.querySelector('select[name="country_code"]');
    if (currentLang === 'vn') {
        countrySelect.value = '+84';
    } else {
        countrySelect.value = '+1';
    }
}

// --- 4. Scroll to Top Button ---
const scrollBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- 5. Attendee Counter ---
function increase() {
    const input = document.getElementById('attendees');
    let value = parseInt(input.value);
    if (value < 4) {
        input.value = value + 1;
    }
}

function decrease() {
    const input = document.getElementById('attendees');
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}