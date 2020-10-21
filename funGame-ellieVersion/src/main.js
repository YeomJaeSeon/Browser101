import PopUp from "./popup.js";
import Game from "./game.js";

("use strict");

const finishGameBanner = new PopUp();
const gameofmain = new Game(3, 2, 2);

finishGameBanner.setClickListener(() => {
  gameofmain.startGame();
  gameofmain.showPlayButton();
});

gameofmain.setGameListener((text) => {
  finishGameBanner.show(text);
});
