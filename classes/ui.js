class UI {
  constructor() {
    this.playerisat = 0; //Track where the player is in the UI or game.  //0 == Game Menu.
    this.language = 0; //0 == English  //1 == Arabic.
    this.animation_in_progress = 0; //Check if there is an animation in progress.
    this.time = 0; //For transition animations.
    this.fade = 255;
    this.restarted = 0;
  }

  //BACKGROUNDS

  gameplay_bars() {
    push();
    image(gameplay_hud, 0, 0);
    gameplay_hud.resize(width, height); //Alwayds do this for each element.
    pop();
  }

  side_bars() {
    push();
    /* fill(0); */

    image(main_hud, 0, 0);
    main_hud.resize(width, height); //Alwayds do this for each element.

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
    image(language_selection_menu, 0, 0);
    language_selection_menu.resize(width, height); //Alwayds do this for each element.
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
    image(main_menu, 0, 0);
    main_menu.resize(width, height); //Alwayds do this for each element.
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
      console.log("AAAA");
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
}
