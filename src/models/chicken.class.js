class Chicken extends MovableObject {
  height = 60
  width = 60
  y = 380

  IMAGES_WALKING = ["/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ]
  constructor() {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
    this.loadImages(this.IMAGES_WALKING)
    this.x = 200+Math.random()*500
    this.animate()
  }
}