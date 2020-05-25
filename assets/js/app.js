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
  let countMoves = 0;

  const setCurrentPlayer = (cPlayer) => {
    currentPlayer = cPlayer;
  }

  const getBoard = () => {
    return board;
  }

  const applyMove = (indx, indy) => {
    let symbol = currentPlayer.getSymbol();
    if (board[indx][indy] === ''){
      board[indx][indy] = symbol;
      controller.renderBoard(board);
      countMoves++;
      return true;
    }
    else{
      alert('Spot taken');
    }
  }
  
  const checkWinStates = () => {
    let won = false;
    let check_array = [];
    for (let i = 0; i < board.length; i++) {
      check_array = [];
      for (let j = 0; j < board.length; j++) {
        check_array.push(board[j][i]); // 0,0 1,0 2,0
      }
      if(check_array.every(p => p === currentPlayer.getSymbol())) {
        return true;
      }
    }

    for (let i = 0; i < board.length; i++) {
      check_array = [];
      for (let j = 0; j < board.length; j++) {
        check_array.push(board[i][j]); // 0,0 1,0 2,0
      }
      if(check_array.every(p => p === currentPlayer.getSymbol())) {
        return true;
      }
    }

    check_array = [];
    for (let i = 0; i < board.length; i++) {
      check_array.push(board[i][i]);
    }
    if(check_array.every(p => p === currentPlayer.getSymbol())) {
      return true;
    }

    check_array = [];
    for (let i = 0; i < board.length; i++) {
      check_array.push(board[i][board.length-1-i]);
    }
    if(check_array.every(p => p === currentPlayer.getSymbol())) {
      return true;
    }

    if(countMoves === board.length*board.length){
      return 'Tie';
    }
  }

  return {setCurrentPlayer, getBoard, applyMove, checkWinStates};
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

  const handleWinStates = () => {
    switch(gameBoard.checkWinStates()) {
      case true : {
        alert('gano el player ' + currentPlayer.getName());
        break;
      }
      case 'Tie' : {
        alert("It's a tie !");
        break;
      }
      
    }
  }

  const applyMove = (x,y) => {
    if(gameBoard.applyMove(x,y) == true)
    {
      handleWinStates();
      changeTurn();
    }
    
  }

  return {startGame, applyMove}
})();

game.startGame();
