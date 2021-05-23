'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
// Build Pattern의 장점: 어떤 값을 설정하는지 알아보기 쉽다.
const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(7)
  .bugCount(5)
  .build();

game.setGameStopListener((reason) => {
  console.log(`result: ${reason}`);
  let message;

  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY❓';
      break;
    case Reason.win:
      message = 'YOU WIN 🎉';
      break;
    case Reason.lose:
      message = 'YOU LOST 💩';
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});