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
  let countMoves = 0;

  const setCurrentPlayer = (cPlayer) => {
    currentPlayer = cPlayer;
  }

  const clearBoard = () => {
    board = [['', '', ''],['', '', ''],['', '', '']];
    countMoves = 0;
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

  return {setCurrentPlayer, getBoard, applyMove, checkWinStates, clearBoard};
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

const startButton = () => {
  let player1name = document.getElementById('p1name').value;
  let player2name = document.getElementById('p2name').value;
  game.startGame(player1name, player2name);
}

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
        alert(currentPlayer.getName() + 'Wins! Click start to play again');
        break;
      }
      case 'Tie' : {
        alert("It's a tie ! Click start to play again");
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
