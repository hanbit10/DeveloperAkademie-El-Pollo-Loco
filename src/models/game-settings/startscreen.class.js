class StartScreen extends DrawableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;
  /**
   * Constructs a new instance of the StartScreen class and loads the start screen image.
   *
   * @return {void}
   */
  constructor() {
    super().loadImage("../assets/img/9_intro_outro_screens/start/startscreen_1.png");
  }
}
