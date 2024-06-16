class StatusBar extends DrawableObject {
  CHARACTER_HEALTH_BAR = [
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  COIN_STATUS_BAR = [
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "/assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  BOTTLE_STATUS_BAR = [
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "/assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  ENDBOSS_HEALTH_BAR = [
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "/assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
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

  loadAllImages() {
    this.loadImages(this.CHARACTER_HEALTH_BAR);
    this.loadImages(this.COIN_STATUS_BAR);
    this.loadImages(this.BOTTLE_STATUS_BAR);
    this.loadImages(this.ENDBOSS_HEALTH_BAR);
  }

  setPercentage(percentage, imgPath) {
    this.percentage = percentage;
    let path = this.getStatusImages(imgPath);
    this.img = this.imageCache[path];
  }

  getStatusImages(img) {
    return this.statusBars[img][this.resolveImageIndex()];
  }

  resolveImageIndex() {
    return Math.min(5, Math.floor(this.percentage / 20));
  }
}
