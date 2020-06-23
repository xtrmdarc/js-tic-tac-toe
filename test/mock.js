const mockHtml = (() => {
  const initializeDOM = () => {
    document.body.innerHTML = `<main>
      <div id="board">
      </div>
      <span id="message"></span>
      <div class="form">
        <div>
          <span>Player 1: </span>
          <input type="text" name="p1name" id="p1name">
        </div>
        <div>
          <span>Player 2: </span>
          <input type="text" name="p1name" id="p2name">
        </div>
        <input type="button" value="Start" id="startgame">
      </div>
    </main>`;
  };

  initializeDOM();

  const mockHorizontalWin = (player, board) => {
    board.setCurrentPlayer(player);
    board.applyMove(0, 0);
    board.applyMove(0, 1);
    board.applyMove(0, 2);
  };

  const mockVerticalWin = (player, board) => {
    board.setCurrentPlayer(player);
    board.applyMove(0, 0);
    board.applyMove(1, 0);
    board.applyMove(2, 0);
  };

  const mockDiagonalWin = (player, board) => {
    board.setCurrentPlayer(player);
    board.applyMove(0, 0);
    board.applyMove(1, 1);
    board.applyMove(2, 2);
  };

  const mockReverseDiagonalWin = (player, board) => {
    board.setCurrentPlayer(player);
    board.applyMove(0, 0);
    board.applyMove(1, 1);
    board.applyMove(2, 2);
  };

  return {
    initializeDOM,
    mockHorizontalWin,
    mockVerticalWin,
    mockDiagonalWin,
    mockReverseDiagonalWin,
  };
})();

export default mockHtml;