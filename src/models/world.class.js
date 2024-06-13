class World {
  character = new Character();
  statusBar = [new StatusBar("character"), new StatusBar("coin"), new StatusBar("endboss"), new StatusBar("bottle")];
  throwableObjects = [new ThrowableObject()];
  level = level1;
  enemies = this.level.enemies;
  clouds = this.level.clouds;
  coins = this.level.coins;
  bottles = this.level.bottles;
  backgroundObjects = this.level.backgroundObjects;
  camera_x = 0;
  alreadyCollided = [false];
  enemiesDead = this.level.enemiesDead;
  // levelCleared = [false, false, false];
  jumpAttack = false;
  bossShown = false;
  background_sound = new Audio("/assets/audio/background.mp3");

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
    }, 200);

    setInterval(() => {
      this.checkFarness();
    }, 500);

    setInterval(() => {
      this.checkGame();
    });
  }

  checkGame() {
    if (this.character.isDead() || this.enemies[16].isDead()) {
      this.gameOver();
    }
  }

  gameOver() {
    this.background_sound.pause();
    this.background_sound.currentTime = 0;
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
        if (this.enemiesDead[enemies] == false && !this.jumpAttack) {
          this.character.hit(2);
          this.statusBar[0].setPercentage(this.character.energy);
        }
      }

      if (this.character.isColliding(enemy) && this.jumpAttack) {
        if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
          enemy.dead();
          this.enemiesDead[enemy.id] = true;
        }
      }
      let i = 0;
      this.throwableObjects.forEach((throwableObject) => {
        if (throwableObject.isColliding(enemy)) {
          if (this.alreadyCollided[i] == false && this.enemiesDead[enemies] == false) {
            throwableObject.throwableCondition("breaking", this.enemiesDead[enemy.id]);
          }
          if (enemy instanceof Chicken || enemy instanceof ChickenNormal) {
            this.alreadyCollided[i] = true;
            enemy.dead();
            this.enemiesDead[enemy.id] = true;
          } else if (enemy instanceof Endboss) {
            this.alreadyCollided[i] = true;
            enemy.hit(1);
            this.statusBar[2].setBossPercentage(enemy.energy);
            if (enemy.energy <= 0) {
              this.enemiesDead[enemy.id] = true;
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
    if (this.character.x > 1100 || this.bossShown) {
      this.addToMap(this.statusBar[2]);
      this.bossShown = true;
    }
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    //draw wird immer aufgerufen
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
