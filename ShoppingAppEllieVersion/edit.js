const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
  //1. 사용자가 입력한 텍스트를 받아와야함!
  const text = input.value;
  if (text === "") {
    input.focus();
    // focus를 안주면 아래에서 정의한 focus까지 도달하지않고
    // early exit을한다. 그리고 +버튼 클릭하면 input에있던 focus
    // 가 +버튼으로 옮겨진다.!
    return;
  }
  //2. 새로운 아이템을 만든다!(텍스트 + 삭제버튼)
  const item = createItem(text);

  //3. items 컨테이너 안에 새로 만든 아이템을 추가한다
  items.appendChild(item);

  //4. 새로 추가된 item으로 scrolling
  item.scrollIntoView({ block: "center" });

  //5. input 초기화
  input.value = "";
  input.focus(); //focus를 안주면 input태그에 focus가 안온다
}

let nextId = 0;
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute('data-id', nextId)

  itemRow.innerHTML = `
     <div class="item">
        <span class="item__name">${text}</span>
         <button class="item__delete">
             <i class="fas fa-trash-alt" data-id=${nextId}></i>
        </button>
    </div>
    <div class="item__divider"></div>
  `;
  ++nextId;
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

items.addEventListener('click', (event)=>{
  const id = event.target.dataset.id;
    if(id){
      // event.target.dataset.id가 존재하면! 이라는 조건문임
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
})