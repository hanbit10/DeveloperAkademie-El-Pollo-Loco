class World {
  character = new Character()
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
  ]
  clouds = [
    new Cloud(),
  ]
  backgroundObjects = [
    new BackgroundObject("/assets/img/5_background/layers/3_third_layer/1.png", 0, 80),
  ]

  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.addObjectsToMap(this.backgroundObjects)
    this.addObjectsToMap(this.clouds)
    this.addToMap(this.character)
    this.addObjectsToMap(this.enemies)




    //draw wird immer aufgerufen
    let self = this;
    requestAnimationFrame(function() {
      self.draw()})
  }

  addObjectsToMap(objs){
    objs.forEach(obj => {
      this.addToMap(obj)
    })
  }
  addToMap(mo){
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
  }
}