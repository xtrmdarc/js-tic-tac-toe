import Mock from './mock';
import Game from '../src/game';
import Player from '../src/player';

const player1 = Player('Diego', 'X');
const player2 = Player('Brenda', 'O');

test('It should return false if the game does not start', () => {
  expect(Game.applyMove(0, 0)).toBe(false);
});

test('It should return true if the game starts correctly and the player applies a move', () => {
  Game.startGame(player1, player2);
  expect(Game.applyMove(0, 1)).toBe(true);
});