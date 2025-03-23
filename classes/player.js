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

  ///Check that velocity does not surpasses the fixed value.
  clampVelocity() {
    //X axis

    Matter.Body.setMass(this.body, 1.9);

    if (this.body.velocity.x > 5) {
      Matter.Body.setVelocity(this.body, {
        x: 5,
        y: this.body.velocity.y,
      });
    }

    if (this.body.velocity.x < -5) {
      Matter.Body.setVelocity(this.body, {
        x: -5,
        y: this.body.velocity.y,
      });
    }

    //Y Axis.

    if (this.body.velocity.y > 5) {
      Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: 5,
      });
    }

    if (this.body.velocity.y < -5) {
      Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: -5,
      });
    }
  }

  float() {
    this.body.force = { x: 0, y: -0.003 };
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
    //If in section 0.
    if (this.body.position.x > width * 0.82 && current_section == 0) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.19,
        y: this.body.position.y - 2,
      });
      current_section = 1;
    }

    //If in section 1.
    if (this.body.position.x < width * 0.18 && current_section == 1) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.79,
        y: this.body.position.y - 2,
      });
      current_section = 0;
    }

    if (this.body.position.x > width * 0.82 && current_section == 1) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.19,
        y: this.body.position.y - 2,
      });
      current_section = 2;
    }

    //If in section 2.
    if (this.body.position.x < width * 0.18 && current_section == 2) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.79,
        y: this.body.position.y - 2,
      });
      current_section = 1;
    }

    if (this.body.position.y > height && current_section == 2) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: 2,
      });
      current_section = 3;
    }
  }
}
