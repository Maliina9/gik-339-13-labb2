// Hämta DOM-element
const enterButton = document.getElementById('enter');
const inputField = document.getElementById('input');
const todoContainer = document.getElementById('div');

// Funktion för att skapa ny todo-item
function createTodoItem(text) {
    // Skapa list-element
    const listItem = document.createElement('li');
    listItem.setAttribute('type', 'none');
    listItem.style.width = '700px';
    listItem.style.display = 'inline-block';
    listItem.style.cursor = 'pointer';

    // Lägg till text
    const textNode = document.createTextNode(text);
    listItem.appendChild(textNode);

    // Skapa delete-knapp
    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'image');
    deleteButton.setAttribute('src', 'https://clipartart.com/images/clipart-showing-red-x-10.jpg');
    deleteButton.style.display = 'inline-block';
    deleteButton.style.width = '13px';
    deleteButton.style.height = '15px';
    deleteButton.style.position = 'absolute';
    deleteButton.style.left = '100%';

    // Skapa checkmark
    const checkmark = document.createElement('span');
    checkmark.innerText = '✅';
    checkmark.style.display = 'none';
    checkmark.style.position = 'absolute';
    checkmark.style.left = '0%';

    // Lägg till delete-knapp och checkmark
    listItem.appendChild(deleteButton);
    listItem.appendChild(checkmark);

    // Event listener för delete-knapp
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Förhindra att click event bubblar upp till parent
        todoContainer.removeChild(listItem);
    });

    // Event listener för toggle checkmark
    listItem.addEventListener('click', function() {
        checkmark.style.display = checkmark.style.display === 'none' ? 'inline-block' : 'none';
    });

    return listItem;
}

// Event listener för add-knapp
enterButton.addEventListener('click', function() {
    const todoText = inputField.value.trim();
    if (todoText) {
        const newTodoItem = createTodoItem(todoText);
        todoContainer.appendChild(newTodoItem);
        inputField.value = ''; // Rensa input-fältet
    }
});

// Event listener för Enter-tangent
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        enterButton.click();
    }
});