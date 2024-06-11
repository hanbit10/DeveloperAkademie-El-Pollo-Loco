class Level {
  enemies
  clouds
  backgroundObjects
  level_end_x = 700

  constructor(enemies, clouds, backgroundObjects, pickable) {
    this.enemies = enemies
    this.clouds = clouds
    this.backgroundObjects = backgroundObjects
    this.pickable = pickable
  }
}