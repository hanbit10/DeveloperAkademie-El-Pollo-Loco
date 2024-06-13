class ChickenNormal extends MoveableObject {
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

  buck_sound = new Audio("/assets/audio/chicken/normal-chicken/buck.mp3");
  killed_sound = new Audio("/assets/audio/chicken/normal-chicken/killed.wav");

  constructor(id, x) {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.id = id;
    this.animate();
  }
  animate() {
    this.animateImgs = setInterval(() => {
      // this.buck_sound.volume = 0.03;
      // let resp = this.buck_sound.play();
      // if (resp !== undefined) {
      //   resp.then((_) => {}).catch((error) => {});
      // }
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 130);

    this.moving = setInterval(() => {
      if (this.x < -200) {
        clearInterval(this.moving);
        clearInterval(this.animateImgs);
        this.buck_sound.pause();
      }
      this.moveLeft();
    }, 1000 / 60);
  }

  dead() {
    this.buck_sound.pause();
    this.killed_sound.play();
    this.loadImage("/assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    clearInterval(this.moving);
    clearInterval(this.animateImgs);
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }
}
