import PopUp from "./popup.js";
import GameBuilder from "./game.js";

("use strict");

const finishGameBanner = new PopUp();
// const gameofmain = new Game(3, 2, 2);
// 생성자인자로 숫자만있어 이게 뭘의미하는지 알기힘들어. 그리고
//인자가 세개가 넘어가면 좋지않아. 그러므로 빌더패턴을 이용해보자
// builder pattern
const game = new GameBuilder()
  .withDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

finishGameBanner.setClickListener(() => {
  game.startGame();
  game.showPlayButton();
});

game.setGameListener((text) => {
  finishGameBanner.show(text);
});
