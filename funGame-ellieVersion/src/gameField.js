"use strict";

export default class Field {
  constructor(score, CARROT_COUNT) {
    this.CARROT_COUNT = CARROT_COUNT;
    this.score = score;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.CARROT_SIZE = 80;

    this.field.addEventListener("click", (event) => {
      // if (!this.started) return; --- 어떡게.?
      // started는 계속 변하는값이다. 그런데 어떻게 변하는 값을
      //받지? 고정된값 말고? 이 클래스에서?
      const target = event.target;
      if (target.matches(".carrot")) {
        target.remove();
        this.score++;
        this.callback && this.callback();
        if (this.score === this.CARROT_COUNT) {
          this.win && this.win();
        }
      } else if (target.matches(".bug")) {
        this.lose && this.lose();
      }
    });
  }
  addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - this.CARROT_SIZE;
    const y2 = this.fieldRect.height - this.CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = this.randomNumber(x1, x2);
      const y = this.randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  clickCarrot(callback) {
    this.callback = callback;
  }
  finishWin(win) {
    this.win = win;
  }
  finishLose(lose) {
    this.lose = lose;
  }
}
