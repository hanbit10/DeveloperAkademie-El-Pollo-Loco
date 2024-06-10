class MovableObject {
  x = 100
  y = 280
  height = 150
  width = 100
  img
  imageCache = [] 
  currentImage = 0
  gravity = false
  speedY = 0;
  acceleration = 2.5

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

  loadImage(path) {
    this.img = new Image()
    this.img.src = path
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image()
      img.src = path
      this.imageCache[path] = img
    })
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

  playAnimation(images) {
    let i = this.currentImage % images.length
    let path = images[i]
    this.img = this.imageCache[path]
    this.currentImage++
  }
}