import './css/styles.css';
import game from './game';

document.querySelector('#startgame').addEventListener('click', () => {
  const player1name = document.getElementById('p1name').value;
  const player2name = document.getElementById('p2name').value;
  game.startGame(player1name, player2name);
});