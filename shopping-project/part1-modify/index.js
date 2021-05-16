/*
1. 사용자가 text input에서 타이핑 할 수 있다.
2. 리스트 추가에는 2가지 방법이 있다.
 2-1. 버튼 클릭
 2-2. 엔터 키
3. 등록한 아이템은 스크롤링되는 리스트부분에 표시 
4. 쓰레기통 아이콘 클릭시 아이템 삭제
*/

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

// addBtn click event handler 
function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아온다.
  const text = input.value;

  if (text === '') {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 만든다. (텍스트 + 삭제 버튼 추가)
  const item = createItem(text);

  // 3. items라는 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);

  // 4. input을 초기하기 전에 새로 추가된 아이템으로 스크롤링(이동)
  //items.scrollTop = items.scrollHeight;
  item.scrollIntoView({ block: 'center' });

  // 5. 인풋을 초기화한다. (텍스트 지우기), 자동으로 포커스 들어오도록 처리
  input.value = '';
  input.focus();
}

// 고유한 id 주기
let id = 0; // UUID or hashCode가 좋다.

// 입력받은 text를 전달받아서 새로운 DOM 요소 만들기
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `<div class="item">
                        <span class="item__name">${text}</span>
                        <button class="item__delete">
                          <i class="fas fa-trash-alt" data-id=${id}></i>
                        </button>
                      </div>
                      <div class="item__divider"></div>
                      `
  // const item = document.createElement('div');
  // item.setAttribute('class', 'item');

  // const name = document.createElement('span');
  // name.setAttribute('class', 'item__name');
  // name.innerText = text;

  // const deleteBtn = document.createElement('button');
  // deleteBtn.setAttribute('class', 'item__delete');
  // deleteBtn.innerHTML = '<i class="fas fa-trash-alt">';
  // deleteBtn.addEventListener('click', () => {
  //   items.removeChild(itemRow);
  // });

  // const itemDivider = document.createElement('div');
  // itemDivider.setAttribute('class', 'item__divider');

  // item.appendChild(name);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);
  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (e) => {
  console.log(e);
  if (e.key === 'Enter' || e.keyCode === 13) {
    onAdd();
  }
});

// event delegation
items.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
})