"use strict";
const list = document.querySelector(".list");
const input = document.querySelector(".input");

// item 추가
let nextId = 0;
const add = () => {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
  <span>${input.value}</span>
    <button data-filter="trash" class="item__remove"><i class="fas fa-trash-alt" id=${++nextId}></i></button>
  `;
  newItem.setAttribute("class", "list__item");
  list.appendChild(newItem);
  input.value = "";
};

// item 삭제
const remove = (e) => {
  for (let i = 0; i < list.children.length; i++) {
    if (e.target.id === list.children[i].children[1].children[0].id) {
      list.removeChild(list.children[i]);
    }
  }
};
//enter keydown
input.addEventListener("keydown", (e) => {
  if (input.value === "") return;
  if (e.keyCode === 13) {
    add();
  }
});

//plus Btn click
const plusBtn = document.querySelector(".btn__plus");
plusBtn.addEventListener("click", () => {
  if (input.value === "") return;
  add();
});

// click trash btn
list.addEventListener("click", (e) => {
  if (e.target.className !== "fas fa-trash-alt") return;
  remove(e);
});
