"use strict";

import { Field, Item } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  cancel: "cancel",
  win: "win",
  lose: "lose",
});

export class GameBuilder {
  withDuration(duration) {
    this.duration = duration;
    return this;
  }
  withCarrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }
  withBugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }
  build() {
    return new Game(this.duration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(GameDuration, CarrotCount, BugCount) {
    this.GameDuration = GameDuration;
    this.CarrotCount = CarrotCount;
    this.BugCount = BugCount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn = document.querySelector(".game__button");
    this.gameScore = document.querySelector(".game__score");
    this.gameTimer = document.querySelector(".game__timer");

    //생성자에서 이벤트리스너 등록해야 객체 생성하자마자 바로
    //이벤트리스너 생성된다!
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.startGame();
      }
    });

    this.gameField = new Field(
      this.BugCount,
      this.CarrotCount,
      () => this.started
    );
    this.itemClick = this.itemClick.bind(this);
    this.gameField.setOnClickListener(this.itemClick);
  }
  itemClick(item) {
    if (item === Item.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.CarrotCount) this.stop(Reason.win);
    } else if (item === Item.bug) {
      this.stop(Reason.lose);
    }
  }
  updateScoreBoard() {
    this.gameScore.innerText = this.CarrotCount - this.score;
  }
  startGame() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBg();
  }
  setGameListener(callback) {
    this.callback = callback;
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hidePlayButton();

    this.callback && this.callback(reason);
  }
  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }
  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }
  startGameTimer() {
    let remainTimers = this.GameDuration;
    this.upDateTimerText(remainTimers);
    this.timer = setInterval(() => {
      if (remainTimers <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      } else {
        this.upDateTimerText(--remainTimers);
      }
    }, 1000);
  }
  upDateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }
  hidePlayButton() {
    this.gameBtn.style.visibility = "hidden";
  }
  showPlayButton() {
    this.gameBtn.style.visibility = "visible";
  }
  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.CarrotCount;
    this.gameField.init();
  }
}
