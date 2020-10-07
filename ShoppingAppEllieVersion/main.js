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

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const span = document.createElement("span");
  span.setAttribute("class", "item__name");
  span.innerText = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "item__delete");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item__divider");

  item.appendChild(span);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

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
