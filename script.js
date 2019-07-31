let todos = [];
let state = "all";

function Todo(body, done = false) {
  this.body = body;
  this.done = done;
}

document.getElementById("todo-body").focus();
const node = document.getElementById("todo-body");
node.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    createTodo();
  }
});

function renderOneTodo(todo, idx) {
  return `<li >
    <h4 class="${todo.done ? "done" : null}">${idx + 1}. ${todo.body}</h4>  
    <button class="btn btn-sm btn-outline-success complete" onclick=toggle(${idx})>✔</button>
		<button class="btn btn-sm btn-outline-danger ml-2" onclick="deleteTodo(${idx})">✖ </button>
    </li>`;
}

function renderTodoList() {
  let filtered;
  if (state == "all") {
    filtered = todos;
  } else if (state == "done") {
    filtered = todos.filter(task => task.done);
  } else if (state == "remain") {
    filtered = todos.filter(task => !task.done);
  }
  todoList = filtered.map(renderOneTodo);
  document.getElementById("todo-list").innerHTML = todoList.join("");
  localStorage.setItem("todos", todos);
}

function createTodo() {
  let todoBody = document.getElementById("todo-body").value;
  let newTodo = new Todo(todoBody);
  todos.push(newTodo);
  update(state);
  document.getElementById("todo-body").value = "";
}

function deleteTodo(idx) {
  todos.splice(idx, 1);
  update(state);
}

function toggle(idx) {
  todos[idx].done = !todos[idx].done;
  update(state);
}

function update(newState) {
  state = newState;
  renderTodoList();
  return;
}
update(state);
