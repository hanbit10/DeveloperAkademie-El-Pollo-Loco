class Bottle extends PickableObject {
  bottle1 = "/assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
  y = 320
  x = 100+Math.random()*1000
  constructor() {
    super()
    this.loadImage(this.bottle1)
  }
}