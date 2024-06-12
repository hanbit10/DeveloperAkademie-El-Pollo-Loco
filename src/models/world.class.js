class World {
  character = new Character()
  statusBar = new StatusBar()
  throwableObjects = [new ThrowableObject()]
  level = level1
  enemies = this.level.enemies
  clouds = this.level.clouds
  coins = this.level.coins
  bottles = this.level.bottles
  backgroundObjects = this.level.backgroundObjects
  camera_x = 0
  alreadyCollided = [false]
  enemiesDead = this.level.enemiesDead
  levelCleared = [false, false, false]


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
      this.checkThrowObjects()
      this.checkCollisions()
      this.checkLevels()
    }, 100)

    setInterval(() => {
      // this.checkCollisions()
    }, 100)
  }

  checkLevels(){
    let level1Enemies = this.enemiesDead.slice(0, 6);
    let check1 = level1Enemies.every(element => element == true);
    if(check1){
      if(!this.levelCleared[0]) {
        console.log("level 1 cleared")
        this.level.level_start_x = this.level.level_end_x-500
        this.level.level_end_x = this.level.level_end_x*2
        this.levelCleared[0] = true
      }
    }
  }

  checkThrowObjects(){
    if(this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x, this.character.y)
      this.throwableObjects.push(bottle)
      this.alreadyCollided.push(false)
      if(!this.character.otherDirection) {
        bottle.throwableCondition("throwing")
      } else {
        bottle.throwableCondition("throwingLeft")
      }
    }
  } 
  checkCollisions(){
    let enemies = 0
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
        // console.log(this.enemyDead[enemies] == false)
        if(this.enemiesDead[enemies] == false) {
          this.character.hit()
          this.statusBar.setPercentage(this.character.energy)
        }
      }
      let i = 0
      this.throwableObjects.forEach((throwableObject) => {
        if(throwableObject.isColliding(enemy)) {
          if(this.alreadyCollided[i] == false && this.enemiesDead[enemies] == false) {
            // console.log("collided")
            throwableObject.throwableCondition("breaking")
          }
          this.alreadyCollided[i] = true
          enemy.dead()
          this.enemiesDead[enemy.id] = true
        }
        i++
      })
      enemies++
    })

    this.level.coins.forEach((coin) => {
      if(this.character.isColliding(coin)) {
        coin.collect("coin")
      }

    })
    this.level.bottles.forEach((bottle) => {
      if(this.character.isColliding(bottle)) {
        bottle.collect("bottle")
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
    this.addObjectsToMap(this.coins)
    this.addObjectsToMap(this.bottles)
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