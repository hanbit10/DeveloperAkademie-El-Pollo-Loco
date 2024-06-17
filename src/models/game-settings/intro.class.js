class Intro extends DrawableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;
  /**
   * Constructs a new instance of the class and loads an image.
   *
   * @return {void}
   */
  constructor() {
    super().loadImage("../assets/img/9_intro_outro_screens/win/win_2.png");
  }
}
