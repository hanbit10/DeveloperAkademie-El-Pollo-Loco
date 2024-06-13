class PickableObject extends DrawableObject {
  coin_collect = new Audio("/assets/audio/pickable/coins.wav");
  bottle_collect = new Audio("/assets/audio/pickable/bottles.wav");
  // energy = 0;
  constructor() {
    super();
  }

  collect(pickable) {
    this.y = 600;
    if (pickable == "coin") {
      this.coin_collect.play();
      // this.energy += 20;
    }
    if (pickable == "bottle") {
      this.bottle_collect.play();
    }
  }
}
