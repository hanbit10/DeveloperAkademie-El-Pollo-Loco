class World {
  character = new Character();
  statusBar = [new StatusBar("character"), new StatusBar("coin"), new StatusBar("endboss"), new StatusBar("bottle")];
  throwableObjects = [new ThrowableObject()];
  camera_x = 0;
  alreadyCollided = [false];
  jumpAttack = false;
  bossShown = false;
  background_sound = new Audio("/assets/audio/game-background.wav");
  boss_background_sound = new Audio("/assets/audio/boss-background.wav");
  gameover_sound = new Audio("/assets/audio/gameover.wav");
  gameoverPlayed = false;
  GAME_OVER = new Outro();
  level = getLevel();
  enemies = this.level.enemies;
  clouds = this.level.clouds;
  coins = this.level.coins;
  bottles = this.level.bottles;
  backgroundObjects = this.level.backgroundObjects;
  playBackground = false;
  run1;
  run2;
  run3;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // this.background_sound.volume = 0.5;
    // this.background_sound.play();
    // this.background_sound.loop = true;
    this.draw();
    this.setWorld();
    this.run();
  }

  gameOverSetting = false;
  reset() {
    // this.level = getLevel();
    this.gameOverSetting = false;
    this.character.energy = 100;
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
    // this.background_sound.srcObject = null;
    // this.character.walking_sound.srcObject = null;
    // this.character.jump_sound.srcObject = null;
    // this.character.gothit_sound.srcObject = null;
    // this.enemies.forEach((enemy) => {
    //   if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
    //     enemy.killed_sound.srcObject = null;
    //     enemy.buck_sound.srcObject = null;
    //     clearInterval(enemy.animateImgs);
    //     clearInterval(enemy.moving);
    //   }
    //   if (enemy instanceof Endboss) {
    //     enemy.killed_sound.srcObject = null;
    //     enemy.hurt_sound.srcObject = null;
    //     enemy.attack_sound.srcObject = null;
    //     clearInterval(enemy.bossAlive);
    //     clearInterval(enemy.bossDead);
    //     clearInterval(enemy.moving);
    //   }
    // });
    // this.clouds.forEach((cloud) => {
    //   clearInterval(cloud.animation);
    // });
    // clearInterval(this.character.animate1);
    // clearInterval(this.character.animate2);
    // clearInterval(this.character.animate3);
    // clearInterval(this.run1);
    // clearInterval(this.run2);
    // clearInterval(this.run3);
    // console.log(this.character);
    // // Object.assign(this.character, null);
    // for (const key in this.character) {
    //   delete this.character[key];
    // }
    // // this.character = new Character();
    // Object.assign(this, null);
    // Object.assign(this, new World(this.canvas, this.keyboard));
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.run1 = setInterval(() => {
      this.playBackgroundMusic();
      this.checkJump();
      this.checkCollisions();
    }, 50);

    this.run2 = setInterval(() => {
      this.checkThrowObjects();
      this.checkBuy();
    }, 200);

    this.run3 = setInterval(() => {
      this.checkFarness();
    }, 500);
  }

  playBackgroundMusic() {
    if (!this.playBackground) {
      this.background_sound.volume = 0.5;
      this.background_sound.play();
      this.background_sound.loop = true;
      this.playBackground = true;
    }
  }

  checkBuy() {
    if (this.keyboard.B && this.character.coin > 0) {
      this.character.collected("bottle");
      this.character.buyBottle();
      this.statusBar[1].setCoinPercentage(this.character.coin);
      this.statusBar[3].setBottlePercentage(this.character.bottle);
    }
  }

  checkFarness() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (this.character.isClose(enemy)) {
          enemy.checkingCharacter("close");
        } else if (this.character.isTooFar(enemy)) {
          enemy.checkingCharacter("tooFar");
        } else {
          enemy.checkingCharacter("saveZone");
        }
      }
    });
  }

  // checkLevels() {
  //   let level1Enemies = this.enemiesDead.slice(0, 6);
  //   let check1 = level1Enemies.every((element) => element == true);
  //   if (check1) {
  //     if (!this.levelCleared[0]) {
  //       console.log("level 1 cleared");
  //       this.level.level_start_x = this.level.level_end_x - 500;
  //       this.level.level_end_x = this.level.level_end_x * 2;
  //       this.levelCleared[0] = true;
  //     }
  //   }
  // }

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
      this.alreadyCollided.push(false);
      if (!this.character.otherDirection && this.character.bottle > 0) {
        bottle.throwableCondition("throwing");
        this.character.throwBottle();
        this.statusBar[3].setBottlePercentage(this.character.bottle);
      } else if (this.character.otherDirection && this.character.bottle > 0) {
        bottle.throwableCondition("throwingLeft");
        this.character.throwBottle();
        this.statusBar[3].setBottlePercentage(this.character.bottle);
      }
    }
  }
  checkCollisions() {
    // if (this.character.isAboveGround()) {
    //   setTimeout(() => {
    //     this.jumpAttack = true;
    //   }, 250);
    // } else {
    //   this.jumpAttack = false;
    // }

    let enemies = 0;
    this.level.enemies.forEach((enemy) => {
      // console.log(this.jumpAttack);
      if (this.character.isColliding(enemy) && !this.jumpAttack) {
        if (enemy.deadSetting == false && !this.jumpAttack) {
          this.character.hit(2);
          this.statusBar[0].setPercentage(this.character.energy);
        }
      }

      if (this.character.isColliding(enemy) && this.jumpAttack) {
        if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
          enemy.dead();
          enemy.deadSetting = true;
          // this.enemiesDead[enemy.id] = true;
        }
      }
      let i = 0;
      this.throwableObjects.forEach((throwableObject) => {
        if (throwableObject.isColliding(enemy)) {
          if (this.alreadyCollided[i] == false && enemy.deadSetting == false) {
            throwableObject.throwableCondition("breaking", enemy.deadSetting);
          }
          if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
            this.alreadyCollided[i] = true;
            enemy.dead();
            // this.enemiesDead[enemy.id] = true;
            enemy.deadSetting = true;
          } else if (enemy instanceof Endboss) {
            this.alreadyCollided[i] = true;
            enemy.hit(5.4);
            this.statusBar[2].setBossPercentage(enemy.energy);
            if (enemy.energy <= 0) {
              // this.enemiesDead[enemy.id] = true;
              enemy.deadSetting = true;
            }
          }
        }
        i++;
      });
      enemies++;
    });

    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.collect("coin");
        // console.log(coin.energy);
        this.character.collected("coin");
        this.statusBar[1].setCoinPercentage(this.character.coin);
      }
    });
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.collect("bottle");
        this.character.collected("bottle");
        this.statusBar[3].setBottlePercentage(this.character.bottle);
      }
    });
  }

  gameOver() {
    this.background_sound.pause();
    this.background_sound.currentTime = 0;
    this.boss_background_sound.pause();
    this.boss_background_sound.currentTime = 0;
    if (!this.gameoverPlayed) {
      this.gameover_sound.play();
      this.gameoverPlayed = true;
    }
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.GAME_OVER);
    // this.draw();
    // this.GAME_OVER;
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
      this.background_sound.pause();
      this.boss_background_sound.play();
      this.boss_background_sound.loop = true;
      this.addToMap(this.statusBar[2]);
      this.bossShown = true;
    }
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    //draw wird immer aufgerufen
    console.log(this.character.isDead());
    if (this.character.isDead() || this.enemies[16].isDead()) {
      // console.log(this.character.isDead());
      // console.log("the character is dead!");
      // this.gameOver();
      this.gameOverSetting = true;
    }

    if (this.gameOverSetting) {
      this.gameOver();
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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx, mo);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
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
