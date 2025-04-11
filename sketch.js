//Circle World - By Marcos Hernández

// ------ Physics related variables ------
let Engine = Matter.Engine,
  //Render = Matter.Render,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Vector = Matter.Vector,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let mConstraint;

//Inside the physics engine there is a world, where all the bodies are.
let ground;
let engine;
let runner;

//Player.
let player;
let swimming = 0; //Swimming mode.
let attempts = 0; //Tracking how many times the player restarted the section (due to misc inconveniences.)

//Level structure and design.
let obstacles = [];
let levels;
let current_section = 0; //Level control: //0 == Very first section,  //1 == First Level. //2 = Second section.  //3 = Third Section
let platform_movement_started = false;
let platform_activation_started = false;
let part = 2; //Tracks current position.

//Fixed resolution: https://jslegenddev.substack.com/p/how-to-make-your-canvas-scale-to
const baseWidth = 1920; //Game should be created as a window, since this is lagging most machines...
const baseHeight = 1080;
const aspectRatio = baseWidth / baseHeight;
let scaleFactor = 1;

//Time variables. Made with help of the following sketch: https://editor.p5js.org/D10D3/sketches/h-OfMV0at
let seconds = 0;
let half_seconds = 0; ///Not used.
let d = 0; //For animations.
let time = 0; //Different from the seconds logic.

//Cinematics
let cinematics;
let cinematic_scene = 0; //0 == No cinematic, 1 == Circle gives jetpack to triangle. 2 == Triangle has jetpack. 3 == Square appears and questions why this place does not have automatic roads.
let cinematic_seconds = 0; //Keep track of cinematic internal time.

//User Interface and variables to keep control of the game.
let ui;
let ui_seconds = 0;
let showing_results = 0;

//-- Media variables --.
//Menu Images
let main_menu;
let main_hud;
let gameplay_hud;
let language_selection_menu;

//Section Images
let section_0_img;
let section_1_img;
let section_2_img;
let section_3_img;
let section_4_img;
let section_5_img;
let section_6_img;

//HUD Images
let arrow_keys;
let spacebar;

//Font
let font;

function preload() {
  //Menu Images
  main_menu = loadImage("media/images/main_menu.png");
  main_hud = loadImage("media/images/menu_hud.png");
  gameplay_hud = loadImage("media/images/gameplay_hud.png");
  language_selection_menu = loadImage("media/images/language_selection.png");

  //Sections Images
  section_0_img = loadImage("media/images/sections/section_0.png");
  section_1_img = loadImage("media/images/sections/section_1.png");
  section_2_img = loadImage("media/images/sections/section_2.png");
  section_3_img = loadImage("media/images/sections/section_3.png");
  section_4_img = loadImage("media/images/sections/section_4.png");
  section_5_img = loadImage("media/images/sections/section_5.png");
  section_6_img = loadImage("media/images/sections/section_6.png");

  //HUD Images
  arrow_keys = loadImage("media/images/hud/arrowkeys.png");
  spacebar = loadImage("media/images/hud/spacebar.png");

  //Font
  font = loadFont("media/font/Comic_Neue/ComicNeue-bold.ttf");
}

