const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDolist");

const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); // html 상에서 특정 li 없앰
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // li.id = string -> chagne to Int
  }); // 특정 li.id 를 제외한 나머지 to do를 받아오기 위해 만듦
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage 에서는 모든 data를 string 형태로 저장 -> 객체를 string 형태로 변환해야 함
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId; // li id
  toDoList.appendChild(li);
  toDoObj = {
    text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // Stringify 로 만든 string 을 object 형태로 다시 변환
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
};

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
