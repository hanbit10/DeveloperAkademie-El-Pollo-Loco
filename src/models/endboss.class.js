class Endboss extends MoveableObject {
  height = 340;
  width = 300;
  y = 140;
  speed = 0.15 + Math.random() * 0.2;
  frameWidth = this.height;
  frameHeight = this.width;

  IMAGES_WALKING = [
    "/assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "/assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  constructor(x) {
    super().loadImage("/assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.x = x;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 300);
  }

  dead() {
    this.buck_sound.pause();
    this.killed_sound.play();
    this.loadImage("/assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    clearInterval(this.moving);
    clearInterval(this.animateImgs);
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }
}
