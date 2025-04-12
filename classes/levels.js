class Level_Design {
  constructor() {
    this.position = createVector(width, height);
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

//Obstacles

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
    fill(71, 242, 90);
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
        y: this.body.position.y + height * 0.00015,
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
      //I need to change how force is applied to objects here...
      if (
        player.body.position.x > width * 0.69 &&
        player.body.position.x < width * 0.725 + width * 0.073
      ) {
        Matter.Body.applyForce(
          player.body,
          createVector(player.body.position.x, player.body.position.y),
          createVector(0, -0.12)
        );
      }

      platform_activation_started = false;
      this.push = false;
      mechanism_sound_played = 0;
    }
  }
}

class Water_Level_Obstacle extends Level_Obstacle {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);
    this.push = false;
  }

  show() {
    push();
    noStroke();
    fill(20, 20, 200, 200);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Water_Disabler_Level_Obstacle extends Level_Obstacle {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);
    this.push = false;
    //This does not have any collision
  }

  show() {
    push();
    noStroke();
    fill(20, 200, 200, 200);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

//Activator
class Level_Activator extends Level_Obstacle {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);
  }

  show() {
    push();
    noStroke();
    fill(0, 255, 10, 100);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Level_Detector {
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
    fill(200, 200, 10, 100);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Level_Detector_Crasher {
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
    fill(0, 200, 200, 100);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
