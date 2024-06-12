class Level {
  enemies
  clouds
  backgroundObjects

  constructor(enemies, enemiesDead, clouds, backgroundObjects, coins, bottles,level_start_x, level_end_x) {
    this.enemies = enemies
    this.enemiesDead = enemiesDead
    this.clouds = clouds
    this.backgroundObjects = backgroundObjects
    this.coins = coins
    this.bottles = bottles
    this.level_start_x = level_start_x
    this.level_end_x = level_end_x
  }
}