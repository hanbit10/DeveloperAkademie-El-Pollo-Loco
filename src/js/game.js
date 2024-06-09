let canvas;
let character = new Image();
let ctx;
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d")

  character.src = '/assets/img/2_character_pepe/2_walk/W-21.png'
  ctx.drawImage(character, 0, 0, 50, 100, 0, 0, 700, 600);
}