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

    //Angle value for circle.
    this.angle = 0;
  }

  //Circle gives Jetpack to the player (triangle).
  start_cinematic_scene_1() {
    if (showing_results == 0) {
      //Initialize position.
      if (this.cinematic_started == 0) {
        this.position = createVector(width * 0.85, height * 0.6);
        this.jetpack_position = createVector(width * 0.5, height * 0.58);
        this.cinematic_started = 1;
      }

      //A second has passed.
      if (cinematic_seconds != seconds) {
        this.internal_seconds++;
        //console.log(cinematic_seconds);
      }

      //I cant move!
      if (this.internal_seconds < 5) {
        push();
        fill(0);
        text(
          "I can not move!",
          player.body.position.x - width * 0.02,
          player.body.position.y - height * 0.05
        );
        textSize(width * 0.12);
        pop();
      }

      //Circle appears and give a jetpack.
      if (this.internal_seconds > 4 && this.internal_seconds < 18) {
        push();
        stroke(0, 20, 50);
        noFill();

        if (this.internal_seconds >= 5 && this.internal_seconds <= 7) {
          push();
          this.position.x -= width * 0.002;

          circle(this.position.x, this.position.y, width * 0.05);

          //The Eyes.
          translate(this.position.x, this.position.y);
          rotate(this.angle);
          rectMode(CENTER);
          line(0, height * 0.002, 0, height * 0.006);
          line(-width * 0.004, height * 0.002, -width * 0.004, height * 0.006);

          pop();

          //Increase angle value.
          this.angle -= 0.2;
        }

        if (this.internal_seconds >= 8 && this.internal_seconds <= 9) {
          push();

          translate(
            this.jetpack_position.x,
            this.jetpack_position.y - height * 0.042
          );
          this.jetpack_position.x -= width * 0.0015;
          image(jetpack, 0, 0);
          //rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
          pop();

          push();

          circle(this.position.x, this.position.y, width * 0.05);

          //The Eyes.
          translate(this.position.x, this.position.y);
          rotate(this.angle);
          rectMode(CENTER);
          line(0, height * 0.002, 0, height * 0.006);
          line(-width * 0.004, height * 0.002, -width * 0.004, height * 0.006);

          pop();
        }

        //Only circle moves.
        if (this.internal_seconds >= 10 && this.internal_seconds <= 12) {
          push();
          translate(
            this.jetpack_position.x,
            this.jetpack_position.y - height * 0.042
          );
          image(jetpack, 0, 0);
          //rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
          pop();

          push();
          this.position.x += width * 0.002;
          circle(this.position.x, this.position.y, width * 0.05);

          //Display eyes for random circle.

          //The Eyes.
          translate(this.position.x, this.position.y);
          rotate(this.angle);
          rectMode(CENTER);
          line(0, height * 0.002, 0, height * 0.006);
          line(-width * 0.004, height * 0.002, -width * 0.004, height * 0.006);

          pop();

          //Increase angle value.
          this.angle += 0.2;
        }
        pop();

        if (this.internal_seconds >= 13 && this.internal_seconds <= 15) {
          push();
          translate(
            this.jetpack_position.x,
            this.jetpack_position.y - height * 0.042
          );
          image(jetpack, 0, 0);
          pop();

          //White background for text.

          push();
          noStroke();
          fill(255);
          rect(
            player.body.position.x - width * 0.01,
            player.body.position.y - height * 0.066,
            width * 0.07,
            height * 0.02
          );
          pop();

          push();
          fill(0);
          text(
            "Will this work?",
            player.body.position.x - width * 0.02,
            player.body.position.y - height * 0.05
          );
          textSize(width * 0.12);
          noFill();
          pop();
        }

        if (this.internal_seconds >= 16) {
          this.jetpack_stays = 1;
        }
      }

      //Jetpack and circle wonders what happened.
      if (this.jetpack_stays == 1) {
        player.interact = 1;
        push();
        translate(
          this.jetpack_position.x,
          this.jetpack_position.y - height * 0.042
        );
        image(jetpack, 0, 0);
        pop();
        if (keyIsDown(32) === true) {
          player.interact = 0;
          this.jetpack_stays = 0;
          cinematic_scene = 2;
          this.internal_seconds = 0;

          this.position = (width * 0.85, height * 0.6);
          this.jetpack_position = (width * 0.5, height * 0.58);
          this.cinematic_started = 0;

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
  }

  //Player (rectangle) is confused as to why there has not yet been improvements.
  start_cinematic_scene_2() {
    if (showing_results == 0) {
      //Initialize position.
      if (this.cinematic_started == 0) {
        this.position = createVector(width * 0.85, height * 0.6);
        this.jetpack_position = createVector(width * 0.33, height * 0.58);
        this.cinematic_started = 1;
      }

      if (cinematic_scene == 3) {
        push();
        translate(
          this.jetpack_position.x,
          this.jetpack_position.y - height * 0.042
        );
        image(jetpack, 0, 0);
        pop();
        //rect(this.jetpack_position.x, this.jetpack_position.y, width * 0.04);
      }

      if (cinematic_scene == 4) {
        //A second has passed.

        //Draw jetpack.
        push();
        translate(
          this.jetpack_position.x,
          this.jetpack_position.y - height * 0.042
        );
        image(jetpack, 0, 0);
        pop();

        if (cinematic_seconds != seconds) {
          this.internal_seconds++;
          //console.log(cinematic_seconds);
        }

        //I cant move!
        if (this.internal_seconds < 5) {
          //White background for text.
          push();
          noStroke();
          fill(255);
          rect(
            player.body.position.x - width * 0.01,
            player.body.position.y - height * 0.066,
            width * 0.32,
            height * 0.02
          );
          pop();

          push();
          fill(0);
          text(
            "Why have they not build automatic roads?! There is only a jetpack?!",
            player.body.position.x - width * 0.01,
            player.body.position.y - height * 0.05
          );
          textSize(width * 0.12);
          pop();
        }

        if (this.internal_seconds > 5) {
          player.interact = 1;
          push();
          translate(
            this.jetpack_position.x,
            this.jetpack_position.y - height * 0.042
          );
          image(jetpack, 0, 0);
          pop();
          if (keyIsDown(32) === true) {
            player.interact = 0;
            cinematic_scene = 5;
            this.internal_seconds = 0;
            this.position = (width * 0.85, height * 0.6);
            this.jetpack_position = (width * 0.33, height * 0.58);

            //CREATE BODY AGAIN!
            player.removeFromWorld();
            player = new Player_Rectangle(
              player.body.position.x,
              player.body.position.y,
              width * 0.025
            );
          }
        }
      }
    }
  }

  //Screen shows a rupture to then show the player hurt.
  start_cinematic_scene_3() {
    if (showing_results == 0) {
      if (this.cinematic_started == 0) {
        this.position = createVector(width * 0.85, height * 0.6);
        this.jetpack_position = createVector(width * 0.3, height * 0.58);
        this.cinematic_started = 1;
      }

      //Do not start counting seconds until the player crashes.
      if (cinematic_seconds != seconds && player.crashed == 1) {
        this.internal_seconds++;
        //console.log(cinematic_seconds);
      }

      //I cant move!
      if (this.internal_seconds < 1) {
        player.jetpack_state = 0;
        push();
        crack1.resize(width, height);
        image(crack1, 0, 0);

        /*         fill(0);
        rect(0, 0, width * 1, height * 1);

        fill(255);
        text("Crack #1", width * 0.5, height * 0.5); */
        pop();
      }

      if (this.internal_seconds == 1) {
        push();
        crack2.resize(width, height);
        image(crack2, 0, 0);

        /*         fill(0);
        rect(0, 0, width * 1, height * 1);

        fill(255);
        text("Crack #2", width * 0.5, height * 0.5); */
        pop();
      }

      if (this.internal_seconds == 2) {
        push();
        crack3.resize(width, height);
        image(crack3, 0, 0);

        /*         fill(0);
        rect(0, 0, width * 1, height * 1);

        fill(255);
        text("Crack #3", width * 0.5, height * 0.5); */
        pop();
      }

      if (this.internal_seconds > 5 && this.internal_seconds < 16) {
        push();
        fill(255, 255, 255, this.transparency_effect);
        rect(0, 0, width * 1, height * 1);
        pop();
      } else if (this.internal_seconds == 16) {
        ui.animation_in_progress = 1;
        ui.playerisat = 4;
        this.internal_seconds = 0;
        this.transparency_effect = 0.0;
      }

      this.transparency_effect += 0.3;
    }
  }
}
