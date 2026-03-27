class Cloud extends MoveableObject {
  y = 50;
  width = 300;
  height = 200;
  animation;

  /**
   * Constructs a new instance of the Cloud class with the given x position.
   *
   * @param {number} x - The x position of the cloud.
   * @return {void}
   */
  constructor(x) {
    super().loadImage("../assets/img/5_background/layers/4_clouds/1.png");
    this.x = x + Math.random() * 500;
    this.xCache = this.x;
    this.animate();
  }

  /**
   * Animate the cloud by moving it to the left at a constant speed.
   *
   * @return {void} This function does not return anything.
   */
  animate() {
    this.animation = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  reset() {
    this.x = this.xCache;
  }
}
