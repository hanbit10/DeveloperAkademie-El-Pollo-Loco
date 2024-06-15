class MoveableObject extends DrawableObject {
  gravity = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  coin = 0;
  bottle = 0;
  lastHit = 1;
  speed = 0.15;

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
    return (
      this.x + this.width - 40 >= mo.x &&
      this.y + this.height >= mo.y + mo.height / 2 - 50 &&
      this.x <= mo.x + mo.width - 30 &&
      this.y < mo.y + mo.height
    );
  }

  isTooFar(mo) {
    return this.x + this.width + 400 >= mo.x && this.x <= mo.x;
  }

  isClose(mo) {
    return this.x + this.width + 120 >= mo.x && this.x <= mo.x;
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
  }

  collected(type) {
    if (type == "coin") this.coin += 10;
    if (type == "bottle") this.bottle += 20;
  }

  buyBottle() {
    this.coin -= 20;
  }

  throwBottle() {
    this.bottle -= 20;
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
