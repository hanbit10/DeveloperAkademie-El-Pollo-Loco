class MovableObject {
  x = 100
  y = 280
  height = 150
  width = 100
  img
  imageCache = [] 
  currentImage = 0

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
    console.log("moveRight")
  }

  moveLeft(speed) {
    setInterval(() => {
      this.x -= speed
    }, 1000/60)
  }

  jump(){
    console.log("jump")
  }
}