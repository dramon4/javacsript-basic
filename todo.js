const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
// const toDos = []; //toDos = 할일 목록을 배열 값으로 선언 해준다.
let toDos = []; //toDos = 할일 목록을 배열 값으로 선언 해준다.

// function filterFn(toDo) {
//   // filter는 마치 ForEach에서 Function을 실행하는 것 같이 각각의 item과 같이 실행이 될거다.
//   //filter가 하는 것은 'array'를 하나 만든다.
//   return toDo.id === 1;
// }

function deleteToDo(evnet) {
  //삭제버튼 함수이다.
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    // console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을때..
  });
  toDos = cleanToDos;
  saveToDos();
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify는 자바스크립트 object를 String으로 바꿔준다.
}
function paintToDo(text) {
  const li = document.createElement("li"); //html에서 li요소를 생성 해준다.
  const delBtn = document.createElement("button"); //
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo); //delBtn을 Click하면 deleteToDo 함수를 호출한다.
  span.innerText = text;
  li.appendChild(delBtn); //appendChild ->무언가를 그의 father element 안에 넣는다.
  li.appendChild(span);
  li.id = newId; //li에 id 값을 설정 : 삭제할떄 무엇을 삭제해야하는지 알기 위해서.
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
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
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
