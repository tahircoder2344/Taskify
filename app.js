const item = document.querySelector("#item");
const todo = document.querySelector("#to-do-box");
const localStorageKey = 'To-do-Items'; // Key for local storage

// Retrieve existing to-do items from local storage
const storedItems = localStorage.getItem(localStorageKey);
const toDoItems = storedItems ? JSON.parse(storedItems) : [];

// Function to update local storage with current to-do items
const updateLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(toDoItems));
};

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodoItem(this.value);
    this.value = "";
  }
});

const addTodoItem = (item) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
  `;
  listItem.addEventListener('click', function () {
    this.classList.toggle("done");
    updateLocalStorage(); // Update local storage when marking as done
  });

  listItem.querySelector('i').addEventListener('click', function () {
    const index = toDoItems.indexOf(item);
    if (index !== -1) {
      toDoItems.splice(index, 1);
      updateLocalStorage(); // Update local storage when removing
    }
    listItem.remove();
  });

  todo.appendChild(listItem);
  toDoItems.push(item); // Add the item to the array
  updateLocalStorage(); // Update local storage after adding
};

// Load existing to-do items from local storage on page load
window.addEventListener('load', function () {
  if (toDoItems.length > 0) {
    toDoItems.forEach((item) => {
      addTodoItem(item);
    });
  }
});
