"use strict";
const CARROT_SIZE = 80;
let CARROT_COUNT = 10;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10; // 게임시간 - const임

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

const popup = document.querySelector(".pop-up");
const popupMessage = document.querySelector(".pop-up__message");
const popupBtn = document.querySelector(".pop-up__refresh");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined; // setInterval할당할 변수 - 전역변수로 한이유는
// 어떤 곳에서든 clearInterval(timer)로 멈출수 있게하기위해서.

field.addEventListener("click", onFieldClick);
//콜백함수 함수로처리.

function onFieldClick(event) {
  if (!started) return; // game이 시작하지않으면 빠르게 리턴하는게 중요!
  const target = event.target;
  if (target.matches(".carrot")) {
    // 선택자를 활용한 matches api가있다
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    // stopGameTimer();
    if (score === CARROT_COUNT) finishGame(true);
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

popupBtn.addEventListener("click", () => {
  startGame();
  hidePopup();
  showPlayButton();
});

gameBtn.addEventListener("click", (event) => {
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
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hidePlayButton();
  playSound(alertSound);
  showPopup("REPLAY??");
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  stopSound(bgSound);
  if (win === true) {
    playSound(winSound);
    showPopup("WIN");
    hidePlayButton();
  } else {
    playSound(bugSound);
    showPopup("LOSE");
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
function showPopup(text) {
  popupMessage.innerText = text;
  popup.classList.remove("pop-up--hide");
}
function hidePopup() {
  popup.classList.add("pop-up--hide");
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  //벌레와 당근 생성한뒤 필드에 추가
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
