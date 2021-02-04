"use strict";

const cube = document.getElementById("cube");

//die's  [ self , botttom, back , top]
const diceMapX = [
  "",
  [1, 6, 2, 5],
  [2, 6, 1, 5],
  [3, 6, 4, 5],
  [4, 6, 3, 5],
  [5, 1, 6, 2],
  [6, 2, 5, 1],
];
//die's  [self , left, back , right]
const diceMapY = [
  "",
  [1, 4, 2, 3],
  [2, 3, 1, 4],
  [3, 1, 4, 2],
  [4, 2, 3, 1],
  [5, 4, 6, 3],
  [6, 4, 5, 3],
];

let dice;

const diceResult = function (rotationX = 0, rotationY = 0) {
  dice = diceMapX[diceMapY[1][rotationY]][rotationX];
};
/*
const x = ["", "alt", "arka", "üst"];
const y = ["", "sol", "arka", "sağ"];
*/

//randomizer
const getRandom = (max, min) =>
  (Math.floor(Math.random() * (max - min)) + min) * 90;

//dice cube click
const o = function () {
  const min = 1;
  const max = 50;

  const xRand = getRandom(max, min);
  const yRand = getRandom(max, min);

  const rotationX = (xRand % 360) / 90;
  const rotationY = (yRand % 360) / 90;

  //change settlement angel(add x and y angle random(25,0) degree), so that each roll ends up with different visual

  cube.style.transform =
    "rotateX(" +
    (xRand + getRandom(25, 0) / 90) +
    "deg) rotateY(" +
    (yRand + getRandom(25, 0) / 90) +
    "deg)";
  setTimeout(() => {
    diceResult(rotationX, rotationY);

    console.log(dice);
  }, 2000);
};

o();
