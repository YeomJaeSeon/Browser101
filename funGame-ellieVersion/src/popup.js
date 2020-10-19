"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".pop-up");
    this.popupMessage = document.querySelector(".pop-up__message");
    this.popupBtn = document.querySelector(".pop-up__refresh");
    this.popupBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popup.classList.add("pop-up--hide");
  }
  show(text) {
    this.popupMessage.innerText = text;
    this.popup.classList.remove("pop-up--hide");
  }
}
