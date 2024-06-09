class Cloud extends MovableObject {
  y = 50;
  width = 300;
  height = 200;
  constructor(){
    super().loadImage("/assets/img/5_background/layers/4_clouds/1.png")
    this.x = 200+Math.random()*500;
    this.animate()
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15
    }, 1000/60)
  }
}