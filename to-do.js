let toDos = [];
let toDo = document.getElementById("to-do");
let itemsList = document.querySelector("#items-list");
let addButton = document.getElementById("add-button");

addButton.addEventListener("click", addTaskToList);

// function for the task object
function addTaskToList() {
  const task = {
    // source for the following line https://www.tutorialspoint.com/javascript/javascript_date_object.htm
    id: new Date().getTime(),
    text: toDo.value,
    done: false,
  };

  toDos.push(task);
  console.log(toDos);

  addToDoElement(task);
  // clear input value after it's added
  toDo.value = "";
  saveInLocalStorage();
}

function addToDoElement(task) {
  // adds div element for task
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("added-task");

  // adds the input text value of the task
  const toDoText = document.createElement("p");
  toDoText.innerHTML = task.text;
  toDoText.classList.add("to-do");
  if (task.done === true) {
    toDoText.style.textDecoration = "line-through";
  }

  // adds p element inside div element
  toDoElement.appendChild(toDoText);

  // creates delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.classList.add("delete-button");
  toDoElement.appendChild(deleteButton);

  // delete task
  deleteButton.addEventListener("click", () => {
    itemsList.removeChild(toDoElement);

    // filter returns elements that return true in the following condition, source for method https://www.freecodecamp.org/news/manipulating-arrays-in-javascript/
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

    // map returns all tasks with alterations, source for method https://www.freecodecamp.org/news/manipulating-arrays-in-javascript/
    // if id's match, return a task with attribute done = true
    toDos = toDos.map((toDo) => {
      if (toDo.id === task.id) {
        return { ...toDo, done: true };
      }
      return toDo;
    });

    saveInLocalStorage();
  });

  // adds that div element on top of the other div elements (tasks)
  itemsList.prepend(toDoElement);
}

// the following lines about json and forEach was a solution I got help with via chatGPT which I adapted to my code
// turns keys into strings so localstorage can read it
function saveInLocalStorage() {
  const toDosStringified = JSON.stringify(toDos);
  localStorage.setItem("toDos", toDosStringified);
}

// checks if to-do exists in storage, parse turns strings back into keys, and loads them
function loadToDos() {
  const toDoStorage = localStorage.getItem("toDos");

  if (toDoStorage) {
    toDos = JSON.parse(toDoStorage);
  }

  // each element in the array is called with the function addToDoElement
  toDos.forEach((toDo) => {
    addToDoElement(toDo);
  });
}

loadToDos();
