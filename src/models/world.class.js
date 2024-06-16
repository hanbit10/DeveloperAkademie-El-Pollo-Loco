class World extends WorldMenu {
  character = new Character();
  throwableObjects = [new ThrowableObject()];
  camera_x = 0;
  jumpAttack = false;
  bossShown = false;
  level = getLevel();
  statusBar = this.level.statusBar;
  enemies = this.level.enemies;
  clouds = this.level.clouds;
  coins = this.level.coins;
  bottles = this.level.bottles;
  backgroundObjects = this.level.backgroundObjects;

  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    console.log(this.level);
    this.draw();
    this.setWorld();
    this.run();
  }

  reset() {
    this.gameMenuSetting();
    this.character.reset();
    this.background_sound.currentTime = 0;
    this.boss_background_sound.currentTime = 0;
    this.resetObjects();
    this.resetStatusBar();
    if (!this.voice) this.mute();
    if (this.voice) this.unmute();
  }

  resetObjects() {
    this.enemies.forEach((enemy) => {
      enemy.reset();
    });
    this.clouds.forEach((cloud) => {
      cloud.reset();
    });
    this.coins.forEach((coin) => {
      coin.reset();
    });
    this.bottles.forEach((bottle) => {
      bottle.reset();
    });
  }

  resetStatusBar() {
    this.statusBar[0].setPercentage(this.character.energy, "character");
    this.statusBar[1].setPercentage(this.character.coin, "coin");
    this.statusBar[2].setPercentage(this.enemies[16].energy, "boss");
    this.statusBar[3].setPercentage(this.character.bottle, "bottle");
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
    this.muteObjects();
  }

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

  unmute() {
    this.voice = true;
    this.background_sound.volume = 1;
    this.boss_background_sound.volume = 0;
    this.gameover_sound.volume = 1;
    this.gamewon_sound.volume = 1;
    this.unmuteObjects();
  }

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
      if (this.characterThrowingRight()) bottle.throwableCondition("throwing");
      else if (this.characterThrowingLeft()) bottle.throwableCondition("throwingLeft");
      this.character.throwBottle();
      this.statusBar[3].setPercentage(this.character.bottle, "bottle");
    }
  }

  characterThrowingRight() {
    return !this.character.otherDirection && this.character.bottle > 0;
  }

  characterThrowingLeft() {
    return this.character.otherDirection && this.character.bottle > 0;
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterGetHurtBy(enemy)) {
        this.character.hit(2);
        this.statusBar[0].setPercentage(this.character.energy, "character");
      }
      if (this.characterJumpAttack(enemy)) enemy.dead();
      this.characterThrowAttack(enemy);
    });
    this.collidedCoin();
    this.collidedBottle();
  }

  characterGetHurtBy(enemy) {
    return this.character.isColliding(enemy) && !this.jumpAttack && !enemy.deadSetting;
  }

  characterJumpAttack(enemy) {
    return this.character.isColliding(enemy) && this.jumpAttack && this.enemiesChickens(enemy);
  }

  enemiesChickens(enemy) {
    return enemy instanceof Chicken || enemy instanceof ChickenNormal;
  }

  characterThrowAttack(enemy) {
    this.throwableObjects.forEach((throwableObject) => {
      if (throwableObject.isColliding(enemy)) {
        if (!throwableObject.alreadyCollided && !enemy.deadSetting) {
          throwableObject.throwableCondition("breaking", enemy.deadSetting);
        } else if (this.enemiesChickens(enemy)) {
          throwableObject.alreadyCollided = true;
          enemy.dead();
        } else if (enemy instanceof Endboss) {
          throwableObject.alreadyCollided = true;
          enemy.hit(5.4);
          this.statusBar[2].setPercentage(enemy.energy, "boss");
          if (enemy.energy <= 0) enemy.dead();
        }
      }
    });
  }

  collidedCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.collect("coin");
        this.character.collected("coin");
        this.statusBar[1].setPercentage(this.character.coin, "coin");
      }
    });
  }

  collidedBottle() {
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
