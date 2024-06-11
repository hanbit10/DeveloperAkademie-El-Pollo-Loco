class ThrowableObject extends MoveableObject {

  throw_sound = new Audio("/assets/audio/character/throw.wav")

  constructor(x, y, throwing){
    super().loadImage("/assets/img/6_salsa_bottle/salsa_bottle.png")
    this.x = x;
    this.y = y;
    this.height = 100;
    if(throwing){
      this.throw()
      this.throw_sound.play()
    }
  }

  throw() {
    this.speedY = 30 
    this.applyGravity()
    setInterval(() => {
      this.x += 10
    }, 25)
  }
}