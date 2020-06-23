import displayController from './displayController';

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

  const getBoard = () => board;

  const applyMove = (indx, indy) => {
    const symbol = currentPlayer.getSymbol();
    if (board[indx][indy] === ' ') {
      displayController.hideMessage();
      board[indx][indy] = symbol;
      controller.renderBoard(board);
      countMoves += 1;
      return true;
    }
    displayController.showMessage('Spot Taken');
    return false;
  };

  const checkWinStates = () => {
    let checkArray = [];
    const currentSymbol = currentPlayer.getSymbol();
    for (let i = 0; i < board.length; i += 1) {
      checkArray = [];
      for (let j = 0; j < board.length; j += 1) {
        checkArray.push(board[j][i]);
      }
      if (checkArray.every(p => p === currentSymbol)) {
        return true;
      }
    }

    for (let i = 0; i < board.length; i += 1) {
      checkArray = [];
      for (let j = 0; j < board.length; j += 1) {
        checkArray.push(board[i][j]);
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
  
  return {
    setCurrentPlayer, getBoard, applyMove, checkWinStates, clearBoard,
  };
})(displayController);

export default gameBoard;