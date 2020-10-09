"use strict";

const playBtn = document.querySelector(".playBtn");
const monsters = document.querySelector(".monsters");

playBtn.addEventListener("click", (e) => {
  for (let i = 0; i < monsters.children.length; i++) {
    monsters.children[i].classList.remove("invisible");
    console.log(Math.random());
  }
});
