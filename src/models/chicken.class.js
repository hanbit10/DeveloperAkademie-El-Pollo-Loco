class Chicken extends MovableObject {
  constructor() {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
    this.x = 200+Math.random()*500
    this.y = 300
  }
}