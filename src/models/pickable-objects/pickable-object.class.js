class PickableObject extends DrawableObject {
  coin_collect = new Audio("/assets/audio/pickable/coins.wav");
  bottle_collect = new Audio("/assets/audio/pickable/bottles.wav");
  constructor() {
    super();
  }

  collect(pickable) {
    this.y = 600;
    if (pickable == "coin") {
      this.coin_collect.play();
    }
    if (pickable == "bottle") {
      this.bottle_collect.play();
    }
  }
}
