class Outro extends DrawableObject {
  x = 0;
  y = 0;
  height = 720;
  width = 1280;
  constructor() {
    super();
    let path = this.loadImage("/assets/img/9_intro_outro_screens/game_over/game over.png");
    this.img = path;
  }
}
