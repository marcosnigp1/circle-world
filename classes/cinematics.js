class Cinematics {
  constructor() {
    this.position = createVector(0, 0);
    this.jetpack_position = createVector(0, 0); //For jetpack.
    this.internal_seconds = 0;
    this.cinematic_started = 0;

    //Permanency of objects.
    this.jetpack_stays = 0;

    //White screen fulfill effect.
    this.transparency_effect = 0.0;
  }

  //Circle gives Jetpack to the player (triangle).
  start_cinematic_scene_1() {
    //Initialize position.
    if (this.cinematic_started == 0) {
      this.position = createVector(width * 0.85, height * 0.6);
      this.jetpack_position = createVector(width * 0.5, height * 0.58);
      this.cinematic_started = 1;
    }

    //A second has passed.
    if (cinematic_seconds != seconds) {
      this.internal_seconds++;
      console.log(cinematic_seconds);
    }

    //I cant move!
    if (this.internal_seconds < 5) {
      push();
      fill(0);
      text(
        "I can't move! " + cinematics.internal_seconds,
        player.body.position.x - width * 0.07,
        player.body.position.y - height * 0.05
      );
      textSize(width * 0.12);
      pop();
    }

    //Circle appears and give a jetpack.
    if (this.internal_seconds > 4 && this.internal_seconds < 18) {
      push();
      fill(0, 20, 50);

      if (this.internal_seconds >= 5 && this.internal_seconds <= 7) {
        this.position.x -= width * 0.002;
        circle(this.position.x, this.position.y, width * 0.05);
      }

      if (this.internal_seconds >= 8 && this.internal_seconds <= 9) {
        this.jetpack_position.x -= width * 0.0015;
        rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
        circle(this.position.x, this.position.y, width * 0.05);
      }

      //Only circle moves.
      if (this.internal_seconds >= 10 && this.internal_seconds <= 12) {
        this.position.x += width * 0.002;
        rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
        circle(this.position.x, this.position.y, width * 0.05);
      }

      if (this.internal_seconds >= 13 && this.internal_seconds <= 15) {
        push();
        fill(0);
        text(
          "I guess this will work...",
          player.body.position.x - width * 0.07,
          player.body.position.y - height * 0.05
        );
        textSize(width * 0.12);
        rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);

        pop();
      }

      if (this.internal_seconds >= 16) {
        this.jetpack_stays = 1;
      }
    }

    //Jetpack and circle wonders what happened.
    if (this.jetpack_stays == 1) {
      player.interact = 1;
      rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
      if (keyIsDown(32) === true) {
        player.interact = 0;
        this.jetpack_stays = 0;
        cinematic_scene = 2;
        this.internal_seconds = 0;

        //CREATE BODY AGAIN!
        player.removeFromWorld();
        player = new Player_Triangle(
          player.body.position.x,
          player.body.position.y,
          width * 0.02
        );
      }
    }
  }

  //Player (rectangle) is confused as to why there has not yet been improvements.
  start_cinematic_scene_2() {
    //Initialize position.
    if (this.cinematic_started == 0) {
      this.position = createVector(width * 0.85, height * 0.6);
      this.jetpack_position = createVector(width * 0.3, height * 0.58);
      this.cinematic_started = 1;
    }

    if (cinematic_scene == 3) {
      rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
    }

    if (cinematic_scene == 4) {
      //A second has passed.

      //Draw jetpack placeholder.
      rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);

      if (cinematic_seconds != seconds) {
        this.internal_seconds++;
        console.log(cinematic_seconds);
      }

      //I cant move!
      if (this.internal_seconds < 5) {
        push();
        fill(0);
        text(
          "Why have they not build automatic roads?! " +
            cinematics.internal_seconds,
          player.body.position.x - width * 0.07,
          player.body.position.y - height * 0.05
        );
        textSize(width * 0.12);
        pop();
      }

      if (this.internal_seconds > 5) {
        player.interact = 1;
        rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04); //Draw jetpack.
        if (keyIsDown(32) === true) {
          player.interact = 0;
          cinematic_scene = 5;
          this.internal_seconds = 0;

          //CREATE BODY AGAIN!
          player.removeFromWorld();
          player = new Player_Rectangle(
            player.body.position.x,
            player.body.position.y,
            width * 0.02
          );
        }
      }
    }
  }

  //Screen shows a rupture to then show the player hurt.
  start_cinematic_scene_3() {
    if (this.cinematic_started == 0) {
      this.position = createVector(width * 0.85, height * 0.6);
      this.jetpack_position = createVector(width * 0.3, height * 0.58);
      this.cinematic_started = 1;
    }

    //Do not start counting seconds until the player crashes.
    if (cinematic_seconds != seconds && player.crashed == 1) {
      this.internal_seconds++;
      console.log(cinematic_seconds);
    }

    //I cant move!
    if (this.internal_seconds < 1) {
      push();
      fill(0);
      rect(0, 0, width * 1, height * 1);

      fill(255);
      text("Crack #1", width * 0.5, height * 0.5);
      pop();
    }

    if (this.internal_seconds == 1) {
      push();
      fill(0);
      rect(0, 0, width * 1, height * 1);

      fill(255);
      text("Crack #2", width * 0.5, height * 0.5);
      pop();
    }

    if (this.internal_seconds == 2) {
      push();
      fill(0);
      rect(0, 0, width * 1, height * 1);

      fill(255);
      text("Crack #3", width * 0.5, height * 0.5);
      pop();
    }

    if (this.internal_seconds > 5 && this.internal_seconds < 16) {
      push();
      fill(255, 255, 255, this.transparency_effect);
      rect(0, 0, width * 1, height * 1);
      pop();
    }

    this.transparency_effect += 0.3;
  }

  //Final reflective message.
  start_cinematic_scene_4() {}
}
