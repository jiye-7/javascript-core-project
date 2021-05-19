'use strict';
/*
  1. init() 함수를 호출 시
    당근, 벌레를 랜덤한 위치에 지정한 다음에 게임 필드에 추가하기
*/
const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); // field의 전체적인 size, position 등을 알 수 있음


function initGame() {
  // 당근, 벌레 랜덤한 자리에 생성한 뒤 필드에 추가
  addItem('carrot', 10, 'img/carrot.png');
  addItem('bug', 10, 'img/bug.png');
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

initGame();