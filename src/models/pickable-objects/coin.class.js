class Coin extends PickableObject {
  coin = "/assets/img/8_coin/coin_1.png"

  constructor(x, y) {
    super(new Coin)
    this.x = x
    this.y = y
    this.loadImage(this.coin)
  }
}