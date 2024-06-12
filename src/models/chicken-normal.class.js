class ChickenNormal extends MoveableObject {
  height = 70;
  width = 70;
  y = 380;
  speed = 0.55 + Math.random() * 2;
  frameWidth = this.width;
  frameHeight = this.height;
  height = 70;
  width = 70;
  y = 380;
  speed = 0.55 + Math.random() * 2;
  frameWidth = this.width;
  frameHeight = this.height;

  IMAGES_WALKING = [
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  ];

  buck_sound = "/assets/audio/chicken/big-chicken/buck.wav";
  constructor(id, x) {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.id = id;
    this.animate();
  }
  animate() {
    this.animateImgs = setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 130);

    this.moving = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  dead() {
    // this.buck_sound.pause()
    // this.killed_sound.play()
    this.loadImage("/assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    clearInterval(this.moving);
    clearInterval(this.animateImgs);
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }
}
