let canvas;
let character = new Character()
let enemies = [
  new Chicken(),
  new Chicken(),
  new Chicken()
]
let ctx;
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d")

  console.log("my Character", character)
}