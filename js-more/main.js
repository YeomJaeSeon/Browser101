"use strict";

class Counter {
  constructor(callback) {
    this.counter = 0;
    this.callback = callback;
  }
  increase() {
    ++this.counter;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      this.callback && this.callback(this.counter);
    }
  }
}

const printCounter = new Counter(printWow);
const alertCounter = new Counter(alertWow);
function printWow(num) {
  console.log("Wow!!" + num);
}
function alertWow(num) {
  alert("Wow!!" + num);
}
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();

alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();

// 클래스라는 것은 완전한 걸로 만드는게아닌
// 콜백함수를 이용해서재사용성을 높일수 있는 틀이어야한다!!!
// 이게중요함!
