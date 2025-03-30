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

    //HUD
    this.interact = 0;
    this.currentPlayer = 0; //0 == Circle,  1 == Triangle;  2 == Square.
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

    //Show pop up messages.
    if (this.interact == 1) {
      if (seconds % 2 == 1) {
        push();
        fill(150);
        text(
          "(INSERT SPACEBAR ICON)",
          this.body.position.x - width * 0.07,
          this.body.position.y - height * 0.05
        );
        textSize(width * 0.12);
        pop();
      } else {
        push();
        fill(0);
        text(
          "(INSERT SPACEBAR ICON)",
          this.body.position.x - width * 0.07,
          this.body.position.y - height * 0.05
        );
        textSize(width * 0.12);
        pop();
      }
    }
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

    //If in section 3.
    if (this.body.position.x > width * 0.82 && current_section == 3) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.19,
        y: this.body.position.y - 2,
      });
      current_section = 4;
    }

    //If in section 4.
    if (this.body.position.x < width * 0.18 && current_section == 4) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.79,
        y: this.body.position.y - 2,
      });
      current_section = 3;
    }

    if (this.body.position.x > width * 0.82 && current_section == 4) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.19,
        y: height * 0.4,
      });
      current_section = 5;
    }

    //If in section 5.
    if (this.body.position.x < width * 0.18 && current_section == 5) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.79,
        y: this.body.position.y - 2,
      });
      current_section = 4;
    }

    if (this.body.position.x > width * 0.82 && current_section == 5) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.22,
        y: this.body.position.y - 9,
      });
      current_section = 6;
    }

    //If in section 6.
    if (this.body.position.x < width * 0.18 && current_section == 6) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.79,
        y: this.body.position.y - 2,
      });
      current_section = 5;
    }
  }

  detectActivator() {
    if (
      Matter.Bounds.overlaps(this.body.bounds, obstacles[28].body.bounds) &&
      current_section == 6
    ) {
      this.interact = 1;
    } else {
      this.interact = 0;
    }
  }

  //This will be to finish level or grab item.
  startInteraction() {
    if (this.interact == 1) {
      if (keyIsDown(32) === true) {
        current_section = 0;

        //Quick line of code, as a concept.
        player = new Player(width * 0.25, height * 0.4, width * 0.01);

        //Again, this is to keep track of the current part in the game. Since different characters will have different variations on the level.
        part += 1;
        this.interact = 0;
      }
    }
  }
}
