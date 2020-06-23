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

test('It should true if the player one wins with a horizontal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockHorizontalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should true if the player one wins with a vertical 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockVerticalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should true if the player one wins with a diagonal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockDiagonalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should true if the player one wins with a reverse diagonal 3-in-a-row', () => {
  GameBoard.clearBoard();
  Mock.mockReverseDiagonalWin(player1, GameBoard);
  expect(GameBoard.checkWinStates()).toBe(true);
});

test('It should return a empty board after players make their movement and the gets cleared', () => {
  Mock.mockDiagonalWin(player1, GameBoard);
  GameBoard.clearBoard();
  expect(GameBoard.getBoard()).toEqual([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
});