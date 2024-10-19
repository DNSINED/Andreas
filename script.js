const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-button");
const resultMessage = document.getElementById("result-message");
const confettiCanvas = document.getElementById("confetti-canvas");

spinButton.addEventListener("click", () => {
    // Disable the spin button during the spin
    spinButton.disabled = true;

    // Generate a random number between 3600 and 7200 degrees for multiple full rotations
    const randomDegree = Math.floor(3600 + Math.random() * 3600);

    // Apply rotation to the wheel
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Wait 5 seconds (duration of the spin) to show the result
    setTimeout(() => {
        // Display the custom winning message
        resultMessage.textContent = `Felicitări, de ziua ta ai câștigat donatzziiii!`;
        resultMessage.style.display = 'block'; // Show the message

        // Reactivate the spin button
        spinButton.disabled = false;

        // Trigger confetti animation
        startConfetti();

    }, 5000); // 5 seconds for the spin duration
});

// Confetti animation function
function startConfetti() {
    const confetti = confettiCanvas.getContext('2d');
    const confettiParticles = [];

    // Generate confetti particles
    for (let i = 0; i < 300; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 6 + 4,
            speedY: Math.random() * 3 + 3,
            speedX: Math.random() * 2 - 1
        });
    }

    // Animation loop
    function confettiLoop() {
        confetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiParticles.forEach(p => {
            confetti.fillStyle = p.color;
            confetti.fillRect(p.x, p.y, p.size, p.size);

            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > confettiCanvas.height) {
                p.y = -p.size;
            }
        });

        requestAnimationFrame(confettiLoop);
    }

    confettiLoop();
}

// Resize the canvas to match the window size
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();