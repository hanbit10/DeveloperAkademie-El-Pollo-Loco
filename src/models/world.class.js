class World {
  character = new Character()
  statusBar = new StatusBar()
  throwableObjects = [new ThrowableObject()]
  level = level1
  enemies = this.level.enemies
  clouds = this.level.clouds
  pickableObjects = this.level.pickable
  backgroundObjects = this.level.backgroundObjects
  camera_x = 0


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.keyboard = keyboard
    this.draw();
    this.setWorld()
    this.run()
  }
  
  setWorld(){
    this.character.world = this
  }

  run(){
    setInterval(() => {
      this.checkCollisions()
      this.checkThrowObjects()
    }, 100)
  }

  checkThrowObjects(){
      if(this.keyboard.D) {
        let bottle = new ThrowableObject(this.character.x, this.character.y)
        this.throwableObjects.push(bottle)
      }
  } 
  checkCollisions(){
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
        this.character.hit()
        this.statusBar.setPercentage(this.character.energy)
      }
    })
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.camera_x, 0)
    this.addObjectsToMap(this.backgroundObjects)

    this.ctx.translate(-this.camera_x, 0)
    this.addToMap(this.statusBar)
    this.ctx.translate(this.camera_x, 0)

    this.addObjectsToMap(this.clouds)
    this.addObjectsToMap(this.throwableObjects)
    this.addObjectsToMap(this.pickableObjects)

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
      this.flipImage(mo)
    }
    mo.draw(this.ctx)
    mo.drawFrame(this.ctx, mo)
    if(mo.otherDirection){
      this.flipImageBack(mo)
    }
  }

  flipImage(mo) {
    this.ctx.save()
    this.ctx.translate(mo.width, 0)
    this.ctx.scale(-1, 1)
    mo.x = mo.x*-1
  }

  flipImageBack(mo) {
    mo.x = mo.x *-1
    this.ctx.restore()
  }
}