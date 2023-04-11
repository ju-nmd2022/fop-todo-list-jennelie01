let toDos = [];
let toDo = document.getElementById("to-do");
let itemsList = document.querySelector("#items-list");
let addButton = document.getElementById("add-button");

addButton.addEventListener("click", addItemToList);

function addItemToList() {
  const task = {
    id: new Date().getTime(),
    text: toDo.value,
    done: false,
  };

  toDos.push(task);
  console.log(toDos);

  addItemToHtml(task);
  // clear input value after it's added
  toDo.value = "";
  saveInLocalStorage();
}

function addItemToHtml(task) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("added-task");

  const toDoText = document.createElement("p");
  toDoText.innerHTML = task.text;
  toDoText.classList.add("to-do");
  toDoElement.appendChild(toDoText);

  // creates delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.classList.add("delete-button");
  toDoElement.appendChild(deleteButton);

  // delete task
  deleteButton.addEventListener("click", () => {
    itemsList.removeChild(toDoElement);

    // filter returns elements that return true in the following condition
    // function that keeps task if object id does not match html created element id
    toDos = toDos.filter((toDo) => toDo.id !== task.id); // returns true if not equal

    saveInLocalStorage();
  });

  // creates check button
  const checkButton = document.createElement("button");
  checkButton.innerText = "DONE";
  checkButton.classList.add("check-button");
  toDoElement.appendChild(checkButton);

  // marks task as done
  checkButton.addEventListener("click", () => {
    toDoText.style.textDecoration = "line-through";

    // map returns all elements with alterations
    // if id's match, return a task with property done = true
    toDos = toDos.map((toDo) => {
      if (toDo.id === task.id) {
        return { ...toDo, done: true };
      }
      return toDo;
    });

    saveInLocalStorage();
  });

  itemsList.prepend(toDoElement);
}

function saveInLocalStorage() {
  const toDosStringified = JSON.stringify(toDos);
  localStorage.setItem("toDos", toDosStringified);
}
