class Character extends MovableObject {
  height = 280;
  y = 170;
  IMAGES_WALKING = ["/assets/img/2_character_pepe/2_walk/W-21.png",
    "/assets/img/2_character_pepe/2_walk/W-22.png",
    "/assets/img/2_character_pepe/2_walk/W-23.png",
    "/assets/img/2_character_pepe/2_walk/W-24.png",
    "/assets/img/2_character_pepe/2_walk/W-25.png",
    "/assets/img/2_character_pepe/2_walk/W-26.png",
  ]
  world;
  speed = 5
  otherDirection = false

  constructor(){
    super().loadImage("/assets/img/2_character_pepe/2_walk/W-21.png")
    this.loadImages(this.IMAGES_WALKING)
    this.animate()
  }

  animate() {
    setInterval(() => {
      if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x ) {
        this.x = this.x+this.speed
        this.otherDirection = false
      }

      if(this.world.keyboard.LEFT && this.x > 0 ) {
        this.x = this.x-this.speed
        this.otherDirection = true
      }
      this.world.camera_x = -this.x + 100
    }, 1000/60)

    setInterval(() => {
      if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = this.IMAGES_WALKING[i]
        this.img = this.imageCache[path]
        this.currentImage++
      }
    }, 100)
  }
}