function setup() {
  //This canvas fits into every aspect ratio.

  frameRate(60); //A stable frame rate is better than one that is unpredictable. Thus, above 60 fps will make everything go too fast.
  const { canvasWidth, canvasHeight } = updateCanvasDimensions();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  scaleFactor = baseWidth / baseHeight;

  const x = (windowWidth - canvasWidth) / 2;
  const y = (windowHeight - canvasHeight) / 2;
  canvas.position(x, y);

  pixelDensity(window.devicePixelRatio);
  strokeWeight(2 * scaleFactor);

  //Prepare UI according to current dimension of screen.
  ui = new UI(x, y);

  //                       //////////////
  ///  STARTING PHYSICS   ///
  ////                    ////////////

  //Preparing Physics engine...
  engine = Engine.create();
  engine.gravity = Vector.create(0, 1);

  runner = Runner.create();

  //----- Mouse interaction (For testing) -------
  /*   let canvas_mouse = Mouse.create(canvas.elt);
  canvas_mouse.pixelRatio = pixelDensity(); //Make comfortable when selecting items on the canvas.

  let mouse_options = {
    mouse: canvas_mouse,
  };

  mConstraint = MouseConstraint.create(engine, mouse_options); */
  //Composite.add(engine.world, [mConstraint]);
  //------------------------------

  //Add everything created so far into the engine, and run it.
  Runner.run(runner, engine);

  //                     //////////////
  ///   END OF PHYSICS   ///
  ////                  ////////////

  //Level variables.
  levels = new Level_Design();

  //------------------------
  //-----------Obstacles-------------
  //------------------------

  //--------- Section 0 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(width * 0.5, height * 0.7, width * 0.8, height * 0.1, 0)
  );

  //--------- Section 1 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(width * 0.1, height * 0.7, width * 0.4, height * 0.1, 0)
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.308,
      height * 0.7199,
      width * 0.06,
      height * 0.1,
      54
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.37,
      height * 0.743,
      width * 0.4,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.579,
      height * 0.7635,
      width * 0.06,
      height * 0.1,
      54
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.72,
      height * 0.783,
      width * 0.3,
      height * 0.1,
      0
    )
  );

  //--------- Section 2 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(
      width * 0.28,
      height * 0.783,
      width * 0.3,
      height * 0.1,
      0
    )
  );

  //These are movable obstacles!
  obstacles.push(
    new Movable_Level_Obstacle(
      width * 0.45,
      height * 0.74,
      width * 0.05,
      height * 0.01,
      0
    )
  );

  obstacles.push(
    new Movable_Level_Obstacle(
      width * 0.5,
      height * 0.74,
      width * 0.05,
      height * 0.01,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.673,
      height * 0.783,
      width * 0.3,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.79,
      height * 0.47,
      width * 0.6,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.551,
      height * 0.95,
      width * 0.2,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.401,
      height * 0.95,
      width * 0.2,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Activable_Level_Obstacle(
      width * 0.725,
      height * 0.727,
      width * 0.073,
      height * 0.06,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.68,
      height * 0.76,
      width * 0.05,
      height * 0.1,
      9
    )
  );

  //--------- Section 3 Obstacles ----------

  obstacles.push(
    new Water_Level_Obstacle(
      width * 0.29,
      height * 0.88,
      width * 0.3,
      height * 0.3,
      0
    )
  );

  obstacles.push(
    new Water_Disabler_Level_Obstacle(
      width * 0.29,
      height * 0.57,
      width * 0.6,
      height * 0.16,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(width * 0.2, height * 0.88, width * 1, height * 0.1, 11)
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.2,
      height * 0.88,
      width * 0.6,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.34,
      height * 0.85,
      width * 0.3,
      height * 0.1,
      9
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.715,
      height * 0.744,
      width * 0.5,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.515,
      height * 0.09,
      width * 0.2,
      height * 0.05,
      9
    )
  );

  //--------- Section 4 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(
      width * 0.015,
      height * 0.744,
      width * 0.6,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.59,
      height * 0.894,
      width * 0.6,
      height * 0.1,
      16
    )
  );

  //--------- Section 5 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(
      width * 0.19,
      height * 0.494,
      width * 1.6,
      height * 0.1,
      16
    )
  );

  //--------- Section 6 Obstacles ----------

  obstacles.push(
    new Level_Obstacle(
      width * 0.19,
      height * 0.8,
      width * 1.6,
      height * 0.1,
      16
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.19,
      height * 0.894,
      width * 1.6,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Obstacle(
      width * 0.8,
      height * 0.894,
      width * 1.6,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Activator(
      width * 0.6,
      height * 0.71,
      width * 0.15,
      height * 0.4,
      11
    )
  );

  //--------- Section 1 EXTRA Obstacles ----------

  obstacles.push(
    new Level_Obstacle(width * 0.16, height * 0.21, width * 0.15, height * 1, 0)
  );

  //THE ROOOOFFFF!!!!!!!!!!

  obstacles.push(
    new Level_Obstacle(width * 0.5, height * 0.01, width * 1, height * 0.11, 0)
  );

  //And the specific roof for that water section.

  obstacles.push(
    new Level_Obstacle(width * 1.1, height * 0, width * 1, height * 0.11, 0)
  );

  //Part 3 Prepare for cinematic walls

  obstacles.push(
    new Level_Detector(width * 0.475, height * 0.5, width * 0.15, height * 1, 0)
  );

  //Mimics of the section 2 walls.

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.28,
      height * 0.783,
      width * 0.3,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.673,
      height * 0.783,
      width * 0.3,
      height * 0.1,
      0
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.79,
      height * 0.47,
      width * 0.6,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.551,
      height * 0.95,
      width * 0.2,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.401,
      height * 0.95,
      width * 0.2,
      height * 0.1,
      11
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.68,
      height * 0.76,
      width * 0.05,
      height * 0.1,
      9
    )
  );

  obstacles.push(
    new Level_Detector_Crasher(
      width * 0.5,
      height * 0.01,
      width * 1,
      height * 0.11,
      0
    )
  );

  //------------------------
  //---------------------------------
  //------------------------

  //Start player

  checkPlayerSpawn();
  Matter.Events.on(engine, "collisionStart", handleCollisions);

  //For cinematics.
  cinematics = new Cinematics();
}

