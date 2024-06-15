class Chicken extends MoveableObject {
  height = 60;
  width = 60;
  y = 380;
  yCache = 380;
  speed = 0.15 + Math.random() * 0.2;
  frameWidth = this.height;
  frameHeight = this.width;

  IMAGES_WALKING = [
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  buck_sound = new Audio("/assets/audio/chicken/small-chicken/buck.wav");
  killed_sound = new Audio("/assets/audio/chicken/small-chicken/killed.wav");
  moving;
  animateImgs;
  deadSetting = false;
  constructor(id, x) {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 100;
    this.xCache = x;
    this.id = id;
    this.animate();
  }
  animate() {
    this.animateImgs = setInterval(() => {
      if (!this.isDead()) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 130);

    this.moving = setInterval(() => {
      if (this.x < -200) {
        this.buck_sound.pause();
      }
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  dead() {
    this.buck_sound.pause();
    this.killed_sound.play();
    this.loadImage("/assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    // clearInterval(this.moving);
    // clearInterval(this.animateImgs);
    this.speed = 0;
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }

  pause() {
    this.speed = 0;
    this.buck_sound.pause();
    this.killed_sound.pause();
  }

  reset() {
    this.deadSetting = false;
    this.x = this.xCache + Math.random() * 100;
    this.y = this.yCache;
    this.energy = 100;
    this.speed = 0.15 + Math.random() * 0.2;
  }

  mute() {
    this.buck_sound.volume = 0;
    this.killed_sound.volume = 0;
  }

  unmute() {
    this.buck_sound.volume = 1;
    this.killed_sound.volume = 1;
  }
}
