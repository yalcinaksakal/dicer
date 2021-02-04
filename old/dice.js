"use strict";

const cube = document.getElementById("cube");

let dicePositions = {
  front: 1,
  back: 2,
  right: 3,
  left: 4,
  top: 5,
  bottom: 6,
};

//i th element stores its old location and new location on cube
let diceFaces = [
  0,
  ["front", "front"],
  ["back", "back"],
  ["right", "right"],
  ["left", "left"],
  ["top", "top"],
  ["bottom", "bottom"],
];

const findNewFaces = function () {
  for (const [key, value] of Object.entries(dicePositions)) {
    diceFaces[value][1] = key;
  }
};

const changeCubeClasslist = function () {
  //find new faces of 1,2,3,4,5,6
  //console.log(diceFaces);
  findNewFaces();
  //console.log(diceFaces);
  for (let i = 1; i < 7; i++) {
    //set new class. adding 1, i will clear it after,otherwise i would need temp items.
    document
      .querySelector(`.${diceFaces[i][0]}`)
      .setAttribute("class", diceFaces[i][1] + "1");

    //new faces is added to classlist. so make it old for next roll
    diceFaces[i][0] = diceFaces[i][1];
  }
  //remove 1 s from class names
  /*
  for (let i = 1; i < 7; i++) {
    document
      .querySelector(`.${diceFaces[i][1]}1`)
      .setAttribute("class", diceFaces[i][1]);
  }*/
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

cube.onclick = function () {
  const min = 1;
  const max = 50;

  const xRand = getRandom(max, min);
  const yRand = getRandom(max, min);

  const rotationX = (xRand % 360) / 90;
  const rotationY = (yRand % 360) / 90;

  //change settlement angle(add x and y angle random(25,0) degree), so that each roll ends up with different visual

  cube.style.transform =
    "rotateX(" +
    (xRand + getRandom(25, 0) / 90) +
    "deg) rotateY(" +
    (yRand + getRandom(25, 0) / 90) +
    "deg)";

  //until transformation will end, 2sec is determined in css , disable click events on dice.
  cube.style.pointerEvents = "none";

  setTimeout(() => {
    diceMoveRight(rotationY);
    diceMoveUp(rotationX);
    console.log(dicePositions.front);
    //changeCubeClasslist();
    cube.style.pointerEvents = "all";
  }, 2000);
};

const getRandom = (max, min) =>
  (Math.floor(Math.random() * (max - min)) + min) * 90;
