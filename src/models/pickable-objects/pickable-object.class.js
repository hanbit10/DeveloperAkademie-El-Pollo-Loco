class PickableObject extends DrawableObject {
  coin_collect = new Audio("../assets/audio/pickable/coins.wav");
  bottle_collect = new Audio("../assets/audio/pickable/bottles.wav");
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

  reset() {
    this.y = this.yCache;
  }

  mute() {
    this.coin_collect.volume = 0;
    this.bottle_collect.volume = 0;
  }

  unmute() {
    this.coin_collect.volume = 1;
    this.bottle_collect.volume = 1;
  }
}
