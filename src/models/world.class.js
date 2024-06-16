class World {
  character = new Character();
  statusBar = [new StatusBar("character"), new StatusBar("coin"), new StatusBar("endboss"), new StatusBar("bottle")];
  throwableObjects = [new ThrowableObject()];
  camera_x = 0;
  jumpAttack = false;
  bossShown = false;
  background_sound = new Audio("/assets/audio/game-background.wav");
  boss_background_sound = new Audio("/assets/audio/boss-background.wav");
  gameover_sound = new Audio("/assets/audio/gameover.wav");
  gamewon_sound = new Audio("/assets/audio/youwon.mp3");
  GAME_OVER = new Outro();
  GAME_WON = new Intro();
  GAME_MENU = new StartScreen();

  background_music = true;
  level = getLevel();
  enemies = this.level.enemies;
  clouds = this.level.clouds;
  coins = this.level.coins;
  bottles = this.level.bottles;
  backgroundObjects = this.level.backgroundObjects;
  playBackground = false;
  voice = true;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  gameOverPlayed = false;
  gameOverSetting = false;
  gameOverTiming = false;

  gameWonPlayed = false;
  gameWonSetting = false;
  gameWonTiming = false;

  gameMenu = true;

  reset() {
    this.gameOverSetting = false;
    setTimeout(() => {
      this.gameOverTiming = false;
    }, 2000);

    this.gameWonSetting = false;
    setTimeout(() => {
      this.gameWonTiming = false;
    }, 2000);

    this.gameOverPlayed = false;
    this.gameWonPlayed = false;
    this.bossShown = false;
    this.character.reset();
    this.background_sound.currentTime = 0;
    this.boss_background_sound.currentTime = 0;
    this.statusBar[0].setPercentage(this.character.energy, "character");
    this.statusBar[1].setPercentage(this.character.coin, "coin");
    this.statusBar[3].setPercentage(this.character.bottle, "bottle");
    this.enemies.forEach((enemy) => {
      enemy.reset();
    });
    this.statusBar[2].setPercentage(this.enemies[16].energy, "boss");
    this.clouds.forEach((cloud) => {
      cloud.reset();
    });
    this.coins.forEach((coin) => {
      coin.reset();
    });
    this.bottles.forEach((bottle) => {
      bottle.reset();
    });
    if (!this.voice) {
      // this.background_sound.volume = 0;
      this.mute();
    }
    if (this.voice) {
      // this.background_sound.volume = 1;
      this.unmute();
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkJump();
      this.checkCollisions();
    }, 50);

    setInterval(() => {
      this.checkThrowObjects();
      this.checkBuy();
      this.checkFarness();
    }, 200);
  }

  checkBuy() {
    if (this.keyboard.B && this.character.coin > 10) {
      this.character.collected("bottle");
      this.character.buyBottle();
      this.statusBar[1].setPercentage(this.character.coin, "coin");
      this.statusBar[3].setPercentage(this.character.bottle, "bottle");
    }
  }

  checkFarness() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (this.character.isClose(enemy)) enemy.checkingCharacter("close");
        else if (this.character.isTooFar(enemy)) enemy.checkingCharacter("tooFar");
        else enemy.checkingCharacter("saveZone");
      }
    });
  }

  mute() {
    this.voice = false;
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;
    this.gameover_sound.volume = 0;
    this.gamewon_sound.volume = 0;
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

  unmute() {
    this.voice = true;
    this.background_sound.volume = 1;
    this.boss_background_sound.muted;
    this.gameover_sound.volume = 1;
    this.gamewon_sound.volume = 1;
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

  checkJump() {
    if (this.character.isAboveGround()) {
      setTimeout(() => {
        this.jumpAttack = true;
      }, 250);
    } else {
      this.jumpAttack = false;
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottle > 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
      if (!this.character.otherDirection && this.character.bottle > 0) {
        bottle.throwableCondition("throwing");
        this.character.throwBottle();
        this.statusBar[3].setPercentage(this.character.bottle, "bottle");
      } else if (this.character.otherDirection && this.character.bottle > 0) {
        bottle.throwableCondition("throwingLeft");
        this.character.throwBottle();
        this.statusBar[3].setPercentage(this.character.bottle, "bottle");
      }
    }
  }
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.jumpAttack) {
        if (enemy.deadSetting == false && !this.jumpAttack) {
          this.character.hit(2);
          this.statusBar[0].setPercentage(this.character.energy, "character");
        }
      }

      if (this.character.isColliding(enemy) && this.jumpAttack) {
        if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
          enemy.energy = 0;
          enemy.dead();
          enemy.deadSetting = true;
        }
      }
      this.throwableObjects.forEach((throwableObject) => {
        if (throwableObject.isColliding(enemy)) {
          if (throwableObject.alreadyCollided == false && enemy.deadSetting == false) {
            throwableObject.throwableCondition("breaking", enemy.deadSetting);
          }
          if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
            throwableObject.alreadyCollided = true;
            enemy.energy = 0;
            enemy.dead();
            enemy.deadSetting = true;
          } else if (enemy instanceof Endboss) {
            throwableObject.alreadyCollided = true;
            enemy.hit(5.4);
            this.statusBar[2].setPercentage(enemy.energy, "boss");
            if (enemy.energy <= 0) {
              enemy.dead();
              enemy.deadSetting = true;
            }
          }
        }
      });
    });

    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.collect("coin");
        this.character.collected("coin");
        this.statusBar[1].setPercentage(this.character.coin, "coin");
      }
    });

    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.collect("bottle");
        this.character.collected("bottle");
        this.statusBar[3].setPercentage(this.character.bottle, "bottle");
      }
    });
  }

  gameOver() {
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;

    if (!this.gameOverPlayed) {
      this.gameover_sound.play();
      this.gameOverPlayed = true;
    }

    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  gameWon() {
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;
    if (!this.gameWonPlayed) {
      this.gamewon_sound.play();
      this.gameWonPlayed = true;
    }
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log("this.gameMenu", this.gameMenu);
    if (!this.gameMenu) {
      if (this.background_music) {
        this.background_sound.play();
        this.background_sound.loop = true;
      }
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.backgroundObjects);
      this.addObjectsToMap(this.clouds);
      this.addObjectsToMap(this.coins);
      this.addObjectsToMap(this.bottles);
      this.addObjectsToMap(this.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBar[0]);
      this.addToMap(this.statusBar[1]);
      this.addToMap(this.statusBar[3]);

      if (this.character.x > 1400 || this.bossShown) {
        this.background_music = false;
        if (!this.background_music) {
          this.boss_background_sound.play();
          this.boss_background_sound.loop = true;
          this.background_sound.volume = 0;
          if (this.voice) {
            this.boss_background_sound.volume = 1;
          }
        }
        this.addToMap(this.statusBar[2]);
        this.bossShown = true;
      }
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);

      if (this.character.isDead()) {
        this.gameOverSetting = true;
      }

      if (this.enemies[16].isDead()) {
        this.gameWonSetting = true;
      }

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

      // console.log("gameOverTiming", this.gameOverTiming);

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
    if (this.gameMenu) {
      this.addToMap(this.GAME_MENU);
      this.background_sound.play();
      this.background_sound.loop = true;
      if (!this.voice) {
        this.background_sound.volume = 0;
      }
      if (this.voice) {
        this.background_sound.volume = 1;
      }
      this.character.pause();
      this.enemies.forEach((enemy) => {
        enemy.pause();
      });
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objs) {
    objs.forEach((obj) => {
      this.addToMap(obj);
    });
  }
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx, mo);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
