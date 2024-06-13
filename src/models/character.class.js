class Character extends MoveableObject {
  height = 270;
  y = 80;
  IMAGES_WALKING = [
    "/assets/img/2_character_pepe/2_walk/W-21.png",
    "/assets/img/2_character_pepe/2_walk/W-22.png",
    "/assets/img/2_character_pepe/2_walk/W-23.png",
    "/assets/img/2_character_pepe/2_walk/W-24.png",
    "/assets/img/2_character_pepe/2_walk/W-25.png",
    "/assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "/assets/img/2_character_pepe/3_jump/J-31.png",
    "/assets/img/2_character_pepe/3_jump/J-32.png",
    "/assets/img/2_character_pepe/3_jump/J-33.png",
    "/assets/img/2_character_pepe/3_jump/J-34.png",
    "/assets/img/2_character_pepe/3_jump/J-35.png",
    "/assets/img/2_character_pepe/3_jump/J-36.png",
    "/assets/img/2_character_pepe/3_jump/J-37.png",
    "/assets/img/2_character_pepe/3_jump/J-38.png",
    "/assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "/assets/img/2_character_pepe/5_dead/D-51.png",
    "/assets/img/2_character_pepe/5_dead/D-52.png",
    "/assets/img/2_character_pepe/5_dead/D-53.png",
    "/assets/img/2_character_pepe/5_dead/D-54.png",
    "/assets/img/2_character_pepe/5_dead/D-55.png",
    "/assets/img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "/assets/img/2_character_pepe/4_hurt/H-41.png",
    "/assets/img/2_character_pepe/4_hurt/H-42.png",
    "/assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "/assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "/assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "/assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "/assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  speed = 5;
  otherDirection = false;
  walking_sound = new Audio("/assets/audio/character/walking.flac");
  jump_sound = new Audio("/assets/audio/character/jump.wav");
  gothit_sound = new Audio("/assets/audio/character/gothit2.wav");
  frameWidth = 40;
  frameHeight = 120;
  jumpImage = 0;
  constructor() {
    super().loadImage("/assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      // console.log(this.movingLeft)
      this.walking_sound.pause();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }
      if (this.isAboveGround()) {
        this.walking_sound.pause();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.KEYUSED) {
        this.playAnimation(this.IMAGES_IDLE);
      } else if (!this.world.keyboard.KEYUSED) {
        this.playAnimation(this.IMAGES_IDLE_LONG);
      }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        this.jump_sound.play();
      }
    }, 100);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }

      if (this.isAboveGround()) {
        this.playJumpAnimation(this.IMAGES_JUMPING);
      }

      if (this.isHurt()) {
        // console.log(this.isHurt())
        this.playAnimation(this.IMAGES_HURT);
        this.gothit_sound.play();
      }
    }, 100);
  }

  playJumpAnimation(images) {
    // console.log(this.jumpImage)
    let i = this.jumpImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.jumpImage++;
    if (135 < this.y) {
      this.jumpImage = 0;
    }
  }
}
