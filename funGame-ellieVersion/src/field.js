"use strict";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(bugCount, carrotCount) {
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener("click", this.click);
  }
  setOnClickListener(setItemClick) {
    console.log("setOnClickListener");
    this.setItemClick = setItemClick;
    console.log("setOnClickListener finish");
  }
  click(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      console.log(this.setItemClick); //?? 왜 undefined?
      this.setItemClick && this.setItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.setItemClick && this.setItemClick("bug");
    }
  }
  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
