// Function to generate random stars with unique IDs and animation delays
function generateStars(numStars) {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.setAttribute('id', `star${i}`); // Set unique ID for each star
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        // Generate random animation delay for each star
        const animationDelay = Math.random() * 6; // Delay between 0 and 6 seconds
        star.style.animationDelay = `-${animationDelay}s`; // Apply negative delay to start animations at different times

        starsContainer.appendChild(star);
    }
}

// Generate random stars when the page is loaded
window.addEventListener('load', function () {
    const numStars = 100; // Number of stars to generate
    generateStars(numStars);
    initAudio(); // Initialize audio when the page is loaded
});

// Create an Audio element and set the source
const audio = new Audio('scrolling-tunnel-experiment.mp3');

// Set initial volume to 0
audio.volume = 0;

// Set initial values for cumulative scroll movement and min/max scale factors
let cumulativeDeltaY = 0;
const minScaleFactor = 1;
const maxScaleFactor = 400;
let isScrolling = false;

function onScroll(event) {
    const deltaY = event.deltaY;

    // If deltaY is not zero, someone started scrolling
    if (deltaY !== 0) {
        // Fade in the sound gradually
        fadeAudioIn();
    }

    // Update cumulative scroll movement
    cumulativeDeltaY += deltaY;

    // Calculate the scaling factor based on cumulative scroll movement
    let scaleFactor = 1 + cumulativeDeltaY / 100;
    scaleFactor = Math.max(scaleFactor, minScaleFactor); // Ensure scaling factor doesn't go below min
    scaleFactor = Math.min(scaleFactor, maxScaleFactor); // Ensure scaling factor doesn't exceed max

    // Apply the scaling factor to each .framed-image element
    const framedImages = document.querySelectorAll('.framed-image');
    framedImages.forEach(image => {
        // Apply the calculated scale factor
        image.style.transform = `scale(${scaleFactor})`;
    });

    // Fade out the 'origin' element gradually if scaleFactor exceeds 2
    const originElement = document.getElementById('origin');
    if (scaleFactor > 2) {
        // Calculate opacity based on scaleFactor approaching 2
        const opacity = 1 - (scaleFactor - 2) / 0.5;
        originElement.style.opacity = Math.max(opacity, 0);
    } else {
        originElement.style.opacity = 1;
    }

    if (cumulativeDeltaY < 0) {
        cumulativeDeltaY = 0;
    } else if (cumulativeDeltaY > 20000) {
        cumulativeDeltaY = 20000;
    }

    console.log("cumulativeDeltaY: " + cumulativeDeltaY + " | " + "scaleFactor: " + scaleFactor);

    isScrolling = true;
}

function update() {
    if (isScrolling) {
        isScrolling = false;
    }
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Add event listener for scroll events
window.addEventListener('wheel', function (event) {
    onScroll(event);
});

// Function to fade in the audio gradually
function fadeAudioIn() {
    let volume = 0;
    const fadeInInterval = setInterval(function () {
        volume += 0.01; // Adjust the increment for desired speed
        if (volume >= 1) {
            volume = 1;
            clearInterval(fadeInInterval); // Stop fading in once volume reaches 1
        }
        console.log("Audio: " + audio + " | " + "Volume:" + volume);
        audio.volume = volume;
    }, 100); // Adjust the interval for desired smoothness
}

function initAudio() {
    audio.play().catch(error => console.log("Audio playback failed: ", error));
}
