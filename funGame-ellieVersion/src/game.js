"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
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
        this.stopGame();
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
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.CarrotCount) this.finishGame(true);
    } else if (item === "bug") {
      this.finishGame(false);
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

  stopGame() {
    this.started = false;
    this.stopGameTimer();
    this.hidePlayButton();
    sound.playAlert();
    this.callback && this.callback("REPLAY??");
    sound.stopBg();
  }
  finishGame(win) {
    this.started = false;
    this.stopGameTimer();
    sound.stopBg();
    if (win === true) {
      sound.playWin();
      this.callback && this.callback("WIN!!!");
      this.hidePlayButton();
    } else {
      sound.playBug();
      this.callback && this.callback("LOSE ㅠ.ㅠ");
      this.hidePlayButton();
    }
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
        this.finishGame(this.score === this.CarrotCount);
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
