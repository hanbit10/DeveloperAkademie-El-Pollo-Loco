class ChickenNormal extends MoveableObject {
  height = 70;
  width = 70;
  y = 350;
  yCache = 350;
  frameWidth = this.width;
  frameHeight = this.height;
  deadSetting = false;
  IMAGES_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  killed_sound = new Audio("../assets/audio/chicken/normal-chicken/killed.wav");
  paused = false;
  /**
   * Constructs a new ChickenNormal object with the specified id and initial x position.
   *
   * @param {number} id - The unique identifier for the chicken.
   * @param {number} x - The initial x position of the chicken.
   */
  constructor(id, x) {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.xCache = x;
    this.id = id;
    this.animate();
  }

  /**
   * Animate the chicken's movement and actions at regular intervals.
   *
   * @return {void} No return value
   */
  animate() {
    setInterval(() => {
      if (!this.isDead() && !this.paused) this.playAnimation(this.IMAGES_WALKING);
    }, 130);
    setInterval(() => {
      if (!this.isDead() && !this.paused) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Plays the killed sound, loads the dead image, sets the speed and energy to 0,
   * sets the deadSetting flag to true, and moves the chicken to the bottom of the screen after 2 seconds.
   *
   * @return {void} No return value
   */
  dead() {
    this.killed_sound.play();
    setTimeout(() => {
      this.killed_sound.volume = 0;
    }, 1000);
    this.loadImage("../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.speed = 0;
    this.energy = 0;
    this.deadSetting = true;
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }

  /**
   * Pauses the execution of the function by setting the speed to 0 and
   * setting the paused flag to true.
   *
   * @return {void} No return value
   */
  pause() {
    this.speed = 0;
    this.paused = true;
  }

  /**
   * Resumes the execution of the function by setting the speed to a random value between 0.55 and 2.55,
   * and setting the paused flag to false.
   *
   * @return {void} No return value
   */
  continue() {
    this.speed = 0.55 + Math.random() * 2;
    this.paused = false;
  }

  /**
   * Resets the state of the chicken to its initial values.
   *
   * This function sets the `deadSetting` flag to `false`, and resets the `x`, `y`, `speed`, and `energy` properties
   * to their initial values. The `x` and `y` properties are reset to their cached values, and the `speed` property
   * is set to a random value between 0.55 and 2.55. The `energy` property is set to 100.
   *
   * @return {void} This function does not return a value.
   */
  reset() {
    this.deadSetting = false;
    this.x = this.xCache;
    this.y = this.yCache;
    this.speed = 0.55 + Math.random() * 2;
    this.energy = 100;
    this.continue();
  }

  /**
   * Mutes the sound of the killed_sound property by setting its volume to 0.
   *
   * @return {void} This function does not return a value.
   */
  mute() {
    this.killed_sound.volume = 0;
  }

  /**
   * A description of the entire function.
   *
   * @return {void} This function does not return a value
   */
  unmute() {
    this.killed_sound.volume = 1;
  }
}
