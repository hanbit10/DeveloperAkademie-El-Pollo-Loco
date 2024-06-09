class MovableObject {
  x = 100
  y = 280
  height = 150
  width = 100
  img
  imageCache = [] 
  currentImage =0

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

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length
      let path = this.IMAGES_WALKING[i]
      this.img = this.imageCache[path]
      this.currentImage++
    }, 130)
  }

  moveRight() {
    console.log("moveRight")
  }

  moveLeft(){
    console.log("moveLeft")
  }

  jump(){
    console.log("jump")
  }
}