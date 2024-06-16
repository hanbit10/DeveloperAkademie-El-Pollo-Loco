let keyboard = new Keyboard();
let clickedTime;
let level;
let world;
let canvas;
const resetButton = document.getElementById("reset-button");
const menuButton = document.getElementById("menu-button");
const startButton = document.getElementById("start-button");
const voiceZero = document.getElementById("voice0");
const voiceOne = document.getElementById("voice1");
const closeBtn = document.getElementById("close-btn");
const controlsMenu = document.getElementById("controls-menu");
const controlsBtn = document.getElementById("controls-button");

const keyMap = {
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  " ": "SPACE",
  d: "D",
  b: "B",
};
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  resetButton.addEventListener("click", resetSketch);
  menuButton.addEventListener("click", goMenu);
  startButton.addEventListener("click", start);
  voiceOne.addEventListener("click", muted);
  voiceZero.addEventListener("click", unmuted);
  closeBtn.addEventListener("click", closeControls);
  controlsBtn.addEventListener("click", showControls);
  checkGameFinished();
}

function checkGameFinished() {
  setInterval(() => {
    if (world.gameOverSetting || world.gameWonSetting) {
      menuButton.classList.remove("d-none");
      resetButton.classList.remove("d-none");
      startButton.classList.add("d-none");
    }
  }, 200);
}

function showControls() {
  controlsMenu.classList.remove("d-none");
}
function closeControls() {
  controlsMenu.classList.add("d-none");
}

function muted() {
  voiceOne.classList.add("d-none");
  voiceZero.classList.remove("d-none");
  world.mute();
}

function unmuted() {
  voiceOne.classList.remove("d-none");
  voiceZero.classList.add("d-none");
  world.unmute();
}

function goMenu() {
  world.gameMenu = true;
  world.gameOverSetting = false;
  world.gameWonSetting = false;
  resetButton.classList.add("d-none");
  menuButton.classList.add("d-none");
  startButton.classList.remove("d-none");
}

function start() {
  startButton.classList.add("d-none");
  world.gameMenu = false;
  world.reset();
}

function resetSketch() {
  resetButton.classList.add("d-none");
  menuButton.classList.add("d-none");
  world.gameMenu = false;
  world.reset();
}
document.addEventListener("keydown", (e) => {
  if (keyMap[e.key]) {
    keyboard[keyMap[e.key]] = true;
  }
  clearTimeout(clickedTime);
  startTimer();
  keyboard.KEYUSED = true;
});

document.addEventListener("keyup", (e) => {
  if (keyMap[e.key]) {
    keyboard[keyMap[e.key]] = false;
  }
});

function startTimer() {
  clickedTime = setTimeout(() => {
    keyboard.KEYUSED = false;
  }, 7000);
}
