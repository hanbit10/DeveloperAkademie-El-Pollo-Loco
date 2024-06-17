class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;
  y = 0;

  /**
   * Constructor for the BackgroundObject class.
   *
   * @param {string} imagePath - The path to the image to be loaded.
   * @param {number} x - The x-coordinate position.
   * @return {void} No return value.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}
