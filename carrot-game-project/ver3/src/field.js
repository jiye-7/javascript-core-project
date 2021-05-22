'use strict';

import * as sound from './sound.js';
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect(); // field의 전체적인 size, position 등을 알 수 있음
    this.field.addEventListener('click', this.onClick);
    // this.onClick = this.onClick.bind(this); // 1번째 방법) bind한 뒤 전달
    //this.field.addEventListener('click', (event) => this.onClick(event)); // 2번째 방법) arrow function은 this가 유지되니까, 콜백함수로 전달
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

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

  // *** this: 어떤 클래스 안에 있는 함수를 다른 콜백으로 전달할 때는 그 함수가 포함되어져 있는 클래스 정보가 사라진다. 따라서 클래스와 함수를 묶을 수 있는 바인딩 처리를 해줘야 된다. 또는 arrow function을 사용한다.
  onClick = (event) => { // 3번째 방법) arrow function - 클래스 안에 있는 어떤 함수를 전달할 때 arrow function으로 해 놓으면 this가 잘 전달된다.
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick * this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick * this.onItemClick('bug');
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}