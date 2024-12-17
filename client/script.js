const localUrl = "http://localhost:3000/users";

async function getData() { // Async/await vid hämtning av users
  try { // Try catch för att skriva ut felmeddelanden i konsolen vid fel
    const request = new Request(localUrl);
    const response = await fetch(request);
    const users = await response.json();
    // console.log(users); // Kolla så att users har hämtats från databas till array

    const container = document.getElementById("container"); // Hämta elementet med id "container" där kort ska visas
    if (container) { // If-else for att kolla att elementet finns
      users.forEach(user => { // Bygg upp en templatesträng med korten
        const html = `
          <div class="card">
            <img src="profile.png" alt="${user.firstName}">
            <h2>${user.firstName} ${user.lastName}<br>
            <span class="username">${user.username}</span></h2>
            </div>`
        container.insertAdjacentHTML("beforeend", html);
        const lastCard = container.lastElementChild; // Hitta senast skapade kortet, för att kunna sätta färgvariabeln
        lastCard.style.setProperty("--color", user.color); //Sätt färg som variabel på kortet för skugga av card och img
      });
    } else {
      console.log("Container element hittades inte.");
    }

  } catch (error) {
    console.log("Något gick fel: "+error); // Skriv ut eventuellt felmeddelande
  }
}

getData();