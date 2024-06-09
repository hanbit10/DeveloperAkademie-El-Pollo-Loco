class Chicken extends MovableObject {
  height = 60
  width = 60
  y = 380
  constructor() {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
    this.x = 200+Math.random()*500
  }
}