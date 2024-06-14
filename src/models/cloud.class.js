class Cloud extends MoveableObject {
  y = 50;
  width = 300;
  height = 200;
  animation;
  constructor() {
    super().loadImage("/assets/img/5_background/layers/4_clouds/1.png");
    this.x = 200 + Math.random() * 500;
    this.animate();
  }
  animate() {
    this.animation = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
