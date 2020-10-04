const target = document.querySelector(".position");
const vertical = document.querySelector(".vertical");
const horizon = document.querySelector(".horizon");
const targetImg = document.querySelector(".target");

// 이미지가 로드되기전에 해당 변수에 getBoundingClientRect값이 할당되면
//안되므로 모든 리소스가 load되어지고 변수에 값할당되고 mousemove이벤트 발생하면
// 실행되도록 하자!
addEventListener("load", () => {
  const targetSize = targetImg.getBoundingClientRect();
  const targetWidth = targetSize.width / 2;
  const targetHeight = targetSize.height / 2;

  // 문서 즉, document위에서 마우스움직일거닌까 document로. window도되긴해.
  document.addEventListener("mousemove", (event) => {
    // 반복되는 event.clientX, Y : 변수로 지정하면 번거롭게 안써도된다
    const x = event.clientX;
    const y = event.clientY;

    targetImg.style.transform = `translate(${x - targetWidth}px, ${
      y - targetHeight
    }px)`;
    target.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
    vertical.style.transform = `translateX(${x}px)`;
    horizon.style.transform = `translateY(${y}px)`;

    target.innerHTML = `${x}px, ${y}px`;
  });
});
