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

  /**
   * Resets the game menu settings and timers.
   *
   * This function sets the gameOverSetting, gameWonSetting, gameMenu, gameOverPlayed,
   * gameWonPlayed, and bossShown properties to false. It also sets the gameOverTiming
   * and gameWonTiming properties to false after a delay of 2000 milliseconds.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks if the enemy at index 16 is dead and sets the gameWonSetting flag accordingly.
   * If gameWonSetting is true, it calls the gameWon() function and adds the necessary objects to the map.
   * If gameWonTiming is false, it sets a timeout to add the GAME_WON object to the map after 2000 milliseconds.
   * If gameWonTiming is true, it immediately adds the GAME_WON object to the map.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks if the character's x position is greater than 2100 or the boss has already been shown.
   * If conditions are met, stops the background music, plays the boss background sound, sets volume,
   * adds an element to the map, and updates the bossShown flag.
   *
   * @return {void} This function does not return anything.
   */
  showGameBoss() {
    if (this.character.x > 2100 || this.bossShown) {
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

  /**
   * Adds the GAME_MENU object to the map and sets up the background sound for autoplay.
   * Pauses the character and enemies.
   *
   * @return {void} This function does not return anything.
   */
  showGameMenu() {
    this.addToMap(this.GAME_MENU);
    let promise = this.background_sound.play();
    if (promise !== undefined) {
      promise.then((_) => {}).catch((error) => {});
    }
    this.background_sound.loop = true;
    if (!this.voice) this.background_sound.volume = 0;
    if (this.voice) this.background_sound.volume = 1;
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  /**
   * Checks if the character is dead and sets the gameOverSetting flag accordingly.
   * If gameOverSetting is true, it calls the gameOver() function and adds the necessary objects to the map.
   * If gameOverTiming is false, it sets a timeout to add the GAME_OVER object to the map after 2000 milliseconds.
   * If gameOverTiming is true, it immediately adds the GAME_OVER object to the map.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Mutes all throwable objects and enemies of type Chicken or ChickenNormal.
   *
   * @return {void} This function does not return anything.
   */
  gameWonMute() {
    this.throwableObjects.forEach((object) => {
      object.mute();
    });

    this.enemies.forEach((enemy) => {
      if (enemy instanceof Chicken || enemy instanceof ChickenNormal) enemy.mute();
    });
  }

  /**
   * Stops the game by muting the background sounds, playing the game won sound if it hasn't been played yet,
   * muting the game objects, and pausing the character and enemies.
   *
   * @return {void} This function does not return anything.
   */
  gameWon() {
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;
    if (!this.gameWonPlayed) {
      this.gamewon_sound.play();
      this.gameWonPlayed = true;
    }
    this.gameWonMute();
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  /**
   * Stops the game by muting the background sounds, playing the game over sound if it hasn't been played yet,
   * pausing the character and enemies, and muting all game objects.
   *
   * @return {void} This function does not return anything.
   */
  gameOver() {
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;
    if (!this.gameOverPlayed) {
      this.gameover_sound.play();
      this.gameOverPlayed = true;
    }
    this.muteObjects();
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  /**
   * Unmutes all the audio elements of the game objects.
   *
   * This function iterates through the `enemies`, `coins`, `bottles`, and `throwableObjects` arrays
   * and calls the `unmute` method on each object. It also calls the `unmute` method on the `character`
   * object.
   *
   * @return {void} This function does not return anything.
   */
  unmuteObjects() {
    this.character.unmute();
    this.enemies.forEach((enemy) => {
      enemy.unmute();
    });
    this.coins.forEach((coin) => {
      coin.unmute();
    });
    this.bottles.forEach((bottle) => {
      bottle.unmute();
    });
    this.throwableObjects.forEach((object) => {
      object.unmute();
    });
  }

  /**
   * Mutes all the character, enemies, coins, bottles, and throwable objects in the game.
   *
   * @return {void} This function does not return anything.
   */
  muteObjects() {
    this.character.mute();
    this.enemies.forEach((enemy) => {
      enemy.mute();
    });
    this.coins.forEach((coin) => {
      coin.mute();
    });
    this.bottles.forEach((bottle) => {
      bottle.mute();
    });
    setInterval(() => {
      this.throwableObjects.forEach((object) => {
        object.mute();
      });
    });
  }

  pauseGame() {
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
    this.character.pause();
  }

  continueGame() {
    this.enemies.forEach((enemy) => {
      enemy.continue();
    });

    this.character.continue();
  }
}
