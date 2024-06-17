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
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, mo.width, mo.height);
      ctx.stroke();
    }
  }

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

  drawOffsetFrame(ctx, mo) {
    if (this.gameInstances()) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
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
