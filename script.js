'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;  
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


let scores, currentScore, activePlayer,playing;

const init = function(){
    scores = [0,0];
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;


    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

btnRoll.addEventListener('click' , function(){

    if(playing){
        const dice = Math.trunc(Math.random()*6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !==1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        } else {
            switchPlayer();

        }
    }
});

btnHold.addEventListener('click', function(){

    if(playing){
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if player's score is =100
        if(scores[activePlayer]>=50){
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);
