class ChickenNormal extends MoveableObject {
  height = 70;
  width = 70;
  y = 380;
  yCache = 380;
  frameWidth = this.width;
  frameHeight = this.height;
  deadSetting = false;
  IMAGES_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  killed_sound = new Audio("../assets/audio/chicken/normal-chicken/killed.wav");

  constructor(id, x) {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.xCache = x;
    this.id = id;
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
    }, 130);
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  dead() {
    this.killed_sound.play();
    this.loadImage("../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
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
    this.x = this.xCache;
    this.y = this.yCache;
    this.speed = 0.55 + Math.random() * 2;
    this.energy = 100;
  }

  mute() {
    this.killed_sound.volume = 0;
  }

  unmute() {
    this.killed_sound.volume = 1;
  }
}
