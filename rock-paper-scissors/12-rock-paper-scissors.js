let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

/* 
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
updateScoreElement();



let isAutoPlaying = false;
let intervalId; 

function autoPlay() {
  const autoPlayButton = document.querySelector('.js-auto-play-button');

  if (!isAutoPlaying) {
    // Arrow function
    intervalId = setInterval(() => {
      const playerMove = generateComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    // When the game is auto playing, change
    // the text in the button to 'Stop Playing'.
    autoPlayButton.innerHTML = 'Stop Playing';

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    // When the game is not playing, change
    // the text back to 'Auto Play'.
    autoPlayButton.innerHTML = 'Auto Play';
  }
}



document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showResetConfirmation();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

// Choose the move with the keyboard 
document.body.addEventListener('keydown', (event) => {
  switch (event.key.toLowerCase()) {
    case 'r':
      playGame('rock');
      break;
    case 'p':
      playGame('paper');
      break;
    case 's':
      playGame('scissors');
      break;
    case 'a':
      autoPlay();
      break;
    case 'backspace':
      showResetConfirmation();
      break;
  }
});

function playGame(playerMove) {
  const computerMove = generateComputerMove();

  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove == 'paper') {
      result = 'You win';
    } else {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove == 'paper') {
      result = 'Tie';
    } else {
      result = 'You lose';
    }
  } else {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove == 'paper') {
      result = 'You lose';
    } else {
      result = 'You win';
    }
  }

  /*
  switch (result) {
    case 'You win':
      score.wins++;
      break;
    case 'You lose':
      score.losses++;
      break;
    case 'Tie':
      score.ties++;
      break;
  }
  */
  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  // localStorage.setItems only supports strings as arguments
  // the first is the name of the variable and the second is the value
  localStorage.setItem('score', JSON.stringify(score));

  showResult(result);
  showMoves(playerMove, computerMove);
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function showResult(result) {
  document.querySelector('.js-result').innerHTML = result;
}

function showMoves(playerMove, computerMove) {
  document.querySelector('.js-moves').innerHTML = `  You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}


function generateComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';
  if (randomNumber>= 0 && randomNumber< 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove ='scissors';
  }

  return computerMove;
}

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">
      Yes
    </button>
    <button class="js-reset-confirm-no  reset-confirm-button">
      No
    </button>
  `;

  // If yes is clicked reset score
  document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });
  


  // If no is clicked reset score
  document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
    hideResetConfirmation();
  });

}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function hideResetConfirmation() {
  // remove the confirmation message
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}