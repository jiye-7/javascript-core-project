'use strict';
/*
  1. init() 함수를 호출 시
    당근, 벌레를 랜덤한 위치에 지정한 다음에 게임 필드에 추가하기
  2. 실행 버튼을 클릭시 init() 실행, 타이머가 실행 전체 남은 당근의 개수 표기
  3. gameBtn 클릭시 게임이 초기화되면서 게임 시작버튼을 중지로 바꾸기
  4. 게임이 시작되면, 타이머와 점수를 보여주기
*/
const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); // field의 전체적인 size, position 등을 알 수 있음
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefresch = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');

let started = false; // 게임이 시작되었는지를 기억하는 변수
let score = 0; // 최종 점수를 기억하는 변수
let timer = undefined; // 총 남은 시간을 기억하는 변수

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresch.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText(`REALPAY❓`);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  showPopUpWithText(win ? `YOU WON 🎉` : `YOU LOST 💩`);
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  // display: 'none'을 주게되면 렌더트리에 포함이 되지 않아서 field 사이즈에 영향을 줄 수 있기 때문에 보이지 않아야 되니까
  // css에서는 visibility: hidden으로 줘서 평소에는 보이지 않다가 게임이 시작될 때 보이게 속성을 변경한다.
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainningTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainningTimeSec);

  timer = setInterval(() => {
    if (remainningTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainningTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60); // time인데 sec로 넘어온다. 
  const seconds = time % 60 // 60으로 나누고 남은 값
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(e) {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  // filed를 position이 static이 아닌 relative로 지정한 다음, item들을 absolute로 하게 되면 filed를 기준으로 item들의 포지션이 absolute로 결정된다.
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}