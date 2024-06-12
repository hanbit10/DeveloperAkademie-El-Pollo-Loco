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

  hurt_sound = new Audio("/assets/audio/chicken/boss-chicken/hurt.wav");
  killed_sound = new Audio("/assets/audio/chicken/boss-chicken/killed.wav");
  characterTooFar = false;
  // endbossWalk = false;
  constructor(x) {
    super().loadImage("/assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.animate();
  }
  animate() {
    let playOnce = false;
    let playKilledOnce = false;
    let bossAlive = setInterval(() => {
      // if (!this.isHurt() && this.endbossWalk == true) {
      //   this.playAnimation(this.IMAGES_WALKING);
      // }
      if (!this.isHurt() && this.endbossWalk == false) {
        this.playAnimation(this.IMAGES_ALERT);
        playOnce = false;
      }
      if (this.isHurt()) {
        if (playOnce == false) {
          this.hurt_sound.play();
          playOnce = true;
        }
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 200);

    let count = 0;
    let bossDead = setInterval(() => {
      if (this.isDead()) {
        if (playKilledOnce == false) {
          this.killed_sound.play();
        }
        clearInterval(bossAlive);
        playKilledOnce = true;
        this.playAnimation(this.IMAGES_DEAD);
        if (count >= 2) {
          this.loadImage(this.IMAGES_DEAD[2]);
        }
        count++;
      }
    }, 200);

    let moving = setInterval(() => {
      if (this.characterTooFar) {
        this.moveLeft();
        // this.endbossWalk = true;
      }
    }, 1000 / 60);
  }

  checkingCharacter(status) {
    if (status == "tooFar") {
      this.characterTooFar = true;
    } else if (status == "close") {
    } else if (status == "saveZone") {
      this.characterTooFar = false;
    }
  }
}
