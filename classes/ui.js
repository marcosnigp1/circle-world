class UI {
  constructor() {
    this.playerisat = 2; //Track where the player is in the UI or game.  //0 == Game Menu.
    this.language = 0; //0 == English  //1 == Arabic.
    this.animation_in_progress = 0; //Check if there is an animation in progress.
    this.time = 0; //For transition animations.
    this.fade = 255;
    this.restarted = 0;
  }

  //BACKGROUNDS

  gameplay_bars() {
    push();
    gameplay_hud.resize(width, height); //Alwayds do this for each element.
    image(gameplay_hud, 0, 0);
    pop();
  }

  side_bars() {
    push();
    /* fill(0); */

    main_hud.resize(width, height); //Alwayds do this for each element.
    image(main_hud, 0, 0);

    //Left black bar.
    /*     rect(
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
    ); */
    pop();
  }

  //------SELECTIONS------

  //Player is at 0.
  languageSelection() {
    //-------- Background ------------
    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop(); */

    this.side_bars();

    push();
    language_selection_menu.resize(width, height); //Alwayds do this for each element.
    image(language_selection_menu, 0, 0);
    pop();

    //-------- Language selection ------------

    //Text
    push();
    fill(0);
    textSize(width * 0.05);
    text("Select language", width * 0.32, height * 0.15);
    pop();

    //English
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.3, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    fill(255);
    textSize(width * 0.03);
    text("English", width * 0.45, height * 0.42);
    pop();

    //Arabic
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    fill(255);
    textSize(width * 0.03);
    text("Arabic", width * 0.45, height * 0.75);
    pop();
  }

  //Player is at 1.
  startMenu() {
    //-------- Background ------------
    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop(); */

    this.side_bars();

    push();
    main_menu.resize(width, height); //Alwayds do this for each element.
    image(main_menu, 0, 0);
    pop();

    //-------- Language selection ------------

    //English
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.3, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    fill(255);
    textSize(width * 0.03);
    text("Start Game", width * 0.425, height * 0.42);
    pop();

    //Arabic
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    fill(255);
    textSize(width * 0.03);
    text("Credits", width * 0.45, height * 0.75);
    pop();
  }

  //Player is at 3.
  theCredits() {
    //-------- Background ------------
    push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop();

    //-------- Credits ------------

    //Title
    push();
    fill(0);
    textSize(width * 0.05);
    text("Credits", width * 0.32, height * 0.15);
    pop();

    //Credits
    push();
    fill(0);
    textSize(width * 0.02);
    text("These are the credits...", width * 0.32, height * 0.25);
    pop();

    //Exit button
    push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop();

    push();
    fill(255);
    textSize(width * 0.03);
    text("Exit", width * 0.45, height * 0.75);
    pop();
  }

  //Transition animation.
  transition() {
    if (ui_seconds != seconds) {
      this.time++;
      //console.log("AAAA");
    }

    if (this.time >= 0 && this.time < 3) {
      push();
      fill(0, 0, 0, this.fade);
      rect(width * 0.2, -1, width * 0.6, height * 1.1);
      pop();

      this.fade -= 2;
    }

    if (this.time == 3) {
      this.animation_in_progress = 0;
      this.time = 0;
      this.fade = 255;
      this.restarted = 0;
    }
  }

  //This is called after the player crashes, and the white effect animation finishes.
  theMessage() {
    //-------- Background ------------
    push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop();

    //-------- Language selection ------------

    //Title??
    push();
    fill(0);
    textSize(width * 0.05);
    text("Message", width * 0.345, height * 0.15);
    pop();

    //Message
    push();
    fill(0);
    textSize(width * 0.02);
    text("Message", width * 0.32, height * 0.25);
    pop();

    //Exit button
    push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop();

    push();
    fill(255);
    textSize(width * 0.03);
    text("Exit", width * 0.45, height * 0.75);
    pop();
  }

  results() {
    //-------- Background ------------
    push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop();

    //-------- Results ------------

    //Title
    push();
    fill(0);
    textSize(width * 0.05);
    text("Results", width * 0.32, height * 0.15);
    pop();

    //Results
    push();
    fill(0);
    textSize(width * 0.02);
    text("These are the results...", width * 0.32, height * 0.25);
    pop();

    //Continue button
    push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop();

    push();
    fill(255);
    textSize(width * 0.03);
    text("Continue", width * 0.45, height * 0.75);
    pop();
  }

  gameplay_info() {
    if (showing_results == 0) {
      ///Seconds title
      push();
      fill(255);
      textSize(width * 0.025);
      text("Seconds spent:", width * 0.825, height * 0.15);
      pop();

      //Actual seconds.
      push();
      fill(255);
      textSize(width * 0.023);
      text(time, width * 0.89, height * 0.2);
      pop();

      ///Attempts title
      push();
      fill(255);
      textSize(width * 0.025);
      text("Attempts:", width * 0.85, height * 0.39);
      pop();

      ///Actual attempts
      push();
      fill(255);
      textSize(width * 0.023);
      text(attempts, width * 0.89, height * 0.44);
      pop();

      //How to restart?
      if (cinematic_scene == 2 || cinematic_scene == 5) {
        push();
        fill(255);
        textSize(width * 0.014);
        text("(Press R to restart.)", width * 0.84, height * 0.5);
        pop();
      }

      //----- Controls (They vary depending on the character.) ----//
      push();
      fill(255);
      textSize(width * 0.023);
      text("Controls:", width * 0.86, height * 0.63);
      pop();

      //Icons
      if (
        part == 1 ||
        (part == 2 && cinematic_scene == 0) ||
        (part == 3 && cinematic_scene == 3)
      ) {
        push();
        arrow_keys.resize(width, height);
        image(arrow_keys, 0, 0);

        pop();

        /*         //Left arrow
        push();
        fill(0);
        rect(width * 0.83, height * 0.66, width * 0.05, height * 0.1);
        pop();

        //Right arrow
        push();
        fill(0);
        rect(width * 0.92, height * 0.66, width * 0.05, height * 0.1);
        pop(); */
      } else if (cinematic_scene == 1 || cinematic_scene == 4) {
        push();
        fill(255);
        textSize(width * 0.03);
        text("????", width * 0.869, height * 0.7);
        pop();
      } else if (cinematic_scene == 2 || cinematic_scene == 5) {
        //Spacebar

        push();
        spacebar.resize(width, height);
        image(spacebar, 0, 0);

        pop();

        /*         push();
        fill(0);
        rect(width * 0.83, height * 0.66, width * 0.145, height * 0.1);
        pop(); */
      }
    }
  }
}