function draw() {
  //Use this text font.
  textFont(font);

  background(0, 10, 20);

  trackTime();

  if (ui.playerisat == 0) {
    ui.languageSelection();
  }

  if (ui.playerisat == 1) {
    ui.startMenu();
  }

  if (ui.playerisat == 2) {
    gameLogic();
    ui.gameplay_bars();
    ui.gameplay_info();
  }

  if (ui.playerisat == 3) {
    ui.theCredits();
  }

  if (ui.playerisat == 4) {
    ui.theMessage();
  }

  if (showing_results == 1) {
    ui.results();
  }

  //Check for animation transitions. Should be drawn to last since it will cover everything.
  if (ui.animation_in_progress == 1) {
    ui.transition();
  }

  ui_seconds = seconds;
}

function trackTime() {
  //Calculate seconds spent.
  d += deltaTime / 1000; //Counts seconds since start.
  seconds = round(d); //Round to nearest second.
  console.log("Seconds spent:" + seconds);
}

//Everything that is supposed to be the playable experience is here, just to make everything look nicer.
function gameLogic() {
  //Add one second to time when gameplay started.
  if (ui_seconds != seconds && showing_results == 0) {
    time++;
  }

  //Draw levels.
  levels.level_test();

  player.clampVelocity(); //Check if surpasses fixed values of velocity, and if does, clamp it. Also makes sure the mass stays the same.
  player.checkCurrentPosition();

  ///Check detector for cinematic #3 (where the player crashes and the screen shows a animated crack)

  if (part == 3) {
    player.detectCinematic3Starter();
  }

  //Draw obstacles according to level.
  if (current_section == 0) {
    image(section_0_img, 0, 0);
    section_0_img.resize(width, height);

    for (let i = 0; i < obstacles.length; i++) {
      if (i == 0) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 29) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }

      //The roof
      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  if (current_section == 1) {
    image(section_1_img, 0, 0);
    section_1_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 1 && i <= 5) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  if (current_section == 2) {
    image(section_2_img, 0, 0);
    section_2_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 6 && i <= 14) {
        if ((i >= 7 && i <= 8) || i == 13) {
          obstacles[i].show();
        }

        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }

      if (i >= 32 && i <= 39 && part == 3) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = true;
      }
    }
  }

  if (current_section == 3) {
    image(section_3_img, 0, 0);
    section_3_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 15 && i <= 21) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;

        if (i == 15) {
          obstacles[i].body.isSensor = true;
        }

        if (i == 16) {
          obstacles[i].body.isSensor = true;
        }
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      //Specific roof made for this specific section.
      if (i == 31) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  if (current_section == 4) {
    image(section_4_img, 0, 0);
    section_4_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 22 && i <= 23) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  if (current_section == 5) {
    image(section_5_img, 0, 0);
    section_5_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i == 24) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  if (current_section == 6) {
    image(section_6_img, 0, 0);
    section_6_img.resize(width, height);
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 25 && i <= 28) {
        //obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;

        if (i == 28) {
          obstacles[i].body.isSensor = true;
        }
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }

      if (i == 30) {
        //obstacles[i].show();
        obstacles[i].body.isSensor = false;
      }
    }
  }

  //Draw player.
  player.show();

  //Check collisions and activation.
  player.detectActivator();
  player.startInteraction();

  // The platforms actions.
  if (platform_movement_started == true) {
    move_platforms();
  }

  if (platform_activation_started == true) {
    activate_platform();
  }

  //Detect if in swimming mode.
  if (swimming == 1) {
    player.float();
  }

  //Draw black bars.

  ////////                        ////////////////
  /////// START PLAYER CONTROL.  /////////////
  /////                     ///////////////////

  /* Source where I got the help: https://p5js.org/reference/p5/keyIsDown/ */

  //Check inputs according to the part of the experience.
  checkInputs();

  ////////                ////////////////
  /////// END PLAYER CONTROL /////////////
  /////                 ///////////////////

  ////////                        ////////////////
  /////// START CINEMATICS.  /////////////
  /////                     ///////////////////

  //Check where in cinematics the player currently at. This will help create animations and item specific variations.
  if (cinematic_scene == 1) {
    cinematics.start_cinematic_scene_1();
  }

  if (cinematic_scene == 2) {
    player.showJetpack(); //Only possible with triangle and rectangle. If tried with circle, it will crash.
  }

  if (cinematic_scene == 3 || cinematic_scene == 4) {
    cinematics.start_cinematic_scene_2();
  }

  if (cinematic_scene == 5 || cinematic_scene == 6) {
    player.showJetpack(); //Only possible with triangle and rectangle. If tried with circle, it will crash.
  }

  if (cinematic_scene == 6) {
    cinematics.start_cinematic_scene_3();
  }

  //This is helpful, since I need to compare values to count seconds.
  cinematic_seconds = seconds;

  ////////                ////////////////
  /////// END CINEMATICS  /////////////
  /////                 ///////////////////
}

