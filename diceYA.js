"use strict";

let dicePositions = {};

const init = function () {
  dicePositions = {
    front: 1,
    back: 2,
    right: 3,
    left: 4,
    top: 5,
    bottom: 6,
  };
};
const getRandom = (max = 1, min = 0) =>
  (Math.floor(Math.random() * (max - min)) + min) * 90;

const diceMoveZ = function (times) {
  let tempLeft, tempRight;

  for (let i = 0; i < times; i++) {
    tempLeft = dicePositions.left;
    tempRight = dicePositions.right;
    dicePositions.left = dicePositions.bottom;
    dicePositions.right = dicePositions.top;
    dicePositions.top = tempLeft;
    dicePositions.bottom = tempRight;
  }
};

const diceMoveUp = function (times) {
  let tempFront, tempBack;

  for (let i = 0; i < times; i++) {
    tempFront = dicePositions.front;
    tempBack = dicePositions.back;
    dicePositions.front = dicePositions.bottom;
    dicePositions.back = dicePositions.top;
    dicePositions.top = tempFront;
    dicePositions.bottom = tempBack;
  }
};

const diceMoveRight = function (times) {
  let tempFront, tempBack;

  for (let i = 0; i < times; i++) {
    tempFront = dicePositions.front;
    tempBack = dicePositions.back;
    dicePositions.front = dicePositions.left;
    dicePositions.back = dicePositions.right;
    dicePositions.left = tempBack;
    dicePositions.right = tempFront;
  }
};

const diceRoll = function () {
  const min = 1;
  const max = 50;

  const xRand = getRandom(max, min);
  const yRand = getRandom(max, min);
  const zRand = getRandom(max, min);

  const rotationX = (xRand % 360) / 90;

  const rotationY = (yRand % 360) / 90;

  const rotationZ = (zRand % 360) / 90;

  //change settlement angle(add x and y angle random(25,0) degree), so that each roll ends up with different visual
  cube.style.transform = `rotateX(${
    xRand + getRandom(22, 0) / 90
  }deg) rotateY(${yRand + getRandom(22, 0) / 90}deg) rotateZ(${
    zRand + getRandom(22, 0) / 90
  }deg)`;

  //until transformation will end, .5sec is determined in css , disable click events on dice.
  //cube.style.pointerEvents = "none";

  setTimeout(() => {
    init();
    diceMoveZ(rotationZ);
    diceMoveRight(rotationY);
    diceMoveUp(rotationX);
    //cube.style.pointerEvents = "all";
  }, 510);
};

export { diceRoll, dicePositions, getRandom };
