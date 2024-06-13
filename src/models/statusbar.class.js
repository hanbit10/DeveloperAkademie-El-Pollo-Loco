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

  percentage = 100;

  constructor(type) {
    super();
    this.loadImages(this.CHARACTER_HEALTH_BAR);
    this.loadImages(this.COIN_STATUS_BAR);
    this.loadImages(this.BOTTLE_STATUS_BAR);
    this.loadImages(this.ENDBOSS_HEALTH_BAR);
    this.height = 60;
    this.width = 200;
    if (type == "character") {
      this.x = 20;
      this.y = 10;
      this.setPercentage(100);
    } else if (type == "coin") {
      this.x = 20;
      this.y = 60;
      this.setCoinPercentage(0);
    } else if (type == "endboss") {
      this.x = 500;
      this.y = 15;
      this.setBossPercentage(100);
    } else if (type == "bottle") {
      this.x = 20;
      this.y = 110;
      this.setBottlePercentage(0);
    }
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.CHARACTER_HEALTH_BAR[this.reseolveImageIndex()];
    this.img = this.imageCache[path];
  }

  setBossPercentage(percentage) {
    this.percentage = percentage;
    let path = this.ENDBOSS_HEALTH_BAR[this.reseolveImageIndex()];
    this.img = this.imageCache[path];
  }

  setCoinPercentage(percentage) {
    this.percentage = percentage;
    let path = this.COIN_STATUS_BAR[this.reseolveImageIndex()];
    this.img = this.imageCache[path];
  }

  setBottlePercentage(percentage) {
    this.percentage = percentage;
    let path = this.BOTTLE_STATUS_BAR[this.reseolveImageIndex()];
    this.img = this.imageCache[path];
  }

  reseolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else if (this.percentage >= 0) {
      return 0;
    } else {
      return 0;
    }
  }
}
