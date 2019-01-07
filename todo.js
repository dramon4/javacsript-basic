const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const toDos = []; //toDos = 할일 목록을 배열 값으로 선언 해준다.

function paintToDo(text) {
  const li = document.createElement("li"); //html에서 li요소를 생성 해준다.
  const delBtn = document.createElement("button"); //
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn); //appendChild ->무언가를 그의 father element 안에 넣는다.
  li.appendChild(span);
  li.id = newId; //li에 id 값을 설정 : 삭제할떄 무엇을 삭제해야하는지 알기 위해서.
  toDoList.appendChild(li);
  const toDoObj = {
    key: text,
    id: newId
  };
  toDos.push(toDoObj);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //누군가 Input 입력을 하였을때 입력 or 삭제를 하고싶다.
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //she is
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
