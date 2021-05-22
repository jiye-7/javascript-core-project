'use strict';

// PopUp class는 dom 요소를 가지고 와서 showWithText라는 API를 사용가자 호출하면 받아온 text를 popUp창에 보여줌
// 사용자가 onClick이라는 클릭 리스너를 등록해놓으면, popUp에 버튼이 클릭될 때 마다 등록된 콜백함수를 호출해 주는 역할을 한다.

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpRefresch = document.querySelector('.pop-up__refresh');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpRefresch.addEventListener('click', () => {
      this.onClick && this.onClick();
      hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}