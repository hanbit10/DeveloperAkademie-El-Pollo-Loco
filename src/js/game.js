let keyboard = new Keyboard();
let clickedTime;
let level;
let world;
let canvas;
function init() {
  // world = new World(canvas, keyboard);

  canvas = document.getElementById("canvas");
  // level = getLevel();
  world = new World(canvas, keyboard);

  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetSketch);
}

function resetSketch() {
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
