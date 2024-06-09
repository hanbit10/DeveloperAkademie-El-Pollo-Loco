class World {

  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
    this.draw();
  }
  character = new Character()
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
  ]
  draw() {
      this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
  }
}