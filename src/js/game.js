let canvas;
let world = new World()

let ctx;
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d")

  console.log("my Character", world.character)
  console.log("enemy", world.enemies[1])
}