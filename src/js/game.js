let canvas;
let world
let keyboard = new Keyboard();
let clickedTime
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (e) => {
  if(e.key == "ArrowRight") {
    keyboard.RIGHT = true
  }

  if(e.key == "ArrowLeft") {
    keyboard.LEFT = true
  }

  if(e.key == "ArrowUp") {
    keyboard.UP = true
  }

  if(e.key == "ArrowDown") {
    keyboard.DOWN = true
  }

  if(e.key == " ") {
    keyboard.SPACE = true
  }

  if(e.key == "d") {
    keyboard.D = true
  }
  // console.log(e)
  clearTimeout(clickedTime)
  startTimer()
  keyboard.KEYUSED = true
}) 

document.addEventListener('keyup', (e) => {
  if(e.key == "ArrowRight") {
    keyboard.RIGHT = false
  }

  if(e.key == "ArrowLeft") {
    keyboard.LEFT = false
  }

  if(e.key == "ArrowUp") {
    keyboard.UP = false
  }

  if(e.key == "ArrowDown") {
    keyboard.DOWN = false
  }

  if(e.key == " ") {
    keyboard.SPACE = false
  }

  if(e.key == "d") {
    keyboard.D = false
  }

}) 

function startTimer(){
  clickedTime = setTimeout(() => {
    keyboard.KEYUSED = false
  }, 7000)
}