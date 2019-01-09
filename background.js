const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  //random 함수가 0을 주면 +1을 넣어서 첫번째가 되고, 그다음 1주어지면 2가되어 두번쨰, 2는 3번쨰...
  image.src = `image/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER); //Math.Follor로 0.45455->0 1.432342->1  내림 적용을 한다.
  return number;
}

function init() {
  //이 안에다가 함수를 생성할 것 이다.
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();
