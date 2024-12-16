const localUrl = "http://localhost:3000/users";

async function getData() {
  try {
    const request = new Request(localUrl);
    const response = await fetch(request);
    const users = await response.json();
    console.log(users);

  } catch (error) {
    console.log("Something went wrong: "+error);
  }
}

getData();