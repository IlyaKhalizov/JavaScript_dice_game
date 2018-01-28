/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

//application initialization
init();

/**
 * events on click roll btn
 * @var gamePlaying
 * @var dice
 * @var diceDOM
 * @var activePlayer
 * @var roundScore
 * */
document.querySelector('.btn-roll').addEventListener('click', function() {
    //check if game is not finished
    if (gamePlaying) {
        //get number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //display img with dice number
        diceDOM.src = 'dice-' + dice + '.png';
        //if dice is 1 we go to the next player
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //go to the next player if first is failed
            nextPlayer();
        }
    }
});

/**
 * btn hold events
 * @var gamePlaying
 * @var roundScore
 * @var activePlayer
 * @var scores
 * */
document.querySelector('.btn-hold').addEventListener('click', function () {
    //check if game is not finished
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check how much scores did current player do
        if (scores[activePlayer] >= 100) {
            //end the game
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            //go to the next player if first is failed
            nextPlayer();
        }
    }
});

/**
 * switch players
 * */
function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    roundScore = 0;
}

//btn new event
document.querySelector('.btn-new').addEventListener('click', init);

/**
 * application initialization
 * */
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

