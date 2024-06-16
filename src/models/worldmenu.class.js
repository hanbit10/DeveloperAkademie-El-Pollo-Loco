class WorldMenu {
  background_sound = new Audio("../assets/audio/game-background.wav");
  boss_background_sound = new Audio("../assets/audio/boss-background.wav");
  gameover_sound = new Audio("../assets/audio/gameover.wav");
  gamewon_sound = new Audio("../assets/audio/youwon.mp3");
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

  showGameWon() {
    if (this.enemies[16].isDead()) this.gameWonSetting = true;
    if (this.gameWonSetting) {
      this.gameWon();
      if (!this.gameWonTiming)
        setTimeout(() => {
          this.addObjectsToMap(this.backgroundObjects);
          this.addToMap(this.GAME_WON);
          this.gameWonTiming = true;
        }, 2000);
      else {
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.GAME_WON);
      }
    }
  }

  showGameBoss() {
    if (this.character.x > 1400 || this.bossShown) {
      this.background_music = false;
      if (!this.background_music) {
        this.boss_background_sound.play();
        this.boss_background_sound.loop = true;
        this.background_sound.volume = 0;
        if (this.voice) this.boss_background_sound.volume = 1;
      }
      this.addToMap(this.statusBar[2]);
      this.bossShown = true;
    }
  }

  showGameMenu() {
    this.addToMap(this.GAME_MENU);
    let promise = this.background_sound.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
    this.background_sound.loop = true;
    if (!this.voice) this.background_sound.volume = 0;
    if (this.voice) this.background_sound.volume = 1;
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  showGameOver() {
    if (this.character.isDead()) this.gameOverSetting = true;
    if (this.gameOverSetting) {
      this.gameOver();
      if (!this.gameOverTiming)
        setTimeout(() => {
          this.addObjectsToMap(this.backgroundObjects);
          this.addToMap(this.GAME_OVER);
          this.gameOverTiming = true;
        }, 2000);
      else {
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.GAME_OVER);
      }
    }
  }
}
