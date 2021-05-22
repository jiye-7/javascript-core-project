'use strict'; // use stric은 모듈에서는 자동으로 설정된다. index.html에서 type="module"로 지정해주었다면 'use stric'가 필요 없다.

import * as sound from './sound.js';
const CARROT_SIZE = 80;

export default class Field {
  constrctor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this); // 1
    // this.field.addEventListener('click', (e) => this.onClick(e)); // 2
  } 

  init() {
    this.field.innerHTML = '';
    this._addItem(this.carrotCount, 'img/carrot.png', 'carrot');
    this._addItem(this.bugCount, 'img/bug.png', 'bug');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // private member variable를 작성하기 위해 underscore(_)를 붙임 (외부에서 봤을 때 호출하면 안 되는 것을 알림)
  // JavaScript 는 아직 private 개념이 없기 때문에 우선 아래처럼 처리한다.
  _addItem(className, count, imgPath) {
    // filed를 position이 static이 아닌 relative로 지정한 다음, item들을 absolute로 하게 되면 filed를 기준으로 item들의 포지션이 absolute로 결정된다.
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
  
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }

}

// randomNumber()는 field와 상관이 없는 함수이다. Field class안에 있는 데이터들과는 무관하게 공통적으로 쓸 수 있는 함수이기 때문에 class에 포함하는 것보다 밖에다가 두면
// 똑같이 반복해서 각각의 Object에 만들어지지 않기 때문에 더 효율적이다. ---> static function이라고 부름
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}