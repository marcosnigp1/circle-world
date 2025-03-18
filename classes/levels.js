class Level_Design {
  constructor() {
    this.position = createVector(windowWidth, windowHeight);
  }

  black_bars() {
    push();
    fill(0);

    //Left black bar.
    rect(
      this.position.x * 0.0,
      this.position.y * 0.0,
      this.position.x * 0.2,
      this.position.y * 1
    );

    //Right black bar.
    rect(
      this.position.x * 0.8,
      this.position.y * 0.0,
      this.position.x * 1,
      this.position.y * 1
    );
    pop();
  }

  //List of Levels.

  //Level Test

  level_test() {
    push();
    fill(255);
    rect(
      this.position.x * 0.2,
      this.position.y * 0.0,
      this.position.x * 0.6,
      this.position.y * 1
    );
    pop();
  }

  //Level 1

  level_1() {
    push();
    fill(235);
    rect(
      this.position.x * 0.2,
      this.position.y * 0.0,
      this.position.x * 0.6,
      this.position.y * 1
    );
    pop();
  }
}

class Level_Obstacle {
  constructor(x, y, w, h, angle) {
    this.options = {
      isStatic: true,
      angle: angle,
    };
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, this.options);
    this.body.plugin.particle = this; //Associated with collisions events.
    Composite.add(engine.world, this.body);
  }

  show() {
    push();
    noStroke();
    fill(255, 20, 10);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
