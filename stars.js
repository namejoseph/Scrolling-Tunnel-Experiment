
document.addEventListener('DOMContentLoaded', function() {
    // Generate random stars when the page is loaded
    const numStars = 100; // Number of stars to generate
    generateStars(numStars);
});

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
