// 로컬 스토리지에 할일 아이템템 저장하기
function saveTodo(key, newTodo, order) {
  const newTodoObj = { status: "todo", value: newTodo, order };
  localStorage.setItem(key, JSON.stringify(newTodoObj));
}

// 로컬 스토리지에 저장된 할일 목록 불러오기
function getAllTodos() {
  const todos = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const todoString = localStorage.getItem(key);
    const todo = JSON.parse(todoString);
    todo.id = key;
    todos.push(todo);
  }
  return todos.sort((a, b) => a.order - b.order);
}

// 로컬 스토리지에 저장된 할일 아이템 삭제하기
function removeTodo(key) {
  localStorage.removeItem(key);
}

// 로컬 스토리지에 저장된 할일 아이템 상태 업데이트 하기
function updateTodoStatus(key, status) {
  const todoString = localStorage.getItem(key);
  if (todoString) {
    const todo = JSON.parse(todoString);
    todo.status = status;
    localStorage.setItem(key, JSON.stringify(todo));
  }
}

// 브라우저 및 로컬 스토리지에 순서 업데이트 하기
function updateOrdersAndLocalStorage() {
  const todoItems = Array.from($todoList.children);
  todoItems.forEach((item, index) => {
    const key = item.id;
    const todoString = localStorage.getItem(key);
    if (todoString) {
      const todo = JSON.parse(todoString);
      todo.order = todoItems.length - 1 - index;
      localStorage.setItem(key, JSON.stringify(todo));
    }
  });
}

// 할일 아이템(체크박스 + 텍스트) 생성하기
function createTodoItem(el) {
  // console.log(el);
  const $todoItem = document.createElement("li");

  // 체크박스
  const $checkbox = document.createElement("input");
  $checkbox.type = "checkbox";

  function handleStatusChange() {
    const status = $checkbox.checked ? "done" : "todo";
    $todoItem.classList.toggle("done", $checkbox.checked);
    $todoItem.classList.toggle("todo", !$checkbox.checked);
    updateTodoStatus(el.id, status);
  }

  $checkbox.addEventListener("change", handleStatusChange);
  $todoItem.append($checkbox);

  // 텍스트
  const $todoText = document.createElement("p");
  $todoText.textContent = el.value;
  $todoItem.classList.add(el.status);
  $todoItem.id = el.id;
  $todoText.addEventListener("click", function (e) {
    e.preventDefault();
    $checkbox.checked = !$checkbox.checked;
    handleStatusChange();
  });
  $todoItem.append($todoText);

  // 삭제 버튼
  const $deleteBtn = createDeleteBtn();
  $todoItem.append($deleteBtn);

  return $todoItem;
}

// 삭제 버튼 생성하기
function createDeleteBtn() {
  const $deleteBtn = document.createElement("button");
  $deleteBtn.classList.add("delete-btn");
  $deleteBtn.textContent = "X";
  $deleteBtn.onclick = function () {
    const parentElement = this.parentElement;
    parentElement.remove();
    removeTodo(parentElement.id);
  };

  return $deleteBtn;
}

// console.log(getAllTodos());

const allTodos = getAllTodos();
const $todoList = document.querySelector("#todo-list");

allTodos.forEach((el) => {
  const $todoItem = createTodoItem(el);

  if (el.status === "done") {
    const $checkbox = $todoItem.querySelector('input[type="checkbox"]');
    if ($checkbox) {
      $checkbox.checked = true;
      $todoItem.classList.add("done");
    }
  }
  $todoList.prepend($todoItem);
});

const drake = dragula([$todoList]);
drake.on("dragend", function () {
  updateOrdersAndLocalStorage();
});

// 0. 버튼을 클릭했을 때 실행되는 이벤트 함수입니다.
document.getElementById("add-btn").addEventListener("click", function () {
  // 1. index.html에 있는 input 요소에 입력된 값(value)과 button 요소를 변수에 할당합니다.
  // 2. 새로운 li요소를 만들고 input 요소에 입력된 값을 textContent로 갖도록 합니다.
  // 3. li 요소는 클릭하면 해당 li 요소가 지워지는 delete 버튼을 가지고 있어야 합니다. (버튼이 실제로 동작하지 않아도 괜찮습니다.)
  // 4. 입력창은 초기화되어야 합니다.
  // 5. 만약 입력창에 아무것도 입력하지 않은 경우 alert로 유저에게 입력을 요청해야 합니다.
  const $todoInput = document.querySelector("#todo-input");
  const newTodo = $todoInput.value.trim();

  if (newTodo) {
    // 로컬스토리지에 새로운 할일 추가
    const key = Date.now().toString();
    const order = $todoList.children.length;
    console.log(order);
    saveTodo(key, newTodo, order);

    // 화면에 새로운 할일 추가
    const newTodoObj = {
      id: key,
      status: "todo",
      value: newTodo,
      order,
    };
    const $todoItem = createTodoItem(newTodoObj);
    $todoInput.value = "";

    $todoList.prepend($todoItem);
    updateOrdersAndLocalStorage();
  } else {
    alert("할 일을 입력하세요!");
  }
});

// 심화1) 입력한 TO-DO가 Local Storage에 저장되어 새로 고침 후에도 유지되도록 해보세요.
// 심화2) 할 일 항목에 완료 표시를 할 수 있는 체크박스를 추가해 보세요.
// 심화3) TO-DO 리스트를 드래그 앤 드롭으로 정렬할 수 있는 방법을 검색하고 적용해 보세요.
