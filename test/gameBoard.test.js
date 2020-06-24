import Mock from './mock';
import GameBoard from '../src/gameBoard';
import Player from '../src/player';

const player1 = Player('Diego', 'X');
const player2 = Player('Brenda', 'O');

test('It should return empty board for to start the game', () => {
  expect(GameBoard.getBoard()).toEqual([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
});

test('It should return the actual board after players make their movement', () => {
  GameBoard.clearBoard();
  GameBoard.setCurrentPlayer(player1);
  GameBoard.applyMove(0, 0);
  GameBoard.setCurrentPlayer(player2);
  GameBoard.applyMove(1, 0);
  expect(GameBoard.getBoard()).toEqual([['X', ' ', ' '], ['O', ' ', ' '], [' ', ' ', ' ']]);
});

test('It should return the symbol of the player on the board after the movement', () => {
  GameBoard.clearBoard();
  GameBoard.setCurrentPlayer(player1);
  GameBoard.applyMove(0, 0);
  expect(GameBoard.getBoard()[0][0]).toEqual('X');
});

test('It should return false if the desired movement cell is already taken', () => {
  GameBoard.clearBoard();
  GameBoard.setCurrentPlayer(player1);
  GameBoard.applyMove(0, 0);
  GameBoard.setCurrentPlayer(player2);
  expect(GameBoard.applyMove(0, 0)).toBe(false);
});

test('It should return true if the desired movement cell is available', () => {
  GameBoard.clearBoard();
  GameBoard.setCurrentPlayer(player1);
  GameBoard.applyMove(0, 0);
  GameBoard.setCurrentPlayer(player2);
  expect(GameBoard.applyMove(1, 0)).toBe(true);
});

test('It should return true if the player one wins with a horizontal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockHorizontalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should return true if the player one wins with a vertical 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockVerticalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should return true if the player one wins with a diagonal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockDiagonalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should return true if the player one wins with a reverse diagonal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockReverseDiagonalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should return false if there is no winner', () => {
  GameBoard.clearBoard();
  GameBoard.setCurrentPlayer(player1);
  GameBoard.applyMove(0,0);
  expect(GameBoard.checkWinStates()).toBe(false);
});

test('It should return tie if no one won after all movements have been placed', () => {
  GameBoard.clearBoard();
  Mock.mockTie(player1, player2, GameBoard);
  expect(GameBoard.checkWinStates()).toBe('Tie');
});

test('It should return a empty board after players make their movement and the gets cleared', () => {
  Mock.mockDiagonalWin(player1, GameBoard);
  GameBoard.clearBoard();
  expect(GameBoard.getBoard()).toEqual([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
});

test('It should return to 0 moves after players make their movement and the gets cleared', () => {
  Mock.mockDiagonalWin(player1, GameBoard);
  GameBoard.clearBoard();
  expect(GameBoard.getMoves()).toEqual(0);
});

test('It should return to 1 move after player make the first move', () => {
  GameBoard.clearBoard();
  GameBoard.applyMove(0, 0);
  expect(GameBoard.getMoves()).toEqual(1);
});