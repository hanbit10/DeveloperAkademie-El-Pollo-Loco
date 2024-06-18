class Character extends MoveableObject {
  IMAGES_WALKING = [
    "../assets/img/2_character_pepe/2_walk/W-21.png",
    "../assets/img/2_character_pepe/2_walk/W-22.png",
    "../assets/img/2_character_pepe/2_walk/W-23.png",
    "../assets/img/2_character_pepe/2_walk/W-24.png",
    "../assets/img/2_character_pepe/2_walk/W-25.png",
    "../assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../assets/img/2_character_pepe/3_jump/J-31.png",
    "../assets/img/2_character_pepe/3_jump/J-32.png",
    "../assets/img/2_character_pepe/3_jump/J-33.png",
    "../assets/img/2_character_pepe/3_jump/J-34.png",
    "../assets/img/2_character_pepe/3_jump/J-35.png",
    "../assets/img/2_character_pepe/3_jump/J-36.png",
    "../assets/img/2_character_pepe/3_jump/J-37.png",
    "../assets/img/2_character_pepe/3_jump/J-38.png",
    "../assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "../assets/img/2_character_pepe/5_dead/D-51.png",
    "../assets/img/2_character_pepe/5_dead/D-52.png",
    "../assets/img/2_character_pepe/5_dead/D-53.png",
    "../assets/img/2_character_pepe/5_dead/D-54.png",
    "../assets/img/2_character_pepe/5_dead/D-55.png",
    "../assets/img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "../assets/img/2_character_pepe/4_hurt/H-41.png",
    "../assets/img/2_character_pepe/4_hurt/H-42.png",
    "../assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "../assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "../assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  speed = 5;
  otherDirection = false;
  walking_sound = new Audio("../assets/audio/character/walking.flac");
  jump_sound = new Audio("../assets/audio/character/jump.wav");
  gothit_sound = new Audio("../assets/audio/character/gothit2.wav");
  snoring_sound = new Audio("../assets/audio/character/snoring.wav");
  jumpImage = 0;
  paused = false;

  offset = {
    top: 120,
    bottom: 10,
    left: 30,
    right: 30,
  };

  /**
   * Initializes a new instance of the Character class.
   * Loads the necessary images for the character's animations and applies gravity.
   * Starts the character's animation loop.
   */
  constructor() {
    super();
    this.loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.applyGravity();
    this.animate();
    this.height = 270;
    this.y = 160;
    this.x = 250;
  }

  /**
   * Resets the character's properties to their initial values.
   * Sets the character's position to (100, 0).
   * Resets the character's energy to 100.
   * Resets the character's coin and bottle counts to 0.
   * Resets the character's speed to 5.
   * Resets the pauseGame flag to false.
   * Sets the world's keyboard RIGHT key to true and then to false after 20ms.
   */
  reset() {
    this.x = 250;
    this.energy = 100;
    this.coin = 0;
    this.bottle = 0;
    this.speed = 5;
    this.paused = false;
    this.world.keyboard.RIGHT = true;
    setTimeout(() => {
      this.world.keyboard.RIGHT = false;
    }, 20);
  }

  /**
   * Animate the character by playing the walking sound, updating the camera position,
   * and playing moving and other animations.
   *
   * This function runs a setInterval to repeatedly execute the following actions:
   * - Pause the walking sound
   * - Play the walking sound using the playWalkSound method
   * - Update the camera position based on the character's x position
   *
   * @return {void} This function does not return anything.
   */
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      this.playWalkSound();
      this.world.camera_x = -this.x + 200;
    }, 1000 / 60);
    this.playMovingAnimation();
    this.playOtherAnimations();
  }

  /**
   * Plays a walking sound based on game conditions.
   *
   * @return {void} Does not return anything.
   */
  playWalkSound() {
    if (!this.paused) {
      if (this.maxMoveableMap()) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.minMoveableMap()) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }
      if (this.isAboveGround()) this.walking_sound.pause();
    }
  }

  /**
   * Determines if the character can move to the right on the map.
   *
   * @return {boolean} Indicates if the character can move to the right.
   */
  maxMoveableMap() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Determines if the character can move to the left on the map.
   *
   * @return {boolean} Indicates if the character can move to the left.
   */
  minMoveableMap() {
    return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x;
  }

  /**
   * Plays the moving animation by continuously checking the keyboard input.
   *
   * This function sets up a setInterval to repeatedly execute the checkKeyboard
   * method every 100 milliseconds. The checkKeyboard method is called only if
   * the pauseGame flag is false. This ensures that the animation is paused when
   * needed.
   *
   * @return {void} This function does not return anything.
   */
  playMovingAnimation() {
    setInterval(() => {
      if (!this.paused) {
        this.checkKeyboard();
      }
    }, 100);
  }

  /**
   * Checks the keyboard input and updates the character's animation and sounds accordingly.
   *
   * This function checks the keyboard input to determine if the character should be idle,
   * walking, or jumping. If the KEYUSED flag is true, the character is set to idle and the
   * snoring sound is paused. If the KEYUSED flag is false, the character is set to idle for a
   * long time and the snoring sound is played. If the character is moving, the walking animation
   * is played. If the character is jumping, the jump function is called and the jump sound is
   * played.
   *
   * @return {void} This function does not return anything.
   */
  checkKeyboard() {
    if (this.world.keyboard.KEYUSED) {
      this.playAnimation(this.IMAGES_IDLE);
      this.snoring_sound.pause();
    }
    if (!this.world.keyboard.KEYUSED) {
      this.playAnimation(this.IMAGES_IDLE_LONG);
      this.snoring_sound.play();
    }
    if (this.isCharacterMoving()) this.playAnimation(this.IMAGES_WALKING);
    if (this.isCharacterJumping()) {
      this.jump();
      this.jump_sound.play();
    }
  }

  /**
   * Checks if the character is currently jumping.
   *
   * This function checks if the UP key is pressed in the keyboard input and if the character
   * is not above the ground. If both conditions are true, it returns true indicating that the
   * character is jumping. Otherwise, it returns false.
   *
   * @return {boolean} True if the character is jumping, false otherwise.
   */
  isCharacterJumping() {
    return this.world.keyboard.UP && !this.isAboveGround();
  }

  /**
   * Checks if the character is currently moving by checking if the RIGHT or LEFT key is pressed.
   *
   * @return {boolean} True if the character is moving, false otherwise.
   */
  isCharacterMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Plays other animations for the character.
   *
   * This function continuously checks the character's state and plays corresponding animations and audio effects.
   * It checks if the character is dead and plays the DEAD animation if true.
   * It checks if the character is above ground and plays the JUMPING animation if true.
   * It checks if the character is hurt and plays the HURT animation and plays the gothit_sound if true.
   *
   * @return {void} This function does not return anything.
   */
  playOtherAnimations() {
    setInterval(() => {
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      if (this.isAboveGround()) this.playJumpAnimation(this.IMAGES_JUMPING);
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.gothit_sound.play();
      }
    }, 100);
  }

  /**
   * Pauses the character's movement and audio effects.
   *
   * This function sets the character's speed to 0, sets the pauseGame flag to true,
   * and sets the volume of the gothit_sound, walking_sound, jump_sound, and snoring_sound
   * audio effects to 0, effectively pausing them.
   *
   * @return {void} This function does not return anything.
   */
  pause() {
    this.speed = 0;
    this.paused = true;
    this.gothit_sound.volume = 0;
    this.walking_sound.volume = 0;
    this.jump_sound.volume = 0;
    this.snoring_sound.volume = 0;
  }

  continue() {
    this.speed = 5;
    this.paused = false;
  }

  /**
   * Plays the jump animation using the provided images.
   *
   * @param {Array<string>} images - An array of image paths for the jump animation.
   * @return {void} This function does not return anything.
   */
  playJumpAnimation(images) {
    let i = this.jumpImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.jumpImage++;
    if (130 < this.y) this.jumpImage = 0;
  }

  /**
   * Mutes all audio effects for the character.
   *
   * This function sets the volume of the gothit_sound, walking_sound, jump_sound, and
   * snoring_sound audio effects to 0, effectively muting them.
   *
   * @return {void} This function does not return anything.
   */
  mute() {
    this.gothit_sound.volume = 0;
    this.walking_sound.volume = 0;
    this.jump_sound.volume = 0;
    this.snoring_sound.volume = 0;
  }

  /**
   * Unmutes all audio effects for the character.
   *
   * This function sets the volume of the gothit_sound, walking_sound, jump_sound, and
   * snoring_sound audio effects to 1, effectively unmutes them.
   *
   * @return {void} This function does not return anything.
   */
  unmute() {
    this.gothit_sound.volume = 1;
    this.walking_sound.volume = 1;
    this.jump_sound.volume = 1;
    this.snoring_sound.volume = 1;
  }
}
