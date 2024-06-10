class ChickenNormal extends MoveableObject {
  height = 70
  width = 70
  y = 380
  speed = 0.55 + Math.random()*2
  frameWidth = this.height
  frameHeight = this.width

  IMAGES_WALKING = [
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ]
  constructor() {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
    this.loadImages(this.IMAGES_WALKING)
    this.x = 700
    this.animate()
  }
  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length
      let path = this.IMAGES_WALKING[i]
      this.img = this.imageCache[path]
      this.currentImage++
    }, 130)

    setInterval(() => {
      this.moveLeft(this.speed)
    }, 1000/60)
  }
}