class DrawableObject {
  img;
  imageCache = [];
  x = 100;
  y = 280;
  height = 150;
  width = 100;
  currentImage = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx, mo) {
    if (this.gameInstances()) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, mo.frameWidth, mo.frameHeight);
      ctx.stroke();
    }
    if (this instanceof Character) this.setCharacterFrame(ctx, mo);
  }

  gameInstances() {
    return (
      this instanceof Chicken || this instanceof Endboss || this instanceof ChickenNormal || this instanceof Coin || this instanceof Bottle
    );
  }

  setCharacterFrame(ctx, mo) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x + this.offset.bottom, this.y + this.offset.top, mo.frameWidth, mo.frameHeight);
    ctx.stroke();
  }
}
