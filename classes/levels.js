class Level_Design {
  constructor() {
    this.position = createVector(windowWidth, windowHeight);
  }

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

  resolution_update() {
    this.position = createVector(windowWidth, windowHeight);
  }
}

class Level_Obstacle {
  constructor(x, y, w, h) {
    this.options = {
      isStatic: true,
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
    fill(0);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
