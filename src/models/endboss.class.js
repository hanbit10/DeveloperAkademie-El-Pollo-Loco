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

  IMAGES_HURT = [
    "/assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "/assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "/assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "/assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "/assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "/assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(x) {
    super().loadImage("/assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.animate();
  }
  animate() {
    let bossAlive = setInterval(() => {
      if (!this.isHurt()) {
        this.playAnimation(this.IMAGES_ALERT);
      }
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 200);

    let count = 0;
    let bossDead = setInterval(() => {
      if (this.isDead()) {
        clearInterval(bossAlive);
        this.playAnimation(this.IMAGES_DEAD);
        if (count >= 2) {
          this.loadImage(this.IMAGES_DEAD[2]);
        }
        count++;
      }
    }, 200);
  }
}
