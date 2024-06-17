class Coin extends PickableObject {
  coin = "../assets/img/8_coin/coin_3.png";
  height = 40;
  width = 40;
  frameWidth = this.width;
  frameHeight = this.height;
  /**
   * Constructor for the Coin class.
   *
   * @param {number} x - The x-coordinate position
   * @param {number} y - The y-coordinate position
   * @return {void} No return value
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.yCache = y;
    this.loadImage(this.coin);
  }
}
