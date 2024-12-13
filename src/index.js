const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

let memoryGame = new MemoryGame(cards);
let gameStartTime;

function updateScore() {
  document.getElementById('pairs-clicked').textContent = memoryGame.pairsClicked;
  document.getElementById('pairs-guessed').textContent = memoryGame.pairsGuessed;
}

function renderBoard() {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });
  document.querySelector('#memory-board').innerHTML = html;

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      if (memoryGame.pickedCards.length === 2) {
        const [card1, card2] = memoryGame.pickedCards;
        const isPair = memoryGame.checkIfPair(
          card1.dataset.cardName,
          card2.dataset.cardName
        );

        if (isPair) {
          card1.classList.add('blocked');
          card2.classList.add('blocked');
        } else {
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
          }, 1000);
        }

        memoryGame.pickedCards = [];
        updateScore();

        if (memoryGame.checkIfFinished()) {
          const gameTime = ((Date.now() - gameStartTime) / 1000).toFixed(2);
          setTimeout(() => alert(`¡Ganaste en ${gameTime} segundos!`), 500);
          document.getElementById('restart-button').style.display = 'inline';
        }
      }
    });
  });
}

document.getElementById('start-button').addEventListener('click', () => {
  memoryGame.shuffleCards();
  renderBoard();
  updateScore();
  gameStartTime = Date.now();
  document.getElementById('start-button').style.display = 'none';
  document.getElementById('restart-button').style.display = 'inline';
});

document.getElementById('restart-button').addEventListener('click', () => {
  memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();
  renderBoard();
  updateScore();
  gameStartTime = Date.now();
});
