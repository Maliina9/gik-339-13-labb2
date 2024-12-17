/*
Kod som sätter lyssnare på #container och vid mouseenter och mouseleave
sätter den opacitet, filter och z-index på korten.
*/

const container = document.getElementById("container");

container.addEventListener("mouseenter", event => {
  if (event.target.classList.contains("card")) {
    const hoveredCard = event.target;

    hoveredCard.style.zIndex = "1"; // Hovrat kort får z-index 1

    // Lägg till stil på alla kort som inte är hoverade
    document.querySelectorAll(".card").forEach(card => {
      if (card !== hoveredCard) {
        card.style.opacity = "0.8";
        card.style.filter = "blur(2px)";
      }
    });
  }
}, true); 
// True för att använda capturing istället för bubbling, 
// i denna kod används det för att ändra timing på zIndex för bättre flyt

container.addEventListener("mouseleave", event => {
  if (event.target.classList.contains("card")) {
    // Reset styles for all cards
    document.querySelectorAll(".card").forEach(card => {
      card.style.opacity = "";
      card.style.filter = "";
      setTimeout(() => {
        event.target.style.zIndex = "";
      },50);
    });
  }
}, true); // True här är sSamma som vid mouseenter

