/* eslint-disable */
import Mock from './mock';
import Game from '../src/game';
import GameBoard from '../src/gameBoard';
import Player from '../src/player';
/* eslint-enable */
const player1 = Player('Diego', 'X');
const player2 = Player('Brenda', 'O');

test('It should be false if the game has not started', () => {
  expect(Game.getGameStatus()).toBe(false);
});

test('It should return false if the game does not start and try to apply a move', () => {
  expect(Game.applyMove(0, 0)).toBe(false);
});

test('It should return true if the game starts correctly', () => {
  Game.startGame(player1, player2);
  expect(Game.getGameStatus()).toBe(true);
});

test('It should return true if the game starts correctly and the player applies a move', () => {
  Game.startGame(player1, player2);
  expect(Game.applyMove(0, 1)).toBe(true);
});

test('It should return the name of the player1 if the game starts', () => {
  Game.startGame(player1, player2);
  expect((Game.getCurrentPlayer()).getName().getName()).toEqual(player1.getName());
});

test('It should return the name of the player2 if the player1 finished', () => {
  Game.startGame(player1, player2);
  Game.applyMove(0, 2);
  expect((Game.getCurrentPlayer()).getName().getName()).toEqual(player2.getName());
});

test('It should finish the game if someone wins', () => {
  GameBoard.clearBoard();
  Mock.mockVerticalWin(player1, GameBoard);
  Game.handleWinStates();
  expect(Game.getGameStatus()).toBe(false);
  GameBoard.clearBoard();
});