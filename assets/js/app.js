const displayController = (() => {
  let dom_board = document.getElementById('board');
  const renderBoard = (board) => {
    let rendered_board = '';

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell_value = board[i][j];
        rendered_board += ` <div class="cell" onclick='game.applyMove(${i},${j})'>${cell_value}</div>`;
      }
    }
    dom_board.innerHTML = rendered_board;
  };

  return {
    renderBoard
  };

})();

const gameBoard = ((dController) => {
  let board = [['','',''],['','',''],['','','']];
  let controller = dController;
  let currentPlayer;
  let actualGame;
  const setCurrentPlayer = (cPlayer) => {
    currentPlayer = cPlayer;
  }
  const getBoard = () => {
    return board;
  };
  const applyMove = (indx, indy) => {
    let symbol = currentPlayer.getSymbol();
    if (board[indx][indy] === ''){
      board[indx][indy] = symbol;
      controller.renderBoard(board);
    }
    else{
      alert('Spot taken');
    }
  };
  return {setCurrentPlayer, getBoard, applyMove};
})(displayController);

const Player = (pname, psymbol) => {
  let name = pname;
  let symbol = psymbol;
  const getName = () => {
    return name;
  }
  const getSymbol = () => {
    return symbol;
  }
  return { getName, getSymbol };
}

const game = (() => {
  let player1 = Player('Player 1', 'X');
  let player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  const startGame = () => {
    displayController.renderBoard(gameBoard.getBoard());
    gameBoard.setCurrentPlayer(currentPlayer);
  }

  const changeTurn = () => {
    if(currentPlayer === player1){
      currentPlayer = player2;
    }
    else { 
      currentPlayer = player1;
    }
    gameBoard.setCurrentPlayer(currentPlayer);
  }

  const applyMove = (x,y) => {
    gameBoard.applyMove(x,y);
    changeTurn();
  }

  return {startGame, applyMove}
})();

game.startGame();
