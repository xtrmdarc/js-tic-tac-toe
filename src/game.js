import GameBoard from './gameBoard';
import Player from './player';
import DisplayController from './displayController';

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOn = false;
  const message = document.getElementById('message');

  const startGame = (player1name, player2name) => {
    player1 = Player(player1name, 'X');
    player2 = Player(player2name, 'O');
    currentPlayer = player1;
    GameBoard.clearBoard();
    message.style = 'display: none';
    gameOn = true;
    DisplayController.renderBoard(GameBoard.getBoard());
    GameBoard.setCurrentPlayer(currentPlayer);
  };

  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    GameBoard.setCurrentPlayer(currentPlayer);
  };

  const handleWinStates = () => {
    switch (GameBoard.checkWinStates()) {
      case true: {
        gameOn = false;
        message.innerText = `${currentPlayer.getName()} Wins! Click start to play again`;
        message.style = 'display: block';
        break;
      }
      case 'Tie': {
        gameOn = false;
        message.innerText = 'It is a tie! Click start to play again';
        message.style = 'display: block';
        break;
      }
      default: {
        break;
      }
    }
  };

  const applyMove = (x, y) => {
    if (gameOn === false) {
      return false;
    }
    if (GameBoard.applyMove(x, y) === true) {
      handleWinStates();
      changeTurn();
      return true;
    }
  };
  return { startGame, applyMove };
})();

export default game;