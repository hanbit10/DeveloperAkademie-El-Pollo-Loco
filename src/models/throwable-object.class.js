class ThrowableObject extends MoveableObject {
  throw_sound = new Audio("/assets/audio/character/throw.wav");
  break_sound = new Audio("/assets/audio/throwable/breaking-bottle.wav");

  BOTTLE_THROW = [
    "/assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_BREAK = [
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "/assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  throwCondition = "throwing";
  throwableBottle;
  alreadyCollided = false;

  /**
   * Constructor for creating a ThrowableObject at a specific position.
   *
   * @param {number} x - The x-coordinate position
   * @param {number} y - The y-coordinate position
   * @return {void} No return value
   */
  constructor(x, y) {
    super().loadImage("/assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_THROW);
    this.loadImages(this.BOTTLE_BREAK);
    this.x = x + 30;
    this.y = y + 50;
    this.height = 100;
  }
  throwableCondition(condition, enemyDead) {
    this.throwCondition = condition;
    if (this.isBreaking() && !enemyDead) this.breakAnimation();
    else if (this.isThrowing()) this.throwAnimation();
    setInterval(() => {
      this.throwXAchse(enemyDead);
    }, 25);
  }

  breakAnimation() {
    this.bottleBroken = true;
    this.break_sound.play();
    this.speedY = 0;
    let count = 0;
    setInterval(() => {
      this.playAnimation(this.BOTTLE_BREAK);
      if (count >= 6) this.loadImage(this.BOTTLE_BREAK[5]);
      count++;
    }, 150);
  }

  throwAnimation() {
    this.throw_sound.play();
    this.speedY = 10;
    this.applyGravity();
    this.throwingBottle = setInterval(() => {
      this.playAnimation(this.BOTTLE_THROW);
      if (this.isBreaking()) clearInterval(this.throwingBottle);
    }, 100);
  }

  isThrowing() {
    return this.throwCondition == "throwing" || this.throwCondition == "throwingLeft";
  }

  isBreaking() {
    return this.throwCondition == "breaking";
  }

  throwXAchse(enemyDead) {
    if (this.throwCondition == "throwing" || enemyDead) {
      this.x += 15;
    } else if (this.isBreaking() && !enemyDead) {
      this.x = this.x;
    } else if (this.throwCondition == "throwingLeft" || enemyDead) {
      this.x -= 15;
    }
  }

  mute() {
    this.break_sound.volume = 0;
    this.throw_sound.volume = 0;
  }

  unmute() {
    this.break_sound.volume = 1;
    this.throw_sound.volume = 1;
  }
}
