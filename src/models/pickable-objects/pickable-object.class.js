class PickableObject extends DrawableObject {
  coin_collect = new Audio("../assets/audio/pickable/coins.wav");
  bottle_collect = new Audio("../assets/audio/pickable/bottles.wav");

  /**
   * Initializes a new instance of the PickableObject class.
   *
   * This constructor calls the superclass constructor using the `super()` keyword.
   *
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Moves the object to the bottom of the screen and plays a sound based on the type of pickable object.
   *
   * @param {string} pickable - The type of pickable object being collected. Can be "coin" or "bottle".
   * @return {void} This function does not return anything.
   */
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
