class Bottle extends PickableObject {
  bottles = ["/assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 
    "/assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"]
  random = Math.floor(Math.random() * this.bottles.length);
  y = 340
  height = 90
  width = 40
  frameWidth = this.width
  frameHeight = this.height
  constructor(x) {
    super()
    this.loadImage(this.bottles[this.random])
    this.x = x+Math.random()*1000
  }
}