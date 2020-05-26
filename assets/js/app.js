const displayController = (() => {
  const domBoard = document.getElementById('board');
  const renderBoard = (board) => {
    let renderedBoard = '';

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        const cellValue = board[i][j];
        renderedBoard += ` <div class="cell" onclick='game.applyMove(${i},${j})'>${cellValue}</div>`;
      }
    }
    domBoard.innerHTML = renderedBoard;
  };

  return {
    renderBoard
  };
})();

const gameBoard = ((dController) => {
  let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  const controller = dController;
  let currentPlayer;
  let countMoves = 0;

  const setCurrentPlayer = (cPlayer) => {
    currentPlayer = cPlayer;
  };

  const clearBoard = () => {
    board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    countMoves = 0;
  };
  const getBoard = () => {
    return board;
  };

  const applyMove = (indx, indy) => {
    const symbol = currentPlayer.getSymbol();
    if (board[indx][indy] === '') {
      board[indx][indy] = symbol;
      controller.renderBoard(board);
      countMoves += 1;
      return true;
    }
    alert('Spot taken');
    return false;
  };

  const checkWinStates = () => {
    let checkArray = [];
    const currentSymbol = currentPlayer.getSymbol();
    for (let i = 0; i < board.length; i += 1) {
      checkArray = [];
      for (let j = 0; j < board.length; j += 1) {
        checkArray.push(board[j][i]); // 0,0 1,0 2,0
      }
      if (checkArray.every(p => p === currentSymbol)) {
        return true;
      }
    }

    for (let i = 0; i < board.length; i += 1) {
      checkArray = [];
      for (let j = 0; j < board.length; j += 1) {
        checkArray.push(board[i][j]); // 0,0 1,0 2,0
      }
      if (checkArray.every(p => p === currentSymbol)) {
        return true;
      }
    }

    checkArray = [];
    for (let i = 0; i < board.length; i += 1) {
      checkArray.push(board[i][i]);
    }
    if (checkArray.every(p => p === currentSymbol)) {
      return true;
    }

    checkArray = [];
    for (let i = 0; i < board.length; i += 1) {
      checkArray.push(board[i][board.length - 1 - i]);
    }
    if (checkArray.every(p => p === currentSymbol)) {
      return true;
    }

    if (countMoves === board.length * board.length) {
      return 'Tie';
    }
    return false;
  };
  return { setCurrentPlayer, getBoard, applyMove, checkWinStates, clearBoard };
})(displayController);

const Player = (pname, psymbol) => {
  const name = pname;
  const symbol = psymbol;
  const getName = () => {
    return name;
  };
  const getSymbol = () => {
    return symbol;
  };
  return { getName, getSymbol };
};

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;

  const startGame = (player1name, player2name) => {
    player1 = Player(player1name, 'X');
    player2 = Player(player2name, 'O');
    currentPlayer = player1;
    gameBoard.clearBoard();

    displayController.renderBoard(gameBoard.getBoard());
    gameBoard.setCurrentPlayer(currentPlayer);
  };

  const startButton = () => {
    const player1name = document.getElementById('p1name').value;
    const player2name = document.getElementById('p2name').value;
    game.startGame(player1name, player2name);
  };

  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    gameBoard.setCurrentPlayer(currentPlayer);
  };

  const handleWinStates = () => {
    switch (gameBoard.checkWinStates()) {
      case true: {
        alert(`${currentPlayer.getName()} Wins! Click start to play again`);
        break;
      }
      case 'Tie': {
        alert("It's a tie ! Click start to play again");
        break;
      }
      default: {
        break;
      }
    }
  };

  const applyMove = (x, y) => {
    if (gameBoard.applyMove(x, y) === true) {
      handleWinStates();
      changeTurn();
    }
  };

  return { startGame, applyMove };
})();

game.startGame();
