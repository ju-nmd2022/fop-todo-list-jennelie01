const toDos = [];
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
  });

  // creates check button
  const checkButton = document.createElement("button");
  checkButton.innerText = "DONE";
  checkButton.classList.add("check-button");
  toDoElement.appendChild(checkButton);

  // marks task as done
  checkButton.addEventListener("click", () => {
    toDoText.style.textDecoration = "line-through";
  });

  itemsList.prepend(toDoElement);
}

/* <div>
  <p>Task 1</p>
  <button onClick{() => function_to_check()}> V </button>
  <button onClick={() => function_to_delete()}> X </button>
</div>; */
