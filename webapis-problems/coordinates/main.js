const target = document.querySelector(".position");
const vertical = document.querySelector(".vertical");
const horizon = document.querySelector(".horizon");
const targetImg = document.querySelector(".target");

// 문서 즉, document위에서 마우스움직일거닌까 document로. window도되긴해.
document.addEventListener("mousemove", (event) => {
  // 반복되는 event.clientX, Y : 변수로 지정하면 번거롭게 안써도된다
  const x = event.clientX;
  const y = event.clientY;

  targetImg.style.top = `${y}px`;
  targetImg.style.left = `${x}px`;
  target.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.innerHTML = `${x}px, ${y}px`;
  vertical.style.left = `${x}px`;
  horizon.style.top = `${y}px`;
});
