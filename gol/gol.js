// Here are the rules of Game of life:

// If a box has life and it has less than 2 neighbors. It dies of loneliness. The box becomes lifeless next generation.
// If a box has life and it has more than 3 neighbors. It dies of overpopulation. The box becomes lifeless next generation.
// If a box has life and it has 2 to 3 neighbors. Nothing changes for this box.
// If a box has no life and it has 3 neighbors, the box in next generation fills with life because of reproduction.

// Enhanced topics:
// done Control speed of the Game of Life. (Checkout framerate, you can use slider to control the framerate )
// done Allow users to change the rules of survival.
// done Allow users to change the rules of reproduction.
// done Start/Stop the Game of life
// Multiple colors of life on the same board. <-- difficult
// * Darken colors for stable life.
// * Random initial states
// Well-known patterns of Game of Life to select from(Examples:Gosper Glider Gun, Glider, Lightweight train).
// Use Keyboard to control the cursor to place the life <-- difficult
// done Resize board on windows resize(Check out windowsResized) <-- recommend to retry
// done Switching between different styles. <-- easy
// Anything else that you could think of.

//

// variables

// TODO
let unitLength = 20; //The width and height of a box.
let radius = 0; //radius of the boxes
let boxColor = 150; //The color of the box.
let strokeColor = 50; //The color of the stroke of the box.
//add background color variable
let backGroundColor = 255;
//add background color variable

//add slider
let frRange;
let frValue;

frRange = document.querySelector("#frRange");
frValue = document.querySelector("#frValue");
frValue.innerHTML = frRange.value;

frRange.oninput = function () {
  frValue.innerHTML = this.value;
  //change framerate
  frameRate(frRange.valueAsNumber);
  //change framerate
  loop();
};
// slider bar

// preset Style 1
document.querySelector("#style-1").addEventListener("click", () => {
  unitLength = 20;
  radius = 50;
  boxColor = [54, 123, 179];
  strokeColor = 50;
  backGroundColor = [230, 177, 64];
  loop();
});

// preset Style 2
document.querySelector("#style-2").addEventListener("click", () => {
  unitLength = 30;
  radius = 0;
  boxColor = 150;
  strokeColor = 50;
  backGroundColor = [65, 138, 143];
  loop();
});

let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let l1, l2, l3, n1, n2, n3;
let random = false;

// add get values from user input
l1 = document.querySelector("#l1");
l2 = document.querySelector("#l2");
l3 = document.querySelector("#l3");
n1 = document.querySelector("#n1");
n2 = document.querySelector("#n2");
n3 = document.querySelector("#n3");
// add get values from user input

// add image
// let img;
// function preload() {
//   img = loadImage("./fire.svg");
// }
// add image

// enhanced

//

// variables

//************************/

// Setup function

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 200, windowHeight - 400);
  canvas.parent(document.querySelector("#canvas"));

  //change framerate
  frameRate(frRange.valueAsNumber);
  //change framerate

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

// Setup function

//************************/

// Initial function

/**
 * Initialize/reset the board state
 */
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      //for randomize initial stage
      // TODO
      // currentBoard[i][j] = random() > 0.8 ? 1 : 0;
      nextBoard[i][j] = 0;
    }
  }
}
// Initial function

//******************** */

// Draw function

function draw() {
  //canvas background
  // background(255);
  background(backGroundColor);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        fill(boxColor);
        // image(img, mouseX, mouseY, unitLength, unitLength);
      } else {
        //box color  = canvas background color
        // fill(255);
        fill(backGroundColor);
      }
      // TODO
      stroke(strokeColor);
      // TODO
      rect(i * unitLength, j * unitLength, unitLength, unitLength, radius);
      // shape of the box (board)
      // circle(i * unitLength, j * unitLength, unitLength);
      // rect(i * unitLength, j * unitLength, unitLength, unitLength, 50);
    }
  }
}

// Draw function

//*********************** */

// Generate function

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let dx of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          if (dx == 0 && dy == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          let peerX = (x + dx + columns) % columns;
          let peerY = (y + dy + rows) % rows;
          neighbors += currentBoard[peerX][peerY];
        }
      }

      // Rules of Life
      // if (currentBoard[x][y] == 1 && neighbors < 2) {
      if (
        currentBoard[x][y] == l1.valueAsNumber &&
        neighbors < n1.valueAsNumber
      ) {
        // Die of Loneliness (a box has life and it has LESS than 2 neighbors)
        // TODO
        nextBoard[x][y] = 0;
      }
      // else if (currentBoard[x][y] == 1 && neighbors > 3) {
      else if (
        currentBoard[x][y] == l2.valueAsNumber &&
        neighbors > n2.valueAsNumber
      ) {
        // Die of Overpopulation (a box has life and it has MORE than 3 neighbors)
        // TODO
        nextBoard[x][y] = 0;
      }
      // else if (currentBoard[x][y] == 0 && neighbors == 3) {
      else if (
        currentBoard[x][y] == l3.valueAsNumber &&
        neighbors == n3.valueAsNumber
      ) {
        // New life due to Reproduction (a box has NO life and it HAS 3 neighbors,)
        // TODO
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        // TODO
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

// Generate function

//*********************** */

/**
 * When mouse is dragged
 */

function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(boxColor);
  // image(img, mouseX, mouseY, unitLength, unitLength);
  // TODO
  stroke(strokeColor);
  // TODO
  rect(x * unitLength, y * unitLength, unitLength, unitLength, radius);
  // shape of the box when draw
  // circle(i * unitLength, j * unitLength, unitLength);
  // rect(x * unitLength, y * unitLength, unitLength, unitLength, 50);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
// function mouseReleased() {
//   loop();
// }

//*********************** */

// Reset Game
document.querySelector("#reset-game").addEventListener("click", function () {
  random = false;
  init();
  // add reload page
  window.location.reload();
  // add reload page
});
// Reset Game

// Start Game
document.querySelector("#start-game").addEventListener("click", function () {
  loop();
});
// Start Game

// Stop Game
document.querySelector("#stop-game").addEventListener("click", function () {
  noLoop();
});
// Stop Game

// Random
document.querySelector("#random").addEventListener("click", function () {
  random = true;
  init();
  loop();
});
// Random

// change of rule table
document.querySelector("#ruleTable").addEventListener("click", function () {
  loop();
});
// change of rule table

// resize
// TODO

function windowResized() {
  resizeCanvas(windowWidth - 200, windowHeight - 400);

  columns = floor((windowWidth - 200) / unitLength);
  rows = floor((windowHeight - 400) / unitLength);

  for (let i = 0; i < columns; i++) {
    if (!currentBoard[i]) {
      currentBoard[i] = [];
      nextBoard[i] = [];
    }
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == undefined) {
        currentBoard[i][j] = 0;
        nextBoard[i][j] = 0;
      }
    }
  }
}

// resize
