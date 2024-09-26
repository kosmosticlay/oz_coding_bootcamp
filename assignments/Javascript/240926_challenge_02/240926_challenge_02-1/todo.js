/* todo-form nodes */
const $todoForm = document.getElementById("todo-form");
const $categoryInput = document.getElementById("category-input");
const $todoInput = document.getElementById("todo-input");
const $submitBtn = document.getElementById("submit-btn");

/* todo-container nodes */
const $todoList = document.querySelector(".todo-list");

let todoList = [];

function setAttributes(element, attributes) {
  for (let key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
}

function addTodo(newTodo) {
  if (newTodo.value === "") {
    alert("할 일을 1자 이상 입력해주세요!");
    return;
  }
  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo(e) {
  const $todoItem = e.target.closest("li");
  $todoList.removeChild($todoItem);

  const savedTodos = JSON.parse(localStorage.getItem("todoList"));

  const newTodos = savedTodos.filter(
    (todo) => todo.id !== Number($todoItem.dataset.key)
  );
  console.log(newTodos);

  todoList = [];
  todoList = newTodos;

  localStorage.setItem("todoList", JSON.stringify(newTodos));
}

function checkTodo(e) {
  const $todoItem = e.currentTarget;
  const $todoLabel = $todoItem.querySelector("label");
  const isChecked = $todoItem.querySelector('input[type="checkbox"]').checked;

  if (isChecked) {
    $todoLabel.classList.add("completed");
  } else {
    $todoLabel.classList.remove("completed");
  }
}

function paintTodoList() {
  $todoList.innerHTML = "";
  const todoList = JSON.parse(localStorage.getItem("todoList")).reverse();
  console.log(todoList);
  todoList.forEach((todoItem) => {
    const $todoItem = document.createElement("li");
    setAttributes($todoItem, {
      "data-key": todoItem.id,
    });

    /* 투두 아이템 - 체크 박스 */
    const $todoCheckbox = document.createElement("input");
    setAttributes($todoCheckbox, {
      type: "checkbox",
      id: `${todoItem.id}`,
    });
    $todoCheckbox.checked = todoItem.isDone;

    /* 투두 아이템 - 내용 */
    const $todoLabel = document.createElement("label");
    $todoLabel.textContent = todoItem.value;
    setAttributes($todoLabel, {
      for: `${todoItem.id}`,
      class: "todo-value",
    });

    /* 투두 아이템 - 삭제 버튼 */
    const $deleteBtn = document.createElement("button");
    setAttributes($deleteBtn, {
      class: "icon",
      "aria-expanded": "false",
      "aria-controls": "todo-input-container",
    });
    $deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24"
    height="24">
    <path
      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
    />
  </svg>`;

    /* 이벤트 리스너 등록 */
    $deleteBtn.addEventListener("click", deleteTodo);
    $todoItem.addEventListener("click", checkTodo);

    $todoItem.append($todoCheckbox, $todoLabel, $deleteBtn);
    $todoList.append($todoItem);
  });
}

$todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo = {
    id: new Date().getTime(),

    value: $todoInput.value,
    isDone: false,
  };

  $todoInput.value = "";
  addTodo(newTodo);
  paintTodoList();
});

paintTodoList();
