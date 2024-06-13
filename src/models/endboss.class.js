class Endboss extends MoveableObject {
  height = 340;
  width = 300;
  y = 140;
  speed = 0.85 + Math.random() * 0.2;
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

  IMAGES_DEAD = ["/assets/img/4_enemie_boss_chicken/5_dead/G24.png", "/assets/img/4_enemie_boss_chicken/5_dead/G25.png"];

  IMAGES_ATTACK = [
    "/assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "/assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  hurt_sound = new Audio("/assets/audio/chicken/boss-chicken/hurt.wav");
  killed_sound = new Audio("/assets/audio/chicken/boss-chicken/killed.wav");
  attack_sound = new Audio("/assets/audio/chicken/boss-chicken/attack.wav");
  characterTooFar = false;
  bossAttack = false;

  constructor(x) {
    super().loadImage("/assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = x;
    this.animate();
  }
  animate() {
    let playOnce = false;
    let playKilledOnce = false;
    let endbossWalk = false;

    let bossAlive = setInterval(() => {
      // console.log("bossAttack", this.bossAttack);
      if (this.bossAttack) {
        this.playAnimation(this.IMAGES_ATTACK);
        this.x = this.x - 20;
        this.attack_sound.play();
      } else {
        if (!this.isHurt() && endbossWalk == true) {
          this.playAnimation(this.IMAGES_WALKING);
        }
        if (!this.isHurt() && endbossWalk == false) {
          this.playAnimation(this.IMAGES_ALERT);
          playOnce = false;
        }
        if (this.isHurt()) {
          if (playOnce == false) {
            this.hurt_sound.play();
          }
          this.playAnimation(this.IMAGES_HURT);
        }
      }
    }, 200);

    let count = 0;
    let bossDead = setInterval(() => {
      if (this.isDead()) {
        clearInterval(moving);
        clearInterval(bossAlive);
        if (playKilledOnce == false) {
          this.killed_sound.play();
        }
        playKilledOnce = true;
        this.playAnimation(this.IMAGES_DEAD);
        if (count >= 1) {
          this.loadImage("/assets/img/4_enemie_boss_chicken/5_dead/G26.png");
        }
        count++;
      }
    }, 200);

    let moving = setInterval(() => {
      if (this.characterTooFar) {
        this.moveLeft();
        endbossWalk = true;
      } else {
        endbossWalk = false;
      }
    }, 1000 / 60);
  }

  checkingCharacter(status) {
    // console.log(status);
    if (status == "tooFar") {
      this.characterTooFar = true;
      this.bossAttack = false;
    } else if (status == "close") {
      this.bossAttack = true;
    } else if (status == "saveZone") {
      this.characterTooFar = false;
      this.bossAttack = false;
    }
  }
}
