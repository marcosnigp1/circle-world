class Player {
  constructor(x, y, r) {
    let options = {
      friction: 1.9,
      restitution: 0.3,
    };
    this.r = r; //p5js expects a diameter, not a radius.
    this.body = Bodies.circle(x, y, this.r, options);

    this.body.plugin.particle = this; //Associated with collisions events.
    Composite.add(engine.world, this.body); //Without this, it will not render.
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();

    noStroke();
    fill(50, 50, 50);
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    circle(0, 0, this.r * 2); //this.r*2 helps in visualizing correctly the circles.
    pop();
  }

  checkCurrentPosition() {
    //If in level 0.
    if (this.body.position.x > windowWidth * 0.82 && current_level == 0) {
      Matter.Body.setPosition(this.body, {
        x: windowWidth * 0.19,
        y: this.body.position.y,
      });
      current_level = 1;
    }

    //If in level 1.
    if (this.body.position.x < windowWidth * 0.18 && current_level == 1) {
      Matter.Body.setPosition(this.body, {
        x: windowWidth * 0.79,
        y: this.body.position.y,
      });
      current_level = 0;
    }
  }
}
