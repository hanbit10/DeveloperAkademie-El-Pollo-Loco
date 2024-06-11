class Coin extends PickableObject {
  coin = "/assets/img/8_coin/coin_3.png"
  height = 40
  width = 40
  frameWidth = this.width
  frameHeight = this.height
  constructor(x, y) {
    super()
    this.x = x
    this.y = y
    this.loadImage(this.coin)
  }
}