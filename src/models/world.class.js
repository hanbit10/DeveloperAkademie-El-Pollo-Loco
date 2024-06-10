class World {
  character = new Character()
  level = level1
  enemies = this.level.enemies
  clouds = this.level.clouds
  backgroundObjects = this.level.backgroundObjects
  camera_x = 0


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.keyboard = keyboard
    this.draw();
    this.setWorld()
  }
  
  setWorld(){
    this.character.world = this
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.camera_x, 0)
    this.addObjectsToMap(this.backgroundObjects)
    this.addObjectsToMap(this.clouds)
    this.addObjectsToMap(this.enemies)
    this.addToMap(this.character)
    this.ctx.translate(-this.camera_x, 0)
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
    if(mo.otherDirection){
      this.ctx.save()
      this.ctx.translate(mo.width, 0)
      this.ctx.scale(-1, 1)
      mo.x = mo.x*-1
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    if(mo.otherDirection){
      mo.x = mo.x *-1
      this.ctx.restore()
    }

  }
}