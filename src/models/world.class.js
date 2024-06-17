class World extends WorldMenu {
  throwableObjects = [new ThrowableObject()];
  camera_x = 0;
  jumpAttack = false;
  bossShown = false;
  level = getLevel();
  character = this.level.character;
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
    this.draw();
    this.setWorld();
    this.run();
  }

  reset() {
    if (!this.voice) this.mute();
    if (this.voice) {
      console.log("is it working");
      this.unmute();
    }
    this.gameMenuSetting();
    this.character.reset();
    this.background_sound.currentTime = 0;
    this.boss_background_sound.currentTime = 0;
    this.resetObjects();
    this.resetStatusBar();
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

  enemiesChickens(enemy) {
    return enemy instanceof Chicken || enemy instanceof ChickenNormal;
  }

  characterJumpAttack(enemy) {
    return this.character.isColliding(enemy) && this.jumpAttack && this.enemiesChickens(enemy);
  }

  characterThrowAttack(enemy) {
    this.throwableObjects.forEach((throwableObject) => {
      if (throwableObject.isColliding(enemy)) {
        if (!throwableObject.alreadyCollided && !enemy.deadSetting) throwableObject.throwableCondition("breaking", enemy.deadSetting);
        if (this.enemiesChickens(enemy)) {
          throwableObject.alreadyCollided = true;
          enemy.dead();
        } else if (enemy instanceof Endboss) {
          throwableObject.alreadyCollided = true;
          enemy.hit(1.4);
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

    this.muteObjects();
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
    this.gameWonMute();
    this.character.pause();
    this.enemies.forEach((enemy) => {
      enemy.pause();
    });
  }

  gameWonMute() {
    this.throwableObjects.forEach((object) => {
      object.mute();
    });

    this.enemies.forEach((enemy) => {
      if (enemy instanceof Chicken || enemy instanceof ChickenNormal) enemy.mute();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.gameMenu) this.showGameContents();
    if (this.gameMenu) this.showGameMenu();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  showGameContents() {
    this.playBackgroundSound();
    this.ctx.translate(this.camera_x, 0);
    this.showObjects();
    this.showStatusBar();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.showGameBoss();
    this.showGameWon();
    this.showGameOver();
  }

  showObjects() {
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  showStatusBar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar[0]);
    this.addToMap(this.statusBar[1]);
    this.addToMap(this.statusBar[3]);
    this.ctx.translate(this.camera_x, 0);
  }

  playBackgroundSound() {
    if (this.background_music) {
      this.background_sound.play();
      this.background_sound.loop = true;
    }
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
    mo.drawOffsetFrame(this.ctx, mo);
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
