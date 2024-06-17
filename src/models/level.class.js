class Level {
  enemies;
  clouds;
  backgroundObjects;

  constructor(character, enemies, clouds, backgroundObjects, coins, bottles, statusBar, level_start_x, level_end_x) {
    this.character = character;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.statusBar = statusBar;
    this.level_start_x = level_start_x;
    this.level_end_x = level_end_x;
  }
}
