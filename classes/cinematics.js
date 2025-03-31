class Cinematics {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.internal_seconds = 0;
  }

  start_cinematic_scene_1() {
    //A second has passed.
    if (cinematic_seconds != seconds) {
      this.internal_seconds++;
      console.log(cinematic_seconds);
    }
  }
}
