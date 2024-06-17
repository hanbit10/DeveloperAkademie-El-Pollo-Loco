class ThrowableObject extends MoveableObject {
  throw_sound = new Audio("../assets/audio/character/throw.wav");
  break_sound = new Audio("../assets/audio/throwable/breaking-bottle.wav");

  BOTTLE_THROW = [
    "../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_BREAK = [
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
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
    super().loadImage("../assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_THROW);
    this.loadImages(this.BOTTLE_BREAK);
    this.x = x + 30;
    this.y = y + 50;
    this.height = 100;
  }

  /**
   * Updates the throw condition and triggers the corresponding animation or break animation based on the condition.
   *
   * @param {string} condition - The throw condition to set.
   * @param {boolean} enemyDead - Indicates if the enemy is dead.
   * @return {void} This function does not return anything.
   */
  throwableCondition(condition, enemyDead) {
    this.throwCondition = condition;
    if (this.isBreaking() && !enemyDead) this.breakAnimation();
    else if (this.isThrowing()) this.throwAnimation();
    setInterval(() => {
      this.throwXAchse(enemyDead);
    }, 25);
  }

  /**
   * Executes the break animation for the ThrowableObject.
   *
   * This function sets the `bottleBroken` property to true, plays the `break_sound`,
   * sets the `speedY` property to 0, and starts an interval that plays the animation
   * using the `playAnimation` method with the `BOTTLE_BREAK` array as the argument.
   * After 6 iterations, it loads the last image from the `BOTTLE_BREAK` array using
   * the `loadImage` method.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Plays the throw sound, sets the speedY property to 10, applies gravity, and starts an interval that plays the animation using the playAnimation method with the BOTTLE_THROW array as the argument. If the object is breaking, the interval is cleared.
   *
   * @return {void} This function does not return anything.
   */
  throwAnimation() {
    this.throw_sound.play();
    this.speedY = 10;
    this.applyGravity();
    this.throwingBottle = setInterval(() => {
      this.playAnimation(this.BOTTLE_THROW);
      if (this.isBreaking()) clearInterval(this.throwingBottle);
    }, 100);
  }

  /**
   * Determines if the object is currently in the process of being thrown.
   *
   * @return {boolean} True if the object is currently being thrown or being thrown to the left, false otherwise.
   */
  isThrowing() {
    return this.throwCondition == "throwing" || this.throwCondition == "throwingLeft";
  }

  /**
   * Checks if the object is currently breaking.
   *
   * @return {boolean} True if the object is currently breaking, false otherwise.
   */
  isBreaking() {
    return this.throwCondition == "breaking";
  }

  /**
   * Determines the x-coordinate movement based on the throw condition and enemy status.
   *
   * @param {boolean} enemyDead - Indicates if the enemy is dead.
   * @return {void} This function does not return anything.
   */
  throwXAchse(enemyDead) {
    if (this.throwCondition == "throwing" || enemyDead) {
      this.x += 15;
    } else if (this.isBreaking() && !enemyDead) {
      this.x = this.x;
    } else if (this.throwCondition == "throwingLeft" || enemyDead) {
      this.x -= 15;
    }
  }

  /**
   * Mutes the break and throw sounds by setting their volume to 0.
   *
   * @return {void} This function does not return anything.
   */
  mute() {
    this.break_sound.volume = 0;
    this.throw_sound.volume = 0;
  }

  /**
   * Mutes the break and throw sounds by setting their volume to 0.
   *
   * @return {void} This function does not return anything.
   */
  unmute() {
    this.break_sound.volume = 1;
    this.throw_sound.volume = 1;
  }
}
