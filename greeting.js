// html document에서 className을 호출해서 객채화 시킨다.
const form = document.querySelector(".js-form"),
  input = document.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", //currentUser을 USER_LS에 담는다.
  SHOWING_CN = "showing"; //showing 이라는 css(block) 파일을 만들고 showing을 밑에서 변수호출을 해서 안보이게
//설정했던 form을 보이게 한다.

function saveName(text) {
  localStorage.setItem(USER_LS, text); //USER_LS에 text를 준다.
}
function handleSubmit(evnt) {
  //누군가 submit 했을때 paintGreeting을 할 뿐만 아니라, 이름(currentValue)도 저장한다.
  event.preventDefault();
  //보통 event가 시작되면 html의 발생시점(form) 부터 root(document)까지 event가 올라간다.
  //그렇기 떄문에 preventDefault 설정으로 못 올라가게 한다.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text) {
  //text를 색칠하려면 form을 숨겨야 한다.
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //she is not
    askForName();
  } else {
    //she is__로컬 스토리지 에서 가져온 텍스트를 출력한다.
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();
