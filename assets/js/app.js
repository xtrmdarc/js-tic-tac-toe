const game = (() => {
  // methods

})();

const displayController = (() => {
  let dom_board = document.getElementById('board');
  const renderBoard = (board) => {
    let rendered_board = '';

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell_value = board[i][j];
        rendered_board += ` <div class="cell">${cell_value}</div>`;
      }
    }
    dom_board.innerHTML = rendered_board;
  };

  return {
    renderBoard
  };

})();

const gameBoard = (() => {
  let board = [['X','O','X'],['','X','O'],['','X','O']];
  const getBoard = () => {
    return board;
  };
  return {getBoard};
})();

const Player = () => {
  let name;
  let symbol;
  return {};
}

displayController.renderBoard(gameBoard.getBoard());
