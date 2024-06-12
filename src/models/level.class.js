class Level {
  enemies;
  clouds;
  backgroundObjects;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, level_end_x) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.level_end_x = level_end_x;
  }
}
