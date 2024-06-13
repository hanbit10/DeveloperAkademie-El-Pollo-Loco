class MoveableObject extends DrawableObject {
  gravity = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 1;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Chicken) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  moveRight() {
    this.x = this.x + this.speed;
  }

  moveLeft() {
    this.x = this.x - this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(mo) {
    return this.x + this.width - 40 >= mo.x && this.y + this.height >= mo.y && this.x - 25 <= mo.x && this.y < mo.y + mo.height;
  }

  isTooFar(mo) {
    return this.x + this.width + 400 >= mo.x && this.y + this.height >= mo.y && this.x <= mo.x && this.y < mo.y + mo.height;
  }

  isClose(mo) {
    return this.x + this.width + 100 >= mo.x && this.y + this.height >= mo.y && this.x <= mo.x && this.y < mo.y + mo.height;
  }

  isJumpAttack(mo) {
    return this.x + this.width - 40 >= mo.x && this.y + this.height == mo.y && this.x <= mo.x;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  hit(dmg) {
    this.energy -= dmg;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    // console.log(this.energy);
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
