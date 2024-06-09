let canvas;
let world
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  

}

document.addEventListener('keydown', (event) => {
  console.log(event)
}) 