/* function windowResized() {
  fixResolution();
} */

function checkPlayerSpawn() {
  //Look, the second switch! Incredible :D
  switch (part) {
    //Part 1 is Circle.
    case 1:
      player = new Player(width * 0.3, height * 0.2, width * 0.01);
      break;

    //Part 2 is Triangle.
    case 2:
      player = new Player_Triangle(width * 0.25, height * 0.48, width * 0.02);
      break;

    //Part 3 is Rectangle.
    case 3:
      player = new Player_Rectangle(width * 0.25, height * 0.4, width * 0.025);
      break;

    default:
      break;
  }
}

function showResults() {
  showing_results = 1;
}

function resetLevelValues() {
  /* Reset values of moving platforms */
  Matter.Body.setAngle(obstacles[7].body, 0);
  Matter.Body.setPosition(
    obstacles[7].body,
    createVector(width * 0.45, height * 0.74)
  );
  Matter.Body.setAngle(obstacles[8].body, 0);
  Matter.Body.setPosition(
    obstacles[8].body,
    createVector(width * 0.5, height * 0.74)
  );
}

function resetGameValues() {
  part = 1;
  cinematic_scene = 0;
  current_section = 0;
  player.removeFromWorld();
  checkPlayerSpawn();
}

//Interaction with UIs.
function mouseClicked() {
  //Language selection.
  if (ui.playerisat == 0 && ui.animation_in_progress == 0) {
    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.3 &&
      mouseY <= height * 0.3 + height * 0.2
    ) {
      console.log("English!");
      ui.animation_in_progress = 1;
      ui.transition();
      ui.language = 0;
      ui.playerisat = 1;
    }

    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.63 &&
      mouseY <= height * 0.63 + height * 0.2
    ) {
      console.log("Arabic!");
      ui.animation_in_progress = 1;
      ui.language = 1;
      ui.playerisat = 1;
    }
  }

  //Start menu.
  if (ui.playerisat == 1 && ui.animation_in_progress == 0) {
    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.3 &&
      mouseY <= height * 0.3 + height * 0.2
    ) {
      //Add transition animation here.
      console.log("Game start!");
      ui.animation_in_progress = 1;

      //Apply force upwards to avoid player being stuck in something.
      Matter.Body.setPosition(
        player.body,
        createVector(width * 0.25, height * 0.6)
      );

      ui.playerisat = 2;
    }

    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.63 &&
      mouseY <= height * 0.63 + height * 0.2
    ) {
      //Add transition animation here.
      console.log("Credits!");
      ui.animation_in_progress = 1;
      ui.playerisat = 3;
    }
  }

  //Credits.
  if (ui.playerisat == 3 && ui.animation_in_progress == 0) {
    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.63 &&
      mouseY <= height * 0.63 + height * 0.2
    ) {
      console.log("Exit credits!");
      ui.animation_in_progress = 1;

      ui.playerisat = 1;
    }
  }

  //The message.
  if (ui.playerisat == 4 && ui.animation_in_progress == 0) {
    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.63 &&
      mouseY <= height * 0.63 + height * 0.2
    ) {
      console.log("Exit message!");
      ui.animation_in_progress = 1;
      ui.playerisat = 1;
      time = 0;
      attempts = 0;
      resetGameValues();
      resetLevelValues();
    }
  }

  //Results
  if (showing_results == 1 && ui.animation_in_progress == 0) {
    if (
      mouseX >= width * 0.4 &&
      mouseX <= width * 0.4 + width * 0.2 &&
      mouseY >= height * 0.63 &&
      mouseY <= height * 0.63 + height * 0.2
    ) {
      console.log("Continuing");
      ui.animation_in_progress = 1;
      showing_results = 0;
      attempts = 0;
      time = 0;
    }
  }
}

