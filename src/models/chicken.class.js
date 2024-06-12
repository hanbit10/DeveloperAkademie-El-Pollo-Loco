class Chicken extends MoveableObject {
  height = 60
  width = 60
  y = 380
  speed = 0.15 + Math.random()*0.2
  frameWidth = this.height
  frameHeight = this.width

  IMAGES_WALKING = [
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "/assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ]

  buck_sound = new Audio("/assets/audio/chicken/small-chicken/buck.wav");
  killed_sound = new Audio("/assets/audio/chicken/small-chicken/killed2.wav");
  moving;
  animateImgs;
  constructor(id, x) {
    super().loadImage("/assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
    this.loadImages(this.IMAGES_WALKING)
    this.x = x+Math.random()*100
    this.id = id
    this.animate()
  }
  animate(){
    this.animateImgs = setInterval(() => {
      this.buck_sound.volume = 0.2;
      let resp = this.buck_sound.play();
      if (resp !== undefined) {
        resp.then((_) => {}).catch((error) => {});
      }
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 130);

    this.moving =setInterval(() => { 
      this.moveLeft(this.speed)
    }, 1000/60)
  }

  dead() {
    this.buck_sound.pause();
    this.killed_sound.play();
    this.loadImage("/assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    clearInterval(this.moving);
    clearInterval(this.animateImgs);
    setTimeout(() => {

      this.y = 600
    }, 2000)
  }
}