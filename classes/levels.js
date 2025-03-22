class Level_Design {
  constructor() {
    this.position = createVector(width, height);
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

class Movable_Level_Obstacle extends Level_Obstacle {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);
  }

  show() {
    push();
    noStroke();
    fill(0, 20, 10);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }

  //Check two specific platforms ONLY for this function.
  open_platform(mode) {
    if (mode == "negative") {
      if (this.body.angle > -1.55) {
        Matter.Body.setAngle(this.body, this.body.angle - 0.03);
        Matter.Body.setPosition(this.body, {
          x: this.body.position.x + width * 0.0004,
          y: this.body.position.y + height * 0.00075,
        });
      } else {
        platform_movement_started = false;
      }
    } else if (mode == "positive") {
      if (this.body.angle < 1.55) {
        Matter.Body.setAngle(this.body, this.body.angle + 0.03);
        Matter.Body.setPosition(this.body, {
          x: this.body.position.x - width * 0.0004,
          y: this.body.position.y + height * 0.00075,
        });
      } else {
        platform_movement_started = false;
      }
    }
  }
}

class Activable_Level_Obstacle extends Level_Obstacle {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);
    this.push = false;
  }

  show() {
    push();
    noStroke();
    fill(0, 180, 10);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }

  toggle_platform() {
    if (this.body.position.y < height * 0.755 && this.push == false) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: this.body.position.y + height * 0.00055,
      });
    } else {
      this.push = true;
      move_platforms(); //Moves the platforms.
    }

    if (this.body.position.y > height * 0.728 && this.push == true) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: this.body.position.y - height * 0.00175,
      });
    } else if (this.body.position.y < height * 0.728 && this.push == true) {
      Matter.Body.applyForce(
        player.body,
        createVector(player.body.position.x, player.body.position.y),
        createVector(0, -0.12)
      );
      platform_activation_started = false;
      this.push = false;
    }
  }
}
