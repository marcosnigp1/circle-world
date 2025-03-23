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

//Level structure and design.
let obstacles = [];
let levels;
let current_section = 3; //Level control: //0 == Very first section,  //1 == First Level. //2 = Second section.  //3 = Third Section
let platform_movement_started = false;
let platform_activation_started = false;

//Fixed resolution: https://jslegenddev.substack.com/p/how-to-make-your-canvas-scale-to
const baseWidth = 1920;
const baseHeight = 1080;
const aspectRatio = baseWidth / baseHeight;
let scaleFactor = 1;

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

  //                       //////////////
  ///  STARTING PHYSICS   ///
  ////                    ////////////

  //Preparing Physics engine...
  engine = Engine.create();
  engine.gravity = Vector.create(0, 1);

  runner = Runner.create();

  //----- Mouse interaction (If this will be used at the end... -------
  let canvas_mouse = Mouse.create(canvas.elt);
  canvas_mouse.pixelRatio = pixelDensity(); //Make comfortable when selecting items on the canvas.

  let mouse_options = {
    mouse: canvas_mouse,
  };

  mConstraint = MouseConstraint.create(engine, mouse_options);
  //------------------------------

  //Add everything created so far into the engine, and run it.
  Composite.add(engine.world, [mConstraint]);
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
      width * 0.39,
      height * 0.88,
      width * 0.6,
      height * 0.3,
      0
    )
  );

  obstacles.push(
    new Water_Disabler_Level_Obstacle(
      width * 0.39,
      height * 0.66,
      width * 0.6,
      height * 0.05,
      0
    )
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

  //------------------------
  //---------------------------------
  //------------------------

  //Start player
  player = new Player(width * 0.25, height * 0.5, width * 0.01);
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function draw() {
  background(0, 10, 20);

  //Draw levels.
  levels.level_test();

  //Draw player.
  player.show();
  player.clampVelocity(); //Check if surpasses fixed values of velocity, and if does, clamp it. Also makes sure the mass stays the same.
  player.checkCurrentPosition();

  //Draw obstacles according to level.
  if (current_section == 0) {
    for (let i = 0; i < obstacles.length; i++) {
      if (i == 0) {
        obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }
    }
  }

  if (current_section == 1) {
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 1 && i <= 5) {
        obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }
    }
  }

  if (current_section == 2) {
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 6 && i <= 14) {
        obstacles[i].show();
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = false;
      } else {
        //Disable/Enable collisions.
        obstacles[i].body.isSensor = true;
      }
    }
  }

  if (current_section == 3) {
    for (let i = 0; i < obstacles.length; i++) {
      if (i >= 15) {
        obstacles[i].show();
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
    }
  }

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
  //levels.black_bars();

  ////////                        ////////////////
  /////// START PLAYER CONTROL.  /////////////
  /////                     ///////////////////

  /* Source where I got the help: https://p5js.org/reference/p5/keyIsDown/ */

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

  ////////                ////////////////
  /////// END PLAYER CONTROL /////////////
  /////                 ///////////////////
}

/* function windowResized() {
  fixResolution();
} */

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
  }
}
