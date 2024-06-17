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
const howToPlay = document.getElementById("how-to-play");

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

/**
 * Initializes the game by setting up the canvas, creating a new World object,
 * adding event listeners for mobile controls and game finish, and starting the game.
 *
 * @return {void} This function does not return anything.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  addEventListeners();
  checkMobileControls();
  checkGameFinished();
}

/**
 * Adds event listeners for various buttons and elements in the game.
 *
 * @return {void} This function does not return anything.
 */
function addEventListeners() {
  resetButton.addEventListener("click", resetSketch);
  menuButton.addEventListener("click", goMenu);
  startButton.addEventListener("click", start);
  voiceOne.addEventListener("click", muted);
  voiceZero.addEventListener("click", unmuted);
  closeBtn.addEventListener("click", closeControls);
  controlsBtn.addEventListener("click", showControls);
  fullScreenEventListeners();
}

/**
 * Adds event listeners for the fullscreen button and the exit fullscreen button.
 *
 * @return {void} This function does not return anything.
 */
function fullScreenEventListeners() {
  const fullScreen = document.getElementById("fullscreen");
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

/**
 * Exits fullscreen mode if supported by the browser.
 *
 * @return {void} This function does not return anything.
 */
function exitFullscreen() {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } catch (e) {}
}

/**
 * Requests the browser to enter fullscreen mode for the specified element.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode for.
 * @return {void} This function does not return anything.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Adds touch event listeners to the specified element for handling touchstart and touchend events.
 *
 * @param {HTMLElement} element - The element to attach touch event listeners to.
 * @param {string} key - The key associated with the touch event.
 * @return {void} This function does not return anything.
 */
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

/**
 * Iterates over the controls array and attaches touch event listeners to the corresponding elements.
 *
 * @return {void} This function does not return anything.
 */
function checkMobileControls() {
  controls.forEach((control) => {
    const element = document.getElementById(control.id);
    addTouchListeners(element, control.key);
  });
}

/**
 * Checks if the game is finished and updates the display accordingly.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Shows the controls menu by removing the "d-none" class from the controlsMenu element.
 *
 * @return {void} This function does not return anything.
 */
function showControls() {
  controlsMenu.classList.remove("d-none");
}

/**
 * Closes the controls menu by adding the "d-none" class to the controlsMenu element.
 *
 * @return {void} This function does not return anything.
 */
function closeControls() {
  controlsMenu.classList.add("d-none");
}

/**
 * Mutes the audio by adding the "d-none" class to the voiceOne element and removing it from the voiceZero element.
 * Also calls the mute() function on the world object.
 *
 * @return {void} This function does not return anything.
 */
function muted() {
  voiceOne.classList.add("d-none");
  voiceZero.classList.remove("d-none");
  world.mute();
}

/**
 * Unmutes the audio by removing the "d-none" class from the voiceOne element and adding it to the voiceZero element.
 * Also calls the unmute() function on the world object.
 *
 * @return {void} This function does not return anything.
 */
function unmuted() {
  voiceOne.classList.remove("d-none");
  voiceZero.classList.add("d-none");
  world.unmute();
}

/**
 * Sets the game menu to true, sets gameOverSetting and gameWonSetting to false,
 * hides the resetButton and menuButton, and shows the startButton.
 *
 * @return {void} This function does not return anything.
 */
function goMenu() {
  world.gameMenu = true;
  world.gameOverSetting = false;
  world.gameWonSetting = false;
  resetButton.classList.add("d-none");
  menuButton.classList.add("d-none");
  startButton.classList.remove("d-none");
  howToPlay.classList.remove("d-none");
}

/**
 * Starts the game by hiding the start button, setting the game menu to false,
 * resetting the game world, clearing the clickedTime variable, setting the
 * keyboard.KEYUSED to true, and starting the timer.
 *
 * @return {void} This function does not return anything.
 */
function start() {
  startButton.classList.add("d-none");
  howToPlay.classList.add("d-none");
  world.gameMenu = false;
  world.reset();
  clearTimeout(clickedTime);
  keyboard.KEYUSED = true;
  startTimer();
}

/**
 * Resets the sketch by hiding the reset and menu buttons, setting the game menu to false,
 * resetting the game world, clearing the clickedTime variable, setting the keyboard.KEYUSED to true,
 * and starting the timer.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Resets the sketch by hiding the reset and menu buttons, setting the game menu to false,
 * resetting the game world, clearing the clickedTime variable, setting the keyboard.KEYUSED to true,
 * and starting the timer.
 *
 * @return {void} This function does not return anything.
 */
function startTimer() {
  clickedTime = setTimeout(() => {
    keyboard.KEYUSED = false;
  }, 7000);
}
