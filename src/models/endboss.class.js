class Endboss extends MoveableObject {
  height = 340
  width = 300
  y = 140
  speed = 0.15 + Math.random()*0.2

  IMAGES_WALKING = ["/assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "/assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ]

  IMAGES_ALERT = [
    "/assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "/assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ]
  constructor() {
    super().loadImage("/assets/img/4_enemie_boss_chicken/2_alert/G5.png")
    this.loadImages(this.IMAGES_ALERT)
    this.x = 200+Math.random()*500
    this.animate()


  }
  animate(){    
    setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT)
    }, 300)
  }
}