class StatusBar extends DrawableObject {
  CHARACTER_HEALTH_BAR = [
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "/assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.CHARACTER_HEALTH_BAR);
    this.x = 20;
    this.y = 10;
    this.height = 60;
    this.width = 200;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.CHARACTER_HEALTH_BAR[this.reseolveImageIndex()];
    this.img = this.imageCache[path];
  }

  reseolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else if (this.percentage > 0) {
      return 0;
    } else {
      return 0;
    }
  }
}
