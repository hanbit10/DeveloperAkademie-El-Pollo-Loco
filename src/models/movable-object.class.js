class MovableObject extends DrawableObject {
  gravity = false
  speedY = 0;
  acceleration = 2.5
  energy = 100
  lastHit = 1

  applyGravity() {
    setInterval(() => {
      if(this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY
        this.speedY -= this.acceleration
      }
    },1000/25)
  }

  isAboveGround() {
    return this.y < 180
  }

  moveRight() {
    this.x = this.x+this.speed
  }

  moveLeft(speed) {
    this.x = this.x-this.speed
  }

  jump(){
    this.speedY = 30
  }

  drawFrame(ctx) {
    if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5"
      ctx.strokeStyle = "blue"
      ctx.rect(this.x, this.y, this.width, this.height)
      ctx.stroke()
    }
  }

  isColliding(mo) {
    return  this.x + this.width >= mo.x && 
            this.y + this.height >= mo.y &&
            this.x <= mo.x&& 
            this.y < mo.y + mo.height
}

  playAnimation(images) {
    let i = this.currentImage % images.length
    let path = images[i]
    this.img = this.imageCache[path]
    this.currentImage++
  }

  hit(){
    this.energy -= 2;
    if(this.energy < 0) {
      this.energy = 0
    } else {
      this.lastHit = new Date().getTime()
    }
  }

  isDead(){
    return this.energy == 0
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit
    timepassed = timepassed / 1000
    return timepassed < 1
  }
}