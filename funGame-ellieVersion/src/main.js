import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

("use strict");

let CARROT_COUNT = 10;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10; // 게임시간 - const임

const gameBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

let started = false;
let score = 0;
let timer = undefined; // setInterval할당할 변수 - 전역변수로 한이유는
// 어떤 곳에서든 clearInterval(timer)로 멈출수 있게하기위해서.

const finishGameBanner = new PopUp();
finishGameBanner.setClickListener(() => {
  startGame();
  showPlayButton();
});

const gameField = new Field(BUG_COUNT, CARROT_COUNT);
gameField.setOnClickListener(itemClick);

function itemClick(item) {
  if (!started) return;
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) finishGame(true);
  } else if (item === "bug") {
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBg();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hidePlayButton();
  sound.playAlert();
  finishGameBanner.show("REPLAY??");
  sound.stopBg();
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  sound.stopBg();
  if (win === true) {
    sound.playWin();
    finishGameBanner.show("WIN");
    hidePlayButton();
  } else {
    sound.playBug();
    finishGameBanner.show("LOSE");
    hidePlayButton();
  }
}

//startGame
function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}
function startGameTimer() {
  let remainTimers = GAME_DURATION_SEC;
  upDateTimerText(remainTimers);
  timer = setInterval(() => {
    if (remainTimers <= 0) {
      clearInterval(timer);
      finishGame(score === CARROT_COUNT);
      return;
    } else {
      upDateTimerText(--remainTimers);
    }
  }, 1000);
}

function upDateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

//stopGame
function stopGameTimer() {
  clearInterval(timer);
}
function hidePlayButton() {
  gameBtn.style.visibility = "hidden";
}
function showPlayButton() {
  gameBtn.style.visibility = "visible";
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}
