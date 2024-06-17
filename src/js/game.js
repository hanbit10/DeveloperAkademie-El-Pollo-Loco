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
const fullScreenBtn = document.getElementById("fullscreen-button");
const exitFullScreenBtn = document.getElementById("ext-fullscreen-button");

const keyMap = {
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  " ": "SPACE",
  d: "D",
  b: "B",
};

const controls = [
  { id: "control-left", key: "LEFT" },
  { id: "control-right", key: "RIGHT" },
  { id: "control-jump", key: "UP" },
  { id: "control-throw", key: "D" },
  { id: "control-buy", key: "B" },
];
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  addEventListeners();
  checkMobileControls();
  checkGameFinished();
}

function addEventListeners() {
  const fullScreen = document.getElementById("fullscreen");
  resetButton.addEventListener("click", resetSketch);
  menuButton.addEventListener("click", goMenu);
  startButton.addEventListener("click", start);
  voiceOne.addEventListener("click", muted);
  voiceZero.addEventListener("click", unmuted);
  closeBtn.addEventListener("click", closeControls);
  controlsBtn.addEventListener("click", showControls);
  fullScreenBtn.addEventListener("click", () => {
    enterFullscreen(fullScreen);
    fullScreenBtn.classList.add("d-none");
    exitFullScreenBtn.classList.remove("d-none");
  });
  exitFullScreenBtn.addEventListener("click", () => {
    exitFullscreen();
    fullScreenBtn.classList.remove("d-none");
    exitFullScreenBtn.classList.add("d-none");
  });
}

function exitFullscreen() {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } catch (e) {}
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function addTouchListeners(element, key) {
  element.addEventListener("touchstart", () => {
    keyboard[key] = true;
  });

  element.addEventListener("touchend", () => {
    keyboard[key] = false;
    clearTimeout(clickedTime);
    keyboard.KEYUSED = true;
    startTimer();
  });
}

function checkMobileControls() {
  controls.forEach((control) => {
    const element = document.getElementById(control.id);
    addTouchListeners(element, control.key);
  });
}

function checkGameFinished() {
  const controlContainer = document.getElementById("control-container");
  const policy = document.getElementById("policy");
  setInterval(() => {
    if (world.gameOverSetting || world.gameWonSetting) {
      menuButton.classList.remove("d-none");
      resetButton.classList.remove("d-none");
      startButton.classList.add("d-none");
      controlContainer.classList.add("d-none");
      policy.classList.add("d-none");
    } else if (!world.gameMenu) {
      policy.classList.add("d-none");
      controlContainer.classList.remove("d-none");
    } else if (world.gameMenu) {
      policy.classList.remove("d-none");
      controlContainer.classList.add("d-none");
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
  clearTimeout(clickedTime);
  keyboard.KEYUSED = true;
  startTimer();
}

function resetSketch() {
  resetButton.classList.add("d-none");
  menuButton.classList.add("d-none");
  world.gameMenu = false;
  world.reset();
  clearTimeout(clickedTime);
  keyboard.KEYUSED = true;
  startTimer();
}

document.addEventListener("keydown", (e) => {
  if (keyMap[e.key]) {
    keyboard[keyMap[e.key]] = true;
  }
  clearTimeout(clickedTime);
  keyboard.KEYUSED = true;
  startTimer();
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
