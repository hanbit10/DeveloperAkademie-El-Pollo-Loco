class Chicken extends MoveableObject {
  height = 60;
  width = 60;
  y = 380;
  yCache = 380;
  frameWidth = this.height;
  frameHeight = this.width;

  IMAGES_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  killed_sound = new Audio("../assets/audio/chicken/small-chicken/killed.wav");
  deadSetting = false;
  constructor(id, x) {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 100;
    this.xCache = x;
    this.id = id;
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
    }, 130);
    this.moveAnimation();
  }

  moveAnimation() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  dead() {
    this.killed_sound.play();
    this.loadImage("../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.speed = 0;
    this.energy = 0;
    this.deadSetting = true;
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }

  pause() {
    this.speed = 0;
  }

  reset() {
    this.deadSetting = false;
    this.x = this.xCache + Math.random() * 100;
    this.y = this.yCache;
    this.energy = 100;
    this.speed = 0.25 + Math.random() * 0.6;
  }

  mute() {
    this.killed_sound.volume = 0;
  }

  unmute() {
    this.killed_sound.volume = 1;
  }
}
