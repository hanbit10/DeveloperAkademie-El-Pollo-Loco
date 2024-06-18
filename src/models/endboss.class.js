class Endboss extends MoveableObject {
  height = 340;
  width = 300;
  y = 95;
  speed = 0.85 + Math.random() * 0.2;
  frameWidth = this.height;
  frameHeight = this.width;

  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  IMAGES_WALKING = [
    "../assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "../assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "../assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = ["../assets/img/4_enemie_boss_chicken/5_dead/G24.png", "../assets/img/4_enemie_boss_chicken/5_dead/G25.png"];

  IMAGES_ATTACK = [
    "../assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  hurt_sound = new Audio("../assets/audio/chicken/boss-chicken/hurt.wav");
  killed_sound = new Audio("../assets/audio/chicken/boss-chicken/killed.wav");
  attack_sound = new Audio("../assets/audio/chicken/boss-chicken/attack.wav");
  characterTooFar = false;
  bossAttack = false;
  deadSetting = false;

  bossAlive;
  bossDead;
  count = 0;
  playKilledOnce = false;
  endbossWalk = false;
  playedSoundOnce = false;

  /**
   * Initializes a new instance of the Endboss class with the specified x position.
   *
   * @param {number} x - The initial x position of the endboss.
   * @return {void}
   */
  constructor(x) {
    super().loadImage("../assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = x;
    this.xCache = x;
    this.animate();
  }
  /**
   * Animates the endboss by periodically checking if it's alive and triggering attack or other animations accordingly.
   *
   * @return {void} This function does not return anything.
   */
  animate() {
    this.bossAlive = setInterval(() => {
      if (!this.isDead()) {
        if (this.bossAttack) {
          this.attackAnimation();
        } else {
          this.otherAnimations();
        }
      }
    }, 200);
    this.moveAnimation();
  }

  /**
   * Animates the movement of the endboss based on the character's proximity.
   *
   * @return {void} This function does not return anything.
   */
  moveAnimation() {
    setInterval(() => {
      if (this.characterTooFar) {
        this.moveLeft();
        this.endbossWalk = true;
      } else {
        this.endbossWalk = false;
      }
    }, 1000 / 60);
  }

  /**
   * Executes different animations based on the endboss's state. Plays walking, alert, or hurt animations accordingly.
   *
   * @return {void} Does not return anything.
   */
  otherAnimations() {
    if (!this.isHurt() && this.endbossWalk) this.playAnimation(this.IMAGES_WALKING);
    if (!this.isHurt() && !this.endbossWalk) {
      this.playAnimation(this.IMAGES_ALERT);
      this.playedSoundOnce = false;
    }
    if (this.isHurt()) {
      if (this.playedSoundOnce == false) {
        this.hurt_sound.play();
        this.playedSoundOnce = true;
      }
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Executes the attack animation by playing the attack animation images, moving the endboss character to the left, and playing the attack sound.
   *
   * @return {void} This function does not return anything.
   */
  attackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.x = this.x - 20;
    this.attack_sound.play();
  }

  /**
   * Pauses the execution by setting the speed to 0.
   *
   * @return {void} This function does not return anything.
   */
  pause() {
    this.speed = 0;
  }

  /**
   * Executes the dead animation when the endboss character is dead by setting the speed to 0, playing the dead animation images, and loading the dead image.
   *
   */
  dead() {
    this.bossDead = setInterval(() => {
      if (this.isDead()) {
        this.speed = 0;
        this.deadSetting = true;
        if (this.playKilledOnce == false) this.killed_sound.play();
        this.playKilledOnce = true;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.count >= 1) this.loadImage("../assets/img/4_enemie_boss_chicken/5_dead/G26.png");
        this.count++;
      }
    }, 200);
  }

  /**
   * Checks the character's status and updates the corresponding properties.
   *
   * @param {string} status - The status of the character.
   * @return {void} This function does not return anything.
   */
  checkingCharacter(status) {
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

  /**
   * Resets the state of the end boss to its initial values.
   *
   * @return {void} This function does not return anything.
   */
  reset() {
    this.deadSetting = false;
    this.x = this.xCache;
    this.energy = 100;
    this.count = 0;
    this.speed = 0.85 + Math.random() * 0.2;
  }

  /**
   * Mutes the sounds of the end boss by setting their volumes to 0.
   *
   * @return {void} This function does not return a value.
   */
  mute() {
    this.hurt_sound.volume = 0;
    this.killed_sound.volume = 0;
    this.attack_sound.volume = 0;
  }

  /**
   * Sets the volume of the hurt_sound, killed_sound, and attack_sound to 1 to unmute the end boss.
   *
   * @return {void} This function does not return a value.
   */
  unmute() {
    this.hurt_sound.volume = 1;
    this.killed_sound.volume = 1;
    this.attack_sound.volume = 1;
  }
}
