class Chicken extends MoveableObject {
  height = 50;
  width = 50;
  y = 367;
  yCache = 367;
  frameWidth = this.height;
  frameHeight = this.width;

  IMAGES_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  paused = false;
  killed_sound = new Audio("../assets/audio/chicken/small-chicken/killed.wav");
  deadSetting = false;
  /**
   * Constructs a new instance of the Chicken class with the given id and x position.
   *
   * @param {number} id - The unique identifier for the chicken.
   * @param {number} x - The initial x position of the chicken.
   */
  constructor(id, x) {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 100;
    this.xCache = x;
    this.id = id;
    this.animate();
  }

  /**
   * Animate the chicken's movement and actions at regular intervals.
   *
   * This function uses `setInterval` to repeatedly execute a callback function at a specified interval.
   * The callback function checks if the chicken is not dead using the `isDead()` method.
   * If the chicken is not dead, it calls the `playAnimation()` method with the `IMAGES_WALKING` array as an argument.
   *
   *
   * @return {void} This function does not return a value.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead() && !this.paused) this.playAnimation(this.IMAGES_WALKING);
    }, 130);
    this.moveAnimation();
  }

  /**
   * Animate the chicken's movement to the left at regular intervals.
   *
   * This function uses `setInterval` to repeatedly execute a callback function at a specified interval.
   * The callback function checks if the chicken is not dead using the `isDead()` method.
   * If the chicken is not dead, it calls the `moveLeft()` method.
   *
   * @return {void} This function does not return a value.
   */
  moveAnimation() {
    setInterval(() => {
      if (!this.isDead()) {
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
    this.loadImage("../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.speed = 0;
    this.energy = 0;
    this.deadSetting = true;
    setTimeout(() => {
      this.y = 600;
    }, 2000);
  }

  /**
   * Pauses the movement of the chicken by setting its speed to 0.
   *
   * This function sets the `speed` property of the chicken to 0, effectively pausing its movement.
   *
   * @return {void} This function does not return a value.
   */
  pause() {
    this.speed = 0;
    this.paused = true;
  }

  continue() {
    this.paused = false;
    this.speed = 0.25 + Math.random() * 0.6;
  }

  /**
   * Resets the state of the object to its initial values.
   *
   * This function sets the `deadSetting` property to `false`, generates a new random `x` coordinate within a range of 0 to 100,
   * sets the `y` coordinate to its initial value, sets the `energy` property to 100, and generates a new random `speed` value
   * within a range of 0.25 to 0.85.
   *
   * @return {void} This function does not return a value.
   */
  reset() {
    this.deadSetting = false;
    this.x = this.xCache + Math.random() * 100;
    this.y = this.yCache;
    this.energy = 100;
    this.speed = 0.25 + Math.random() * 0.6;
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
   * Unmutes the sound of the killed_sound property by setting its volume to 1.
   *
   * @return {void} This function does not return a value.
   */
  unmute() {
    this.killed_sound.volume = 1;
  }
}
