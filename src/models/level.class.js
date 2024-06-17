class Level {
  enemies;
  clouds;
  backgroundObjects;

  /**
   * Constructor for creating a new Level.
   *
   * @param {type} character - description of character parameter
   * @param {type} enemies - description of enemies parameter
   * @param {type} clouds - description of clouds parameter
   * @param {type} backgroundObjects - description of backgroundObjects parameter
   * @param {type} coins - description of coins parameter
   * @param {type} bottles - description of bottles parameter
   * @param {type} statusBar - description of statusBar parameter
   * @param {type} level_start_x - description of level_start_x parameter
   * @param {type} level_end_x - description of level_end_x parameter
   * @return {type} description of return value
   */
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
