let level1;

/**
 * Creates a new Level object with the specified parameters for the Level 1 game.
 *
 * @return {Level} The Level object representing Level 1.
 */
function getLevel() {
  level1 = new Level(
    new Character(),
    [
      new Chicken(0, 800),
      new Chicken(1, 1000),
      new Chicken(2, 1300),
      new Chicken(3, 1500),
      new Chicken(4, 1700),
      new ChickenNormal(5, 1300),
      new ChickenNormal(6, 1450),
      new ChickenNormal(7, 1700),
      new Chicken(8, 1900),
      new Chicken(9, 2100),
      new Chicken(10, 2200),
      new ChickenNormal(11, 2400),
      new ChickenNormal(12, 2700),
      new ChickenNormal(13, 2900),
      new ChickenNormal(14, 3100),
      new ChickenNormal(15, 3400),
      new Endboss(2800),
    ],
    [new Cloud(300), new Cloud(1000), new Cloud(1700)],
    [
      new BackgroundObject("../assets/img/5_background/layers/air.png", -719),
      new BackgroundObject("../assets/img/5_background/layers/air.png", 0),
      new BackgroundObject("../assets/img/5_background/layers/air.png", 719),
      new BackgroundObject("../assets/img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("../assets/img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("../assets/img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", -720),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", -720),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", -720),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", 720),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", 720),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", 720),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 720 * 2),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 720 * 2),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 720 * 2),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", 720 * 3),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", 720 * 3),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", 720 * 3),
      new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 720 * 4),
      new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 720 * 4),
      new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 720 * 4),
    ],
    [
      new Coin(400, 250),
      new Coin(450, 200),
      new Coin(500, 200),
      new Coin(550, 200),
      new Coin(600, 250),
      new Coin(1050, 350),
      new Coin(1100, 350),
      new Coin(1150, 350),
      new Coin(1200, 200),
      new Coin(1250, 200),
      new Coin(2600, 200),
      new Coin(2600, 250),
      new Coin(2600, 300),
      new Coin(2600, 350),
    ],
    [new Bottle(400), new Bottle(650), new Bottle(900), new Bottle(1100), new Bottle(1400)],
    [new StatusBar("character"), new StatusBar("coin"), new StatusBar("endboss"), new StatusBar("bottle")],
    0,
    2940
  );

  return level1;
}
