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
function init() {
  // world = new World(canvas, keyboard);

  canvas = document.getElementById("canvas");
  // level = getLevel();
  world = new World(canvas, keyboard);

  resetButton.addEventListener("click", resetSketch);
  menuButton.addEventListener("click", goMenu);
  startButton.addEventListener("click", start);
  voiceOne.addEventListener("click", muted);
  voiceZero.addEventListener("click", unmuted);
  closeBtn.addEventListener("click", closeControls);
  controlsBtn.addEventListener("click", showControls);

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
  if (e.key == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.key == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.key == "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (e.key == " ") {
    keyboard.SPACE = true;
  }

  if (e.key == "d") {
    keyboard.D = true;
  }

  if (e.key == "b") {
    keyboard.B = true;
  }
  // console.log(e)
  clearTimeout(clickedTime);
  startTimer();
  keyboard.KEYUSED = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.key == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.key == "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (e.key == " ") {
    keyboard.SPACE = false;
  }

  if (e.key == "d") {
    keyboard.D = false;
  }

  if (e.key == "b") {
    keyboard.B = false;
  }
});

function startTimer() {
  clickedTime = setTimeout(() => {
    keyboard.KEYUSED = false;
  }, 7000);
}
