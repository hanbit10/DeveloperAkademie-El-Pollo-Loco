class DrawableObject {
  img;
  imageCache = [];
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  currentImage = 0;
  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };

  /**
   * Load an image from the given path and assign it to the `img` property of the current object.
   *
   * @param {string} path - The path to the image file.
   * @return {void} This function does not return a value.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Load multiple images from the given array of paths and store them in the `imageCache` property of the current object.
   *
   * @param {Array<string>} arr - An array of image paths.
   * @return {void} This function does not return a value.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the image onto the canvas using the specified context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @return {void} This function does not return a value.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame on the canvas context if game instances exist.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {Object} mo - The object representing the frame dimensions.
   * @return {void} This function does not return a value.
   */
  drawFrame(ctx, mo) {
    if (this.gameInstances()) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, mo.width, mo.height);
      ctx.stroke();
    }
  }

  /**
   * Checks if the current instance is an instance of any of the specified classes.
   *
   * @return {boolean} Returns true if the current instance is an instance of Chicken, Endboss, ChickenNormal, Coin, Bottle, or Character. Otherwise, returns false.
   */
  gameInstances() {
    return (
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ChickenNormal ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Character
    );
  }

  /**
   * Draws an offset frame on the canvas context if the current instance is an instance of any of the specified classes.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {Object} mo - The object representing the frame dimensions.
   * @return {void} This function does not return a value.
   */
  drawOffsetFrame(ctx, mo) {
    if (this.gameInstances()) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "transparent";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        mo.width - this.offset.left - this.offset.right,
        mo.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }
}
