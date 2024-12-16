const localUrl = "http://localhost:3000/users";

async function getData() {
  try {
    const request = new Request(localUrl);
    const response = await fetch(request);
    const users = await response.json();
    console.log(users);

    const container = document.getElementById("container");
    if (container) {
      users.forEach(user => {
        const html = `
          <div class="card">
            <img src="profile.png" alt="${user.firstName}" style="box-shadow: 5px -10px 20px ${user.color}">
            <h2 style="box-shadow: 0 0 20px ${user.color}">${user.firstName} ${user.lastName}<br>
            <span class="username">${user.username}</span></h2>
            </div>`
        container.insertAdjacentHTML("beforeend", html);
      });
    } else {
      console.error("Container element hittades inte.");
    }

  } catch (error) {
    console.log("Något gick fel: "+error);
  }
}

getData();