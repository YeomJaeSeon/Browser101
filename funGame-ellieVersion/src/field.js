"use strict";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(bugCount, carrotCount, isGamming) {
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;
    this.isGamming = isGamming;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener("click", this.click);
    // click메소드를 콜백함수로 전달하면 click메소드의 this는 컨텍스트 대상을 잃게된다
    //즉, click메소드의 this.setItemClick에서의 this는 Field클래스를 나타내는데
    // 콜백함수로 click메소드를 전달하면 Field 클래스(this)와 click메소드와 연결이 되어있게되지않는다는 것이다
    // 그러므로 this(Field클래스)와 click메소드를 묶어줄 바인딩하는 과정이필요하다!
  }
  setOnClickListener(setItemClick) {
    this.setItemClick = setItemClick;
  }
  click = (event) => {
    if (!this.isGamming()) return;
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.setItemClick && this.setItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.setItemClick && this.setItemClick("bug");
    }
  };
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
