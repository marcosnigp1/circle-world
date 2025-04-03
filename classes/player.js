//Default player is a circle.
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

  //Make object impossible to collide with things.
  removeFromWorld() {
    Composite.remove(engine.world, this.body);
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
    if (this.body.position.y < 0 && current_section == 3) {
      Matter.Body.setPosition(this.body, {
        x: width * 0.5,
        y: height * 0.98,
      });
      current_section = 2;
    }

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

  //This will be to change characters when finishing level.
  startInteraction() {
    if (this.interact == 1) {
      if (keyIsDown(32) === true) {
        current_section = 0;

        //Reset Level Values (For example, it resets the value of the platform.)
        resetLevelValues();

        //This is not the only switch statement anymore... I think...
        switch (part) {
          case 1:
            this.removeFromWorld();
            player = new Player_Triangle(
              width * 0.25,
              height * 0.4,
              width * 0.02
            );
            part += 1; //Again, this is to keep track of the current part in the game. Since different characters will have different variations on the level.
            break;

          //Player rectangle.
          case 2:
            player = new Player_Triangle(
              width * 0.25,
              height * 0.4,
              width * 0.02
            );
            part += 1;
            break;

          default:
            break;
        }
        this.interact = 0;
      }
    }
  }
}

//For the second part.
class Player_Triangle extends Player {
  constructor(x, y, r) {
    super(x, y, r);
    this.removeFromWorld();
    Composite.remove(engine.world, this.body);
    //Replace the whole body as a triangle.
    let options = {
      friction: 3,
      restitution: 0.5,
    };
    this.r = r; //p5js expects a diameter, not a radius.

    //Triangle with no jetpack.
    if (cinematic_scene == 0) {
      this.body = Bodies.polygon(x, y, 3, this.r, options);
    }

    //Triangle with jetpack.
    if (cinematic_scene == 2) {
      this.triangle = Bodies.polygon(x, y, 3, this.r, { mass: 1 });
      this.rectangle = Bodies.rectangle(
        x - width * 0.01,
        y + height * 0.03,
        width * 0.025,
        height * 0.025,
        { angle: 10, mass: 0 }
      );
      this.body = Body.create({
        parts: [this.triangle, this.rectangle],
        friction: 3,
        restitution: 0.5,
      });
      this.rectangle.plugin.particle = this; //Associated with collisions events.
    }
    Matter.Body.setAngle(this.body, 39);

    this.body.plugin.particle = this; //Associated with collisions events.
    Composite.add(engine.world, this.body); //Without this, it will not render.

    //Jetpack
    this.jetpack_state = 0; //0 == OFF,  1 == ON;

    //HUD
    this.interact = 0;
    this.currentPlayer = 0; //0 == Circle,  1 == Triangle;  2 == Square.
  }

  show() {
    if (cinematic_scene < 2) {
      push();
      noStroke();
      fill(50, 50, 50);
      triangle(
        this.body.vertices[0].x,
        this.body.vertices[0].y,
        this.body.vertices[1].x,
        this.body.vertices[1].y,
        this.body.vertices[2].x,
        this.body.vertices[2].y
      ); //this.r*2 helps in visualizing correctly the circles.
      pop();
    }

    if (cinematic_scene == 2) {
      push();
      noStroke();
      fill(50, 50, 50);
      //I have to do this, there is no other way from what I can recall.
      //translate(0, 0);
      beginShape();
      vertex(this.triangle.vertices[0].x, this.triangle.vertices[0].y);
      vertex(this.triangle.vertices[1].x, this.triangle.vertices[1].y);
      vertex(this.triangle.vertices[2].x, this.triangle.vertices[2].y);
      endShape(CLOSE);
      pop();
    }

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

  showJetpack() {
    push();
    noStroke();
    fill(200, 150, 50);
    translate(0, 0);

    //Draw vertices, there are no simpler solution it seems..
    beginShape();
    vertex(this.rectangle.vertices[0].x, this.rectangle.vertices[0].y);
    vertex(this.rectangle.vertices[1].x, this.rectangle.vertices[1].y);
    vertex(this.rectangle.vertices[2].x, this.rectangle.vertices[2].y);
    vertex(this.rectangle.vertices[3].x, this.rectangle.vertices[3].y);
    endShape(CLOSE);

    if (this.jetpack_state == 1) {
      //Show animation.
    }

    pop();
  }
}
