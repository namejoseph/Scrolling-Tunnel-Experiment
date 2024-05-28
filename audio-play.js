// Create an audio element
const audio = new Audio('scrolling-tunnel-experiment.mp3');

// Set the audio to loop
audio.loop = true;

// Function to toggle audio playback
function toggleAudio() {
    if (audio.paused) {
        audio.play(); // If paused, play the audio
    } else {
        audio.pause(); // If playing, pause the audio
    }

    // Get the audio-toggle element
    const audioTogglePath = document.querySelector("#audio-toggle path");
    const audioToggleCircle = document.querySelector("#audio-toggle circle");

    // Change the background color to cyan
    audioTogglePath.style.fill = 'cyan';
    audioToggleCircle.style.stroke = 'cyan';


    // Reset the background color after 0.5 seconds
    setTimeout(() => {
        audioTogglePath.style.fill = '';
        audioToggleCircle.style.stroke = '';
    }, 50); // Duration of the flash effect in milliseconds
}

// Add event listener for body click
document.getElementById("audio-toggle").addEventListener('click', toggleAudio);