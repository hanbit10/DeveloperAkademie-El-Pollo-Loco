class MoveableObject extends DrawableObject {
  gravity = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  coin = 0;
  bottle = 0;
  lastHit = 1;
  speed = 0.15;

  /**
   * A function that applies gravity to the object by adjusting its position based on speed and acceleration.
   *
   * @return {void} This function does not return anything.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * A description of the entire function.
   *
   * @return {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Chicken) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  moveRight() {
    this.x = this.x + this.speed;
  }

  /**
   * Moves the object to the left by subtracting the speed from the current x position.
   *
   * @return {void} This function does not return anything.
   */
  moveLeft() {
    this.x = this.x - this.speed;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the current object is colliding with the given object.
   *
   * @param {Object} mo - The object to check for collision.
   * @return {boolean} Returns true if the objects are colliding, otherwise returns false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if the current object is too far away from the given object.
   *
   * @param {Object} mo - The object to compare distance to.
   * @return {boolean} Returns true if the current object is too far away from the given object, otherwise returns false.
   */
  isTooFar(mo) {
    return this.x + this.width + 400 >= mo.x && this.x <= mo.x;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} mo - The object to compare distance to.
   * @return {boolean} Returns true if the current object is too close to the given object, otherwise returns false.
   */
  isClose(mo) {
    return this.x + this.width + 120 >= mo.x && this.x <= mo.x;
  }

  /**
   * Plays an animation using the provided images.
   *
   * @param {Array<string>} images - An array of image paths for the animation.
   * @return {void} This function does not return anything.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} dmg - description of parameter
   * @return {void} This function does not return anything.
   */
  hit(dmg) {
    this.energy -= dmg;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * Collects the specified type of item.
   *
   * @param {string} type - The type of item to collect. Valid options are "coin" or "bottle".
   * @return {void} This function does not return anything.
   */
  collected(type) {
    if (type == "coin") this.coin += 10;
    if (type == "bottle") this.bottle += 20;
  }

  /**
   * Decrements the `coin` property by 20.
   *
   * @return {void} This function does not return anything.
   */
  buyBottle() {
    this.coin -= 20;
  }

  /**
   * Decrements the `bottle` property by 20.
   *
   * @return {void} This function does not return anything.
   */
  throwBottle() {
    this.bottle -= 20;
  }

  /**
   * Checks if the object is dead by comparing the `energy` property to 0.
   *
   * @return {boolean} Returns true if the `energy` property is equal to 0, indicating that the object is dead. Otherwise, returns false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is currently hurt by comparing the time passed since the last hit to 1 second.
   *
   * @return {boolean} Returns true if the time passed since the last hit is less than 1 second, indicating that the object is currently hurt. Otherwise, returns false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