function checkInputs() {
  // ------- Part 1 controls. ----------
  if (part == 1 && showing_results == 0) {
    if (keyIsDown(LEFT_ARROW) === true && keyIsDown(RIGHT_ARROW) === true) {
      Matter.Body.applyForce(
        player.body,
        player.body.position,
        createVector(0, 0)
      );
    }

    if (keyIsDown(LEFT_ARROW) === true) {
      Matter.Body.applyForce(
        player.body,
        player.body.position,
        createVector(-0.001, 0)
      );
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
      Matter.Body.applyForce(
        player.body,
        player.body.position,
        createVector(0.001, 0)
      );
    }
  }

  // ------- Part 2 controls. ----------
  //The idea here is that the character cannot move,
  //and upon the text appears, it will spawn a circle which will lend a jetpack.
  if (part == 2 && cinematic_scene == 0 && showing_results == 0) {
    if (keyIsDown(LEFT_ARROW) === true) {
      cinematic_scene = 1;
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
      cinematic_scene = 1;
    }
  }

  //Once cinematic passes into 2, give player ability to fly.
  if (part == 2 && cinematic_scene == 2 && showing_results == 0) {
    if (keyIsDown(32) === true) {
      //console.log(Body.getAngularVelocity(player.body));

      //Done with help of the following material: https://stackoverflow.com/questions/35827012/matter-js-calculating-force-needed
      Matter.Body.applyForce(player.body, player.body.position, {
        x: cos(player.body.angle) * 0.04,
        y: sin(player.body.angle) * -0.01,
      });
      player.jetpack_state = 1;
    } else {
      player.jetpack_state = 0;
    }

    //Restart Key, exclusive to second and third part.
    if (keyIsDown(82) == true) {
      ui.transition();
      current_section = 0;
      part = 2;
      swimming = 0;
      Matter.Body.setPosition(
        player.body,
        createVector(width * 0.25, height * 0.6)
      );
      Matter.Body.setAngle(player.body, 39);
    }
  }

  // ------- Part 3 controls. ----------
  //The idea here is that the character cannot move,
  //and upon the text appears, the character will be able to pick the jetpack from the supplier.
  if (part == 3 && cinematic_scene == 3 && showing_results == 0) {
    if (keyIsDown(LEFT_ARROW) === true) {
      cinematic_scene = 4;
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
      cinematic_scene = 4;
    }
  }

  //Once cinematic passes into 2, give player ability to fly.
  if (
    part == 3 &&
    cinematic_scene == 5 &&
    player.crashed == 0 &&
    showing_results == 0
  ) {
    if (keyIsDown(32) === true) {
      //console.log(Body.getAngularVelocity(player.body));
      //Done with help of the following material: https://stackoverflow.com/questions/35827012/matter-js-calculating-force-needed
      Matter.Body.applyForce(player.body, player.body.position, {
        x: cos(player.body.angle) * 0.04,
        y: sin(player.body.angle) * -0.01,
      });
      player.jetpack_state = 1;
    } else {
      player.jetpack_state = 0;
    }

    //Restart Key, exclusive to second and third part.
    if (keyIsDown(82) == true) {
      ui.transition();
      current_section = 0;
      part = 3;
      swimming = 0;
      Matter.Body.setPosition(
        player.body,
        createVector(width * 0.25, height * 0.6)
      );
      Matter.Body.setAngle(player.body, 39);
    }
  }
}

