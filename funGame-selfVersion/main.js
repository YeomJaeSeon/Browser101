"use strict";

const playBtn = document.querySelector(".playBtn");
const monsters = document.querySelector(".monsters");
const count = document.querySelector(".count");
const timer = document.querySelector(".timer");
const alertBox = document.querySelector(".alert");
const replayBtn = document.querySelector(".replayBtn");

let start; //setInterval clearInterval을 위한 전역 변수
let timerCount = 10; //제한시간 전역변수로 설정

// timer 함수 10초 지나면 멈춤
const timerFunction = () => {
  start = setInterval(() => {
    timer.innerText = `0:${timerCount}`;
    --timerCount;
    if (timerCount === -1) {
      clearInterval(start);

      timerCount = 10;
    }
  }, 1000);
};

// play 버튼 클릭
playBtn.addEventListener("click", (e) => {
  // 재생버튼일 때
  if (playBtn.children[0].className === "fas fa-play playBtn__play") {
    timerFunction();
    for (let i = 0; i < monsters.children.length; i++) {
      monsters.children[i].classList.remove("invisible");
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
  }

  // stop 버튼 누름
  if (playBtn.children[0].className === "fas fa-square playBtn__stop") {
    clearInterval(start);
    playBtn.setAttribute("style", "opacity : 0");
    alertBox.classList.remove("invisible");
  }

  // 처음 play button누르고 stop버튼으로 변함
  playBtn.children[0].remove();
  playBtn.innerHTML = '<i class="fas fa-square playBtn__stop"></i>';
});

// 멈췄다가 다시 재생
replayBtn.addEventListener("click", () => {
  alertBox.classList.add("invisible");
  playBtn.setAttribute("style", "opacity : 1");
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
  if (event.target.className === "carrot") {
    event.target.remove();
    count.innerText = carrotCount();
  }
  if (event.target.className === "bug") {
    event.target.remove();
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
};
