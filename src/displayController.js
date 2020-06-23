import game from './game';

const displayController = (() => {
  const domBoard = document.getElementById('board');
  const message = document.getElementById('message');

  const renderBoard = (board) => {
    let renderedBoard = '';
    domBoard.innerHTML = '';
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        const cellValue = board[i][j];
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellValue;
        cell.addEventListener('click', () => {
          game.applyMove(i, j);
        });
        domBoard.appendChild(cell);
      }
    }
  };

  const hideMessage = () => {
    message.style.display = 'none';
  }

  const showMessage = (msg) => {
    message.style.display = 'block';
    message.textContent = msg;
  }

  return {
    renderBoard,
    hideMessage,
    showMessage,
  };
})();

export default displayController;