class Outro extends DrawableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;
  /**
   * Constructs a new instance of the Outro class.
   * Loads an image from the specified path.
   *
   * @return {void}
   */
  constructor() {
    super().loadImage("../assets/img/9_intro_outro_screens/game_over/game over.png");
  }
}
