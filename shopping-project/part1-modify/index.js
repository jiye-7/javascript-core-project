/*
 - 기능
  1. 사용자가 입력창에 목록을 입력하고 Enter key 또는 +버튼을 클릭했을 때 화면에 쇼핑 리스트를 추가한다.
  1. 목록 오른쪽에는 휴지통 아이콘이 있는데 이것을 클릭하면, 해당 쇼핑 목록이 리스트에서 지워진다.
*/

// input tag안의 내용을 읽어오기 
// 버튼 클릭이벤트 / 엔터 이벤트 핸들러 만들기
const ul = document.querySelector('.shopping__lists');
const removeBtn = document.querySelectorAll('.list__delete');
const wishList = document.querySelector('.shopping__wish-list');
const addBtn = document.querySelector('.list__add .fa-cart-plus');

// 리스트 추가 함수
handleMakeList = (shoppingList) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const i = document.createElement('i');

  li.classList.add('list');
  span.textContent = shoppingList;
  i.classList.add('fas', 'fa-trash-alt', 'list__delete');
  li.appendChild(span);
  li.appendChild(i);
  ul.appendChild(li);

  return ul;
}

// remove list handle
ul.addEventListener('click', (e) => {
  // console.log(e.target === removeBtn[0])
  if (e.target.classList[0] === 'fas') {
    e.target.parentElement.remove();
  }

});

// 등록버튼 클릭 시 이벤트핸들러
addBtn.addEventListener('click', () => {
  handleMakeList(wishList.value);
});

// 엔터 시 이벤트핸들러
wishList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    handleMakeList(wishList.value);
  }
});

