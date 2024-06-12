const level1 = new Level(
  [
    new Chicken(0,500),
    new Chicken(1,700),
    new Chicken(2,1000),
    new Chicken(3,1200),
    new Chicken(4,1400),
  ], 
  [
    new Cloud(),
  ],
  [
    new BackgroundObject("/assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("/assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("/assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("/assets/img/5_background/layers/air.png", 719*2),
    new BackgroundObject("/assets/img/5_background/layers/3_third_layer/2.png",-720),
    new BackgroundObject("/assets/img/5_background/layers/2_second_layer/2.png", -720),
    new BackgroundObject("/assets/img/5_background/layers/1_first_layer/2.png", -720),
    new BackgroundObject("/assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("/assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("/assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("/assets/img/5_background/layers/3_third_layer/2.png",720),
    new BackgroundObject("/assets/img/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("/assets/img/5_background/layers/1_first_layer/2.png", 720),
    new BackgroundObject("/assets/img/5_background/layers/3_third_layer/1.png", 720*2),
    new BackgroundObject("/assets/img/5_background/layers/2_second_layer/1.png", 720*2),
    new BackgroundObject("/assets/img/5_background/layers/1_first_layer/1.png", 720*2),
  ],
  [new Coin(200, 250), new Coin(250, 200), new Coin(300, 200), new Coin(350, 200), new Coin(400, 250), new Coin(850, 350), new Coin(900, 350), new Coin(950, 350), new Coin(950, 350), new Coin(950, 350), new Coin(1000, 200)],
  [new Bottle(200), new Bottle(250), new Bottle(300), new Bottle(400)],
  1440
)