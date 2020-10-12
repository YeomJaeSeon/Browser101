"use strict";

const playBtn = document.querySelector(".playBtn");
const monsters = document.querySelector(".monsters");
const count = document.querySelector(".count");
const timer = document.querySelector(".timer");
const alertBox = document.querySelector(".alert");
const replayBtn = document.querySelector(".replayBtn");
const message = document.querySelector("h1");

// 소리
const alertSound = new Audio("./sound/alert.wav");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const bgSound = new Audio("./sound/bg.mp3");

let start; //setInterval clearInterval을 위한 전역 변수
let timerCount = 10; //제한시간 전역변수로 설정

// timer 함수 10초 지나면 멈춤
const timerFunction = () => {
  start = setInterval(() => {
    bgSound.play();
    timer.innerText = `0:${timerCount}`;
    --timerCount;
    if (timerCount === -1) {
      message.innerText = "Time out!!!";
      createAlertBox();
      alertSound.play();
      timerCount = 10;
    }
  }, 1000);
};

//벌레 당근 재배치
const rePosition = () => {
  monsters.innerHTML = `
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/bug.png" alt="" class="bug">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">
  <img src="./img/carrot.png" alt="" class="carrot">      
  <img src="./img/carrot.png" alt="" class="carrot">
  `;
  for (let i = 0; i < monsters.children.length; i++) {
    // 벌레 당근은 x : 650px이내, y : 180px이내 존재해야함
    let randomX = getRandomInt(0, 650);
    let randomY = getRandomInt(0, 180);

    // 벌레 당근 z-index가 달라야 게임할맛이 나지
    let zIndex = getRandomInt(0, 3);

    monsters.children[i].setAttribute(
      "style",
      `transform:translate(${randomX}px, ${randomY}px); z-index:${zIndex}`
    );
  }
};

// play 버튼 클릭
playBtn.addEventListener("click", () => {
  // 재생버튼일 때
  if (playBtn.children[0].className === "fas fa-play playBtn__play") {
    timerFunction();
    rePosition();
  }

  // stop 버튼 누름
  if (playBtn.children[0].className === "fas fa-square playBtn__stop") {
    alertSound.play();
    playBtn.setAttribute("style", "opacity : 0");
    message.innerText = "STOP!!!";
    createAlertBox();
  }

  // 처음 play button누르고 stop버튼으로 변함
  playBtn.children[0].remove();
  playBtn.innerHTML = '<i class="fas fa-square playBtn__stop"></i>';
});

// replay 버튼 클릭(처음부터 다시재생임)
replayBtn.addEventListener("click", () => {
  deleteAlertBox();
  playBtn.setAttribute("style", "opacity : 1");
  rePosition();
  timerCount = 10;
  timerFunction();
});

// 벌레 당근 position random 함수
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

monsters.addEventListener("click", (event) => {
  // 당근클릭
  if (event.target.className === "carrot") {
    carrotSound.play();
    event.target.remove();
    count.innerText = carrotCount();
    if (carrotCount() === 0) {
      message.innerText = "SUCCESS!!!";
      createAlertBox();
      winSound.play();
    }
  }
  // bug클릭
  if (event.target.className === "bug") {
    bugSound.play();
    message.innerText = "Oops,, Bug!!";
    createAlertBox();
  }
});

// 남은 당근개수 함수
const carrotCount = () => {
  const carrot = document.querySelectorAll(".carrot");
  return carrot.length;
};

// alertBox 생성
const createAlertBox = () => {
  alertBox.classList.remove("invisible");
  clearInterval(start); //alertBox 생성되면 시간 멈춰야함
  bgSound.pause();
};

// alertBox삭제
const deleteAlertBox = () => {
  alertBox.classList.add("invisible");
};
