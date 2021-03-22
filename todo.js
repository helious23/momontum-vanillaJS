const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDolist");

const TODOS_LS = "toDos";

const toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage 에서는 모든 data를 string 형태로 저장 -> 객체를 string 형태로 변환해야 함
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
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
