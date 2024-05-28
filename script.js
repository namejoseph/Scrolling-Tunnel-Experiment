
let scrollAmount = 0;
let lastTouchY = null;
let initBoxStart;


if (window.innerWidth > window.innerHeight) {
    initBoxStart = 20; // Initial width percentage
} else {
    initBoxStart = 50; // Initial width percentage
}


let boxRatios = initBoxStart;

// Function to handle scroll events
function handleScroll(event) {
    let deltaY = 0;

    if (event.type === 'wheel') {
        deltaY = event.deltaY;
    } else if (event.type === 'touchmove') {
        const currentTouchY = event.touches[0].clientY;
        deltaY = (lastTouchY === null) ? 0 : currentTouchY - lastTouchY;
        lastTouchY = currentTouchY;
    }

    // Update scroll amount
    scrollAmount += deltaY;

    // Update the width of the boxes based on percentage
    if (event.type === 'wheel') {
        boxRatios += deltaY;
    } else if (event.type === 'touchmove') {
        boxRatios -= deltaY * 6;
    }

    if (boxRatios < initBoxStart) {
        boxRatios = initBoxStart;
    }

    if (boxRatios > 40000) {
        boxRatios = 40000;
    }

    // Set the new width to the element
    document.getElementById('origin').style.width = boxRatios + "%";
    document.getElementById('origin').style.opacity = mapOpacity(boxRatios);

    document.getElementById('box1').style.width = boxRatios + '%';
    document.getElementById('box2').style.width = (boxRatios * 0.35) + "%";
    document.getElementById('box3').style.width = (boxRatios * 0.12) + "%";
    document.getElementById('box4').style.width = (boxRatios * 0.045) + "%";
    document.getElementById('box5').style.width = (boxRatios * 0.0162) + "%";
    document.getElementById('box6').style.width = (boxRatios * 0.005832) + "%";
    document.getElementById('hello').style.width = (boxRatios * 0.00209952) + "%";

}

function mapOpacity(percentage) {
    // Determine screen orientation
    const isLandscape = window.innerWidth > window.innerHeight;

    if (isLandscape) {
        // Landscape: map [40, 60] to [1, 0]
        if (percentage < 40) percentage = 40;
        if (percentage > 60) percentage = 60;
        return 1 - ((percentage - 40) / 20);
    } else {
        // Portrait: map [40, 120] to [1, 0]
        if (percentage < 40) percentage = 40;
        if (percentage > 120) percentage = 120;
        return 1 - ((percentage - 40) / 80);
    }
}


// Initialize the width of the startBox
document.getElementById('origin').style.width = boxRatios + '%';
document.getElementById('box1').style.width = boxRatios + '%';
document.getElementById('box2').style.width = (boxRatios * 0.35) + "%";
document.getElementById('box3').style.width = (boxRatios * 0.12) + "%";
document.getElementById('box4').style.width = (boxRatios * 0.045) + "%";
document.getElementById('box5').style.width = (boxRatios * 0.0162) + "%";
document.getElementById('box6').style.width = (boxRatios * 0.005832) + "%";
document.getElementById('hello').style.width = (boxRatios * 0.00209952) + "%";


// Add event listener for scroll events
window.addEventListener('wheel', handleScroll);

// Add event listener for touch events
window.addEventListener('touchmove', handleScroll);

// Reset lastTouchY when touch ends
window.addEventListener('touchend', function() {
    lastTouchY = null;
});
