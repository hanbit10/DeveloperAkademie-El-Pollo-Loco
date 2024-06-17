class StatusBar extends DrawableObject {
  CHARACTER_HEALTH_BAR = [
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  COIN_STATUS_BAR = [
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  BOTTLE_STATUS_BAR = [
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  ENDBOSS_HEALTH_BAR = [
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "../assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  positioning = {
    character: { x: 20, y: 10, percentage: 100 },
    coin: { x: 20, y: 60, percentage: 0 },
    endboss: { x: 500, y: 15, percentage: 100 },
    bottle: { x: 20, y: 110, percentage: 0 },
  };

  statusBars = {
    character: this.CHARACTER_HEALTH_BAR,
    boss: this.ENDBOSS_HEALTH_BAR,
    coin: this.COIN_STATUS_BAR,
    bottle: this.BOTTLE_STATUS_BAR,
  };

  percentage;

  /**
   * Constructs a new instance of the StatusBar class.
   *
   * @param {string} type - The type of status bar to create.
   */
  constructor(type) {
    super();
    const positions = this.positioning;
    this.height = 60;
    this.width = 200;
    this.loadAllImages();
    if (positions[type]) {
      this.x = positions[type].x;
      this.y = positions[type].y;
      this.percentage = positions[type].percentage;
    }
  }

  /**
   * Loads all the images for the status bar.
   *
   * This function loads the images for the character health bar, coin status bar, bottle status bar, and end boss health bar.
   * It uses the `loadImages` method to load each image.
   *
   * @return {void} This function does not return anything.
   */
  loadAllImages() {
    this.loadImages(this.CHARACTER_HEALTH_BAR);
    this.loadImages(this.COIN_STATUS_BAR);
    this.loadImages(this.BOTTLE_STATUS_BAR);
    this.loadImages(this.ENDBOSS_HEALTH_BAR);
  }

  /**
   * Sets the percentage and image path for the status bar.
   *
   * @param {type} percentage - The percentage value to set.
   * @param {type} imgPath - The path of the image.
   * @return {type} This function does not return anything.
   */
  setPercentage(percentage, imgPath) {
    this.percentage = percentage;
    let path = this.getStatusImages(imgPath);
    this.img = this.imageCache[path];
  }

  /**
   * Returns the image path for the given status bar image based on the current percentage.
   *
   * @param {string} img - The key of the status bar image in the statusBars object.
   * @return {string} The image path for the current percentage.
   */
  getStatusImages(img) {
    return this.statusBars[img][this.resolveImageIndex()];
  }

  /**
   * A description of the entire function.
   *
   * @return {number} The minimum of 5 and the floor value of this.percentage divided by 20.
   */
  resolveImageIndex() {
    return Math.min(5, Math.floor(this.percentage / 20));
  }
}
