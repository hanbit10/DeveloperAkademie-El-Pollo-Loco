class Bottle extends PickableObject {
  bottles = ["../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  random = Math.floor(Math.random() * this.bottles.length);
  height = 90;
  width = 40;
  /**
   * Constructor for the Bottle class.
   *
   * @param {number} x - The x-coordinate position
   * @return {void} No return value
   */
  constructor(x) {
    super();
    this.loadImage(this.bottles[this.random]);
    this.x = x + Math.random() * 1000;
    this.y = 327;
    this.yCache = 327;
  }
}
