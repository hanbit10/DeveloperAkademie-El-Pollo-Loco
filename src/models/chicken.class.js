class Chicken extends MovableObject {
  height = 60
  width = 60
  y = 380
  speed = 0.15 + Math.random()*0.2

  IMAGES_WALKING = ["/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ]
  constructor() {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
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