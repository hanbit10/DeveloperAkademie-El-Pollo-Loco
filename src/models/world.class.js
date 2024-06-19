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

  /**
   * Initializes a new instance of the World class.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard object for handling keyboard events.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Resets the state of the object.
   *
   * @return {void} This function does not return anything.
   */
  reset() {
    if (!this.voice) this.mute();
    if (this.voice) {
      this.unmute();
    }
    this.gameMenuSetting();
    this.character.reset();
    this.background_sound.currentTime = 0;
    this.boss_background_sound.currentTime = 0;
    this.resetObjects();
    this.resetStatusBar();
  }

  /**
   * Resets the state of all objects in the world, including enemies, clouds, coins, and bottles.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Resets the status bar by updating the percentage and image path for each status bar element.
   *
   * @return {void} This function does not return anything.
   */
  resetStatusBar() {
    this.statusBar[0].setPercentage(this.character.energy, "character");
    this.statusBar[1].setPercentage(this.character.coin, "coin");
    this.statusBar[2].setPercentage(this.enemies[16].energy, "boss");
    this.statusBar[3].setPercentage(this.character.bottle, "bottle");
  }

  /**
   * Sets the world property of the character.
   *
   * @return {void} This function does not return anything.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game logic in a loop, checking for jumps, collisions, throw objects, buying items, and checking farness.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks if the player can buy a bottle and executes the necessary actions if true.
   *
   * @return {void} This function does not return anything.
   */
  checkBuy() {
    if (this.keyboard.B && this.character.coin > 10) {
      this.character.collected("bottle");
      this.character.buyBottle();
      this.statusBar[1].setPercentage(this.character.coin, "coin");
      this.statusBar[3].setPercentage(this.character.bottle, "bottle");
    }
  }

  /**
   * Checks the distance between the character and each enemy in the level.

   * @return {void} This function does not return anything.
   */
  checkFarness() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (this.character.isClose(enemy)) enemy.checkingCharacter("close");
        else if (this.character.isTooFar(enemy)) enemy.checkingCharacter("tooFar");
        else enemy.checkingCharacter("saveZone");
      }
    });
  }

  /**
   * Mutes the audio and visual elements of the game, making it silent.
   *
   * @return {void} This function does not return anything.
   */
  mute() {
    this.voice = false;
    this.background_sound.volume = 0;
    this.boss_background_sound.volume = 0;
    this.gameover_sound.volume = 0;
    this.gamewon_sound.volume = 0;
    this.muteObjects();
  }

  /**
   * Unmutes the audio elements of the game.
   *
   * @return {void} This function does not return anything.
   */
  unmute() {
    this.voice = true;
    this.background_sound.volume = 1;
    this.boss_background_sound.volume = 0;
    this.gameover_sound.volume = 1;
    this.gamewon_sound.volume = 1;
    this.unmuteObjects();
  }

  /**
   * Checks if the character is above the ground and sets the jumpAttack flag accordingly.
   *
   * @return {void} This function does not return anything.
   */
  checkJump() {
    if (this.character.isAboveGround()) {
      setTimeout(() => {
        this.jumpAttack = true;
      }, 220);
    } else {
      this.jumpAttack = false;
    }
  }

  /**
   * Checks if the character can throw objects and performs the throwing action if conditions are met.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks if the character is throwing an object to the right.
   *
   * @return {boolean} Returns true if the character is not facing the opposite direction and has a bottle, otherwise returns false.
   */
  characterThrowingRight() {
    return !this.character.otherDirection && this.character.bottle > 0;
  }

  /**
   * Checks if the character is throwing an object to the left.
   *
   * @return {boolean} Returns true if the character is facing the opposite direction and has a bottle, otherwise returns false.
   */
  characterThrowingLeft() {
    return this.character.otherDirection && this.character.bottle > 0;
  }

  /**
   * Checks for collisions between the character and enemies, and performs appropriate actions.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks if the character is getting hurt by the enemy.
   *
   * @param {Object} enemy - The enemy object to check for collision.
   * @return {boolean} Returns true if the character is colliding with the enemy and the jump attack is not active and the enemy is not dead, otherwise returns false.
   */
  characterGetHurtBy(enemy) {
    return this.character.isColliding(enemy) && !this.jumpAttack && !enemy.deadSetting;
  }

  /**
   * Checks if the given enemy is an instance of Chicken or ChickenNormal.
   *
   * @param {Object} enemy - The enemy object to check.
   * @return {boolean} Returns true if the enemy is an instance of Chicken or ChickenNormal, otherwise returns false.
   */
  enemiesChickens(enemy) {
    return enemy instanceof Chicken || enemy instanceof ChickenNormal;
  }

  /**
   * Checks if the character is performing a jump attack on the specified enemy.
   *
   * @param {Object} enemy - The enemy object to check for collision.
   * @return {boolean} Returns true if the character is colliding with the enemy, the jump attack is active, and the enemy is a chicken or a chicken normal, otherwise returns false.
   */
  characterJumpAttack(enemy) {
    return this.character.isColliding(enemy) && this.jumpAttack && this.enemiesChickens(enemy);
  }

  /**
   * Iterates through the throwableObjects to check for collisions with the enemy and performs various actions based on different conditions.
   *
   * @param {Object} enemy - The enemy object to check for collision.
   * @return {void} This function does not return anything.
   */
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

  /**
   * Checks for collisions between the character and coins in the level, and performs appropriate actions.
   *
   * @return {void} This function does not return anything.
   */
  collidedCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.collect("coin");
        this.character.collected("coin");
        this.statusBar[1].setPercentage(this.character.coin, "coin");
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles in the level, and performs appropriate actions.
   *
   * @return {void} This function does not return anything.
   */
  collidedBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.collect("bottle");
        this.character.collected("bottle");
        this.statusBar[3].setPercentage(this.character.bottle, "bottle");
      }
    });
  }

  /**
   * Draws the game contents or the game menu on the canvas.
   * Clears the canvas before drawing.
   * Uses requestAnimationFrame to continuously redraw the game.
   *
   * @return {void} This function does not return anything.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.gameMenu) this.showGameContents();
    if (this.gameMenu) this.showGameMenu();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws the game contents on the canvas.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * Adds all the objects to the map.
   *
   * @return {void} This function does not return anything.
   */
  showObjects() {
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Translates the canvas context by the value of camera_x to the left,
   * adds the status bar elements to the map, and then translates the
   * context back by the value of camera_x to the right.
   *
   * @return {void} This function does not return anything.
   */
  showStatusBar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar[0]);
    this.addToMap(this.statusBar[1]);
    this.addToMap(this.statusBar[3]);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Plays the background sound if the background music flag is set to true.
   *
   * @return {void} This function does not return anything.
   */
  playBackgroundSound() {
    if (this.background_music) {
      this.background_sound.play();
      this.background_sound.loop = true;
    }
  }

  /**
   * Add objects to the map.
   *
   * @param {Array} objs - The array of objects to add to the map.
   * @return {void} This function does not return anything.
   */
  addObjectsToMap(objs) {
    objs.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Adds an object to the map by drawing it, its frame, and its offset frame on the canvas context.
   * If the object has a property 'otherDirection' set to true, the object is flipped before drawing.
   *
   * @param {Object} mo - The object to be added to the map.
   * @return {void} This function does not return anything.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx, mo);
    mo.drawOffsetFrame(this.ctx, mo);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the image by saving the current context, translating the canvas to the right by the image width,
   * scaling the canvas by -1 in the x-axis, and updating the x-coordinate of the image to its negative value.
   *
   * @param {Object} mo - The object representing the image to be flipped.
   * @return {void} This function does not return anything.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image back by resetting the x-coordinate of the image and restoring the canvas context.
   *
   * @param {Object} mo - The object representing the image to be flipped back.
   * @return {void} This function does not return anything.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
