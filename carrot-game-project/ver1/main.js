/*
  게임은 아무것도 표기되어지지 않고,
  재생버튼을 클릭하면 당근, 벌레들이 필드 안에서 랜덤한 포지션에 배치가 된다. (재생을 할 때 마다)
  당근과 숫자가 줄어든다.
  타이머는 계속해서 동작한다. 10초에서 카운트다운 된다.
  중지 버튼을 누르면 타이머를 멈춘다.
  지정된 시간안에 당근을 다 없애면 성공
  벌레를 클릭하면 죽음
*/

const body = document.querySelector('body');

// game__header 영역
const gameBtn = document.querySelector('.game__btn');
const gameTime = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const iTag = document.querySelector('i');

// pop-up 영역
const popUpSection = document.querySelector('.pop-up');
const refreshBtn = document.querySelector('.pop-up__refresh');
const message = document.querySelector('.pop-up__message');
const popUpBtn = document.querySelector('.pop-up__refresh');

/* game__field 영역
  1. gemeBtn을 클릭하면, game__filed에 벌레, 당근이 표시된다.
  2. 타이머가 10초에서 0초까지 줄어든다.
*/
const gameField = document.querySelector('.game__field');
const bugImgSrc = './img/bug.png';
const carrotImgSrc = './img/carrot.png';

// 시간을 10으로 두고, 1씩 빼면서 콘솔에 먼저 카운트를 찍기 / 그리고 0이될 때 타이머를 끝내야된다.
let time = 10;

function timerFunc() {
  if (time !== 0) {
    time--;
  }
  remainingTimeShow();
  return time;
}

const bgSound = new Audio('./sound/bg.mp3');

let gameTimeInit;
function gameInit() {
  gameField.innerHTML = '';
  popUpSection.style.display = 'none';
  gameTime.textContent = '0:10';
  gameScore.textContent = '10';

  bgSound.play();
  randomItemShow(10, bugImgSrc, 'bug');
  randomItemShow(10, carrotImgSrc, 'carrot');

  iTag.classList.remove('fa-play');
  iTag.classList.add('fa-square', 'gamePause');

  carrot = 10;
  time = 10;

  gameTimeInit = setInterval(() => {
    const returnTime = timerFunc();
    if (returnTime === 0 && carrot !== 0) {
      gameOverShow();
    }
  }, 1000);
}

// 게임 시간 화면에 나타내는 함수
function remainingTimeShow() {
  gameTime.innerHTML = `0:${time}`;
}

// 게임 실패 시 뜨는 화면
function gameOverShow() {
  const bugSound = new Audio('./sound/bug_pull.mp3');
  bugSound.play();
  popUp('YOU LOST :(');
}

// 게임 성공 시 뜨는 화면
function gameWinShow() {
  const gameWinSound = new Audio('./sound/game_win.mp3');
  gameWinSound.play();
  popUp('REPLAY? :)');
}

// pop-up 창 만드는 함수
function popUp(gameMsg) {
  clearInterval(gameTimeInit);
  bgSound.pause();
  popUpSection.style.display = 'flex';
  message.textContent = gameMsg;
  gameBtn.style.pointerEvents = 'none'; // gameBtn click 안 되게 처리
  body.appendChild(popUpSection);
}

let carrot = 10;

// 당근 클릭하면 당근 캐기
function carrotHarvest() {
  carrot--;
  gameScoreShow(carrot);
}

// 게임에서 남은 당근 개수 표시하는 부분
function gameScoreShow() {
  gameScore.textContent = carrot;
  if (carrot === 0) {
    gameWinShow();
  }
}

// 게임에 벌레, 당근 랜덤으로 뿌리기
function randomItemShow(count, imgSrc, tagClassName) {
  // 화면의 위치, top, left를 구해서 랜덤으로 위치
  let rect = gameField.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const image = document.createElement('img');
    image.src = imgSrc;
    image.setAttribute('class', tagClassName);
    image.style.top = Math.random() * (rect.height - 55) + 'px';
    image.style.left = Math.random() * (rect.width - 55) + 'px';
    gameField.appendChild(image);
  }
}

// 게임 시작버튼 클릭시 이벤트리스너
gameBtn.addEventListener('click', gameInit);
// 게임 당근, 벌레 클릭시 이벤트 핸들러
gameField.addEventListener('click', (e) => {
  if (e.target.className === 'carrot') {
    const carrotSound = new Audio('./sound/carrot_pull.mp3');
    carrotSound.play();
    e.target.remove();
    carrotHarvest();
  } else if (e.target.className === 'bug') {
    gameOverShow();
  }
});
// popUp창 게임 재시작 버튼 클릭 시 
popUpBtn.addEventListener('click', gameInit);

gameBtn.addEventListener('click', (e) => {
  if (e.target.className === 'gamePause') {
    clearInterval(gameTimeInit);
    bgSound.pause();
  }
})