function fixResolution() {
  const { canvasWidth, canvasHeight } = updateCanvasDimensions();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  scaleFactor = baseWidth / baseHeight;

  const x = (windowWidth - canvasWidth) / 2;
  const y = (windowHeight - canvasHeight) / 2;
  canvas.position(x, y);

  pixelDensity(window.devicePixelRatio);
  strokeWeight(2 * scaleFactor);
  levels.position = createVector(canvasWidth, canvasHeight);
  player.fixValues();
}

//Source: https://jslegenddev.substack.com/p/how-to-make-your-canvas-scale-to
const updateCanvasDimensions = () => {
  if (windowWidth / windowHeight > aspectRatio) {
    return {
      canvasWidth: windowHeight * aspectRatio,
      canvasHeight: windowHeight,
    };
  }

  return {
    canvasWidth: windowWidth,
    canvasHeight: windowWidth / aspectRatio,
  };
};

//Check if on phone.
//https://editor.p5js.org/nun.fall202/sketches/Sj_DIYfwQ
window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

//This should only be used for electron.
function keyPressed() {
  if (key === "q") {
    window.close(); ///Closes Electron.
  }

  if (
    (key == "r" || key == "R") &&
    (part == 2 || part == 3) &&
    (cinematic_scene == 2 || cinematic_scene == 5)
  ) {
    attempts++;
  }
  if (key === "w") {
    console.log(engine.world.bodies);
  }

  if (key === "t") {
    resetLevelValues();
  }

  if (key == "z") {
    move_platforms();
  }

  /*   if (key == "x") {
    player.jump();
  } */

  if (key == "c") {
    console.log(obstacles.length);
  }
}

//The platforms have to be a specific index value...
function move_platforms() {
  platform_movement_started = true;
  obstacles[7].open_platform("positive");
  obstacles[8].open_platform("negative");
}

function activate_platform() {
  platform_activation_started = true;
  obstacles[13].toggle_platform();
}

function swim_mode() {
  swimming = 1;
  player.float();
}

function handleCollisions(event) {
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //Retrieve the particles associated with the colliding bodies via the plugin.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;

    if (
      particleA instanceof Activable_Level_Obstacle &&
      particleB instanceof Player &&
      current_section == 2
    ) {
      activate_platform();
    }

    if (
      particleA instanceof Water_Level_Obstacle &&
      particleB instanceof Player &&
      current_section == 3
    ) {
      console.log("Hello?");
      swim_mode();
    }

    if (
      particleA instanceof Water_Disabler_Level_Obstacle &&
      particleB instanceof Player &&
      current_section == 3
    ) {
      swimming = 0; //Disable swimming.
    }

    if (
      particleA instanceof Level_Detector_Crasher &&
      particleB instanceof Player &&
      current_section == 2 &&
      part == 3 &&
      player.cancrash == 1
    ) {
      player.crashed = 1;
      cinematic_scene = 6;
    }
  }
}
