import './css/styles.css';
import Player from './player';
import gameBoard from './gameBoard';
import displayController from './displayController';
import game from './game';

// const displayController = (() => {
//   const domBoard = document.getElementById('board');
//   const renderBoard = (board) => {
//     let renderedBoard = '';
//     domBoard.innerHTML = '';
//     for (let i = 0; i < board.length; i += 1) {
//       for (let j = 0; j < board[i].length; j += 1) {
//         const cellValue = board[i][j];
//         const cell = document.createElement('div');
//         cell.classList.add('cell');
//         cell.textContent = cellValue;
//         cell.addEventListener('click', () => {
//           game.applyMove(i,j);
//         });
//         domBoard.appendChild(cell);
//       }
//     }
//   };
//   return {
//     renderBoard,
//   };
// })();

// const gameBoard = ((dController) => {
//   let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
//   const controller = dController;
//   let currentPlayer;
//   let countMoves = 0;
//   const message = document.getElementById('message');

//   const setCurrentPlayer = (cPlayer) => {
//     currentPlayer = cPlayer;
//   };

//   const clearBoard = () => {
//     board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
//     countMoves = 0;
//   };
//   const getBoard = () => board;

//   const applyMove = (indx, indy) => {
//     const symbol = currentPlayer.getSymbol();
//     if (board[indx][indy] === ' ') {
//       message.style = 'display: none';
//       board[indx][indy] = symbol;
//       controller.renderBoard(board);
//       countMoves += 1;
//       console.log(currentPlayer.getName());
//       return true;
//     }
//     message.innerText = 'Spot taken';
//     message.style = 'display: block';
//     return false;
//   };

//   const checkWinStates = () => {
//     let checkArray = [];
//     const currentSymbol = currentPlayer.getSymbol();
//     for (let i = 0; i < board.length; i += 1) {
//       checkArray = [];
//       for (let j = 0; j < board.length; j += 1) {
//         checkArray.push(board[j][i]); 
//       }
//       if (checkArray.every(p => p === currentSymbol)) {
//         return true;
//       }
//     }

//     for (let i = 0; i < board.length; i += 1) {
//       checkArray = [];
//       for (let j = 0; j < board.length; j += 1) {
//         checkArray.push(board[i][j]);
//       }
//       if (checkArray.every(p => p === currentSymbol)) {
//         return true;
//       }
//     }

//     checkArray = [];
//     for (let i = 0; i < board.length; i += 1) {
//       checkArray.push(board[i][i]);
//     }
//     if (checkArray.every(p => p === currentSymbol)) {
//       return true;
//     }

//     checkArray = [];
//     for (let i = 0; i < board.length; i += 1) {
//       checkArray.push(board[i][board.length - 1 - i]);
//     }
//     if (checkArray.every(p => p === currentSymbol)) {
//       return true;
//     }

//     if (countMoves === board.length * board.length) {
//       return 'Tie';
//     }
//     return false;
//   };
//   return {
//     setCurrentPlayer, getBoard, applyMove, checkWinStates, clearBoard,
//   };
// })(displayController);

// const game = (() => {
//   let player1;
//   let player2;
//   let currentPlayer;
//   let gameOn = false;
//   const message = document.getElementById('message');

//   const startGame = (player1name, player2name) => {
//     player1 = Player(player1name, 'X');
//     player2 = Player(player2name, 'O');
//     currentPlayer = player1;
//     gameBoard.clearBoard();
//     message.style = 'display: none';
//     gameOn = true;
//     displayController.renderBoard(gameBoard.getBoard());
//     gameBoard.setCurrentPlayer(currentPlayer);
//   };

//   const changeTurn = () => {
//     if (currentPlayer === player1) {
//       currentPlayer = player2;
//     } else {
//       currentPlayer = player1;
//     }
//     gameBoard.setCurrentPlayer(currentPlayer);
//   };

//   const handleWinStates = () => {
//     switch (gameBoard.checkWinStates()) {
//       case true: {
//         gameOn = false;
//         message.innerText = `${currentPlayer.getName()} Wins! Click start to play again`;
//         message.style = 'display: block';
//         break;
//       }
//       case 'Tie': {
//         gameOn = false;
//         message.innerText = 'It is a tie! Click start to play again';
//         message.style = 'display: block';
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   };

//   const applyMove = (x, y) => {
//     if (gameOn === false) {
//       return;
//     }
//     if (gameBoard.applyMove(x, y) === true) {
//       handleWinStates();
//       changeTurn();
//     }
//   };
//   return { startGame, applyMove };
// })();

document.querySelector('#startgame').addEventListener('click', () => {
  const player1name = document.getElementById('p1name').value;
  const player2name = document.getElementById('p2name').value;
  game.startGame(player1name, player2name);
});