class WorldMenu {
  background_sound = new Audio("/assets/audio/game-background.wav");
  boss_background_sound = new Audio("/assets/audio/boss-background.wav");
  gameover_sound = new Audio("/assets/audio/gameover.wav");
  gamewon_sound = new Audio("/assets/audio/youwon.mp3");
  GAME_OVER = new Outro();
  GAME_WON = new Intro();
  GAME_MENU = new StartScreen();
  playBackground = false;
  background_music = true;
  voice = true;
  gameOverPlayed = false;
  gameOverSetting = false;
  gameOverTiming = false;
  gameWonPlayed = false;
  gameWonSetting = false;
  gameWonTiming = false;
  gameMenu = true;

  gameMenuSetting() {
    this.gameOverSetting = false;
    this.gameWonSetting = false;
    this.gameMenu = false;
    this.gameOverPlayed = false;
    this.gameWonPlayed = false;
    this.bossShown = false;
    setTimeout(() => {
      this.gameOverTiming = false;
      this.gameWonTiming = false;
    }, 2000);
  }
}
