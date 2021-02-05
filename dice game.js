"use strict";

import "core-js/stable";

import "regenerator-runtime/runtime";

import { dicePositions, diceRoll, getRandom } from "./diceYA.js";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const messageToPlyr0 = document.getElementById("message--0");
const messageToPlyr1 = document.getElementById("message--1");

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const nameContainer = document.querySelectorAll(".name");

const cube = document.getElementById("cube");

const faces = [
  document.querySelector(".front"),
  document.querySelector(".back"),
  document.querySelector(".left"),
  document.querySelector(".right"),
  document.querySelector(".top"),
  document.querySelector(".bottom"),
];

let scores,
  currentScore,
  activePlayer = 1,
  playing = false;

const waitRolligDice = function (sec) {
  return new Promise(resolve => setTimeout(resolve, 1000 * sec));
};

const changeDiceColor = function () {
  const color =
    "rgba(" +
    getRandom(26, 0) / 9 +
    "," +
    getRandom(26, 0) / 9 +
    "," +
    getRandom(26, 0) / 9 +
    "," +
    (Math.random() + 0.5) +
    ")";

  faces.forEach(el => {
    el.style.background = color;
  });
};
//Starting condition

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1 - activePlayer;
  playing = true;

  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  player0El.classList.remove("player--active");
  player1El.classList.remove("player--active");
  currentScore0.classList.remove("hidden");
  currentScore1.classList.remove("hidden");
  nameContainer[0].textContent = "PLAYER 1";
  nameContainer[1].textContent = "PLAYER 2";
  if (activePlayer) gameMessages("please wait", "please roll");
  else gameMessages("please roll", "please wait");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  document.getElementById(`message--${activePlayer}`).style.color = "white";
  document.getElementById(`message--${1 - activePlayer}`).style.color =
    "rgba(122, 118, 118, 0.68)";
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = 1 - activePlayer;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  document.getElementById(`message--${activePlayer}`).style.color = "white";
  document.getElementById(`message--${1 - activePlayer}`).style.color =
    "rgba(122, 118, 118, 0.68)";
};

const deactivateRollButtons = () =>
  (cube.style.pointerEvents = btnRoll.style.pointerEvents = "none");

const activateRollButtons = () =>
  (cube.style.pointerEvents = btnRoll.style.pointerEvents = "all");

const gameMessages = function (message0 = "", message1 = "") {
  if (message0 && message1) {
    messageToPlyr0.textContent = message0;
    messageToPlyr1.textContent = message1;
    return;
  }
  if (dicePositions.front === 1) {
    document.getElementById(`message--${activePlayer}`).textContent =
      "bad luck";
    document.getElementById(`message--${1 - activePlayer}`).textContent =
      "your turn, please roll";
    return;
  }
  if (message0 === "hold") {
    document.getElementById(`message--${activePlayer}`).textContent =
      "current score is added to total ";
    document.getElementById(`message--${1 - activePlayer}`).textContent =
      "your turn, please roll";
    return;
  }
  document.getElementById(
    `message--${activePlayer}`
  ).textContent = `${dicePositions.front}, roll or hold?`;
  document.getElementById(`message--${1 - activePlayer}`).textContent =
    "please wait";
};

const play = async function () {
  if (playing) {
    // Generate random dice roll
    diceRoll();
    //until dice settles, u cant click
    deactivateRollButtons();
    //wait dice settlement
    await waitRolligDice(0.6);
    //can click now
    activateRollButtons();
    //const dice = dicePositions.front;
    //give information about current situation to players
    gameMessages();
    //check for rolled 1
    changeDiceColor();
    if (dicePositions.front !== 1) {
      currentScore += dicePositions.front;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //swtich to next player
      switchPlayer();
    }
  }
};

//buttons for rolling dice
btnRoll.addEventListener("click", play);
cube.onclick = play;

btnHold.addEventListener("click", function () {
  //Add score to active player's score
  if (playing) gameMessages("hold");
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check winner
    if (scores[activePlayer] >= 100) {
      //end game
      playing = false;
      messageToPlyr0.textContent = messageToPlyr1.textContent = "";
      //css change to winner player's container
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      //remove active player css
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //change name of winner player
      nameContainer[activePlayer].textContent = "WINNER";

      //change name of loser player
      nameContainer[1 - activePlayer].textContent = "next time";

      simulate();
    } else switchPlayer();
  }
});

const simulate = async function () {
  deactivateRollButtons();
  cube.style.transitionDuration = "1.5s";
  while (!playing) {
    cube.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${
      Math.random() * 360
    }deg) rotateZ(${Math.random() * 360}deg)`;
    await waitRolligDice(1.5);
  }
  cube.style.transitionDuration = "0.5s";
  activateRollButtons();
};

btnNew.addEventListener("click", init);

simulate();
