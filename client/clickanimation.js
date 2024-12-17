// Kod från ChatGPT, konversation: https://chatgpt.com/share/67614de6-0028-800f-9f08-ad211a266a53

// Select the container
const clickContainer = document.querySelector('#container');

// Flag to track animation state per card
const cardAnimationState = new WeakMap();

// Function to extract rendered scale and rotation
function getScaleAndRotation(element) {
    const style = window.getComputedStyle(element);
    const transform = style.transform;

    if (!transform || transform === "none") return { scale: 1, rotation: 0 };

    // Extract the matrix values
    const matrix = transform.match(/matrix\(([^)]+)\)/);

    if (matrix) {
        const values = matrix[1].split(', ').map(parseFloat);
        const a = values[0]; // Scale X
        const b = values[1]; // Skew Y / Rotation
        const scale = Math.sqrt(a * a + b * b);
        const rotation = Math.atan2(b, a) * (180 / Math.PI); // Convert radians to degrees
        return { scale, rotation };
    }
    return { scale: 1, rotation: 0 };
}

// Event delegation on the container
clickContainer.addEventListener('click', (e) => {
    // Check if the clicked element or its parent has the 'card' class
    const card = e.target.closest('.card');

    if (!card) return; // Exit if it's not a card

    // Check if the card is already animating
    if (cardAnimationState.get(card)) return;

    // Set the animation state to true for this card
    cardAnimationState.set(card, true);

    // Get the current rendered scale and rotation
    const { scale, rotation } = getScaleAndRotation(card);

    // Perform the click animation using Web Animations API
    const animation = card.animate(
        [
            { transform: `scale(${scale}) rotate(${rotation}deg)` }, // Start at current state
            { transform: `scale(${scale * 0.1}) rotate(720deg)` },   // Shrink and spin
            { transform: `scale(${scale}) rotate(${rotation}deg)` }  // Return to original
        ],
        {
            duration: 1000, // 1 second
            easing: 'ease',
            fill: 'forwards'
        }
    );

    // When the animation finishes, check if the card is hovered
    animation.finished.then(() => {
        // Reset animation state
        cardAnimationState.set(card, false);

        // If the card is still hovered, return it to the hovered state
        if (card.matches(':hover')) {
            card.style.transition = 'none'; // Disable transition briefly
            card.style.transform = `scale(var(--scale)) rotate(${
                card.matches(':nth-child(odd)') ? 'calc(var(--rotation) * -1)' : 'var(--rotation)'
            })`;

            // Force reflow to apply the immediate style
            card.offsetHeight; // Trigger a reflow

            card.style.transition = ''; // Re-enable transitions
        }
    });
});

