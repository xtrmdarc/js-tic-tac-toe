import Player from '../src/player';

const player = Player('Diego', 'X');

test('It should return the given player name', () => {
  expect(player.getName()).toBe('Diego');
});

test('It should return the given player symbol', () => {
  expect(player.getSymbol()).toBe('X');
});