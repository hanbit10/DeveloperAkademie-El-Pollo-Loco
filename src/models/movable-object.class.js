class MovableObject {
  x = 100
  y = 320
  height = 150
  width = 100
  img 

  loadImage(path) {
    this.img = new Image()
    this.img.src = path
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