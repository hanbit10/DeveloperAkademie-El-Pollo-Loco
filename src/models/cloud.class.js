class Cloud extends MovableObject {
  y = 50;
  width = 300;
  height = 200;
  constructor(){
    super().loadImage("/assets/img/5_background/layers/4_clouds/1.png")
    this.x = 200+Math.random()*500;
  }
}