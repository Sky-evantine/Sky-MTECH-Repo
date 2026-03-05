// variable for initial sun position
let sunHeight = 600; // point below horizon
let blackSun = false;

// I gotta add a new color pallate for the sky and sun based on sun height, so I need to track those values
let redVal = 0;
let greenVal = 0;

let horizon = 200; // define horizon line   

// bird flock position so I can track later for animation   
let birdX = -50;

// black hole position VERY IMPORTANT- MAIN FEATURE
let blackHoleY = 120;

function setup() {
  createCanvas(600, 400);
}

function draw() {

  // sun follows mouse Y like in class
  sunHeight = mouseY;

  // map sun height to sky color. I think theres a video.-----------Future note yes there is I found it
  redVal = map(sunHeight, height, 0, 0, 255);
  greenVal = map(sunHeight, height, 0, 50, 200);

  // sky color
  if (sunHeight < horizon) {
    background(redVal, greenVal, 255);
  } else {
    background(0, 0, 40);
  }

  // NORMAL SUN----Base design I made before adding the black hole mode, I want to keep it as a fallback in case the black hole mode is too buggy or something. I also just like the way the sun looks so I want to keep it as an option. I can always add more features to it later to make it more interesting, but for now I just want a simple glowing sun that changes color based on its height in the sky.
  if (!blackSun) {

    fill(255,135,5,60);
    noStroke();
    circle(300, sunHeight, 180);

    fill(255,100,0,100);
    circle(300, sunHeight, 140);

  } 
  // BLACK HOLE MODE- so fucking cool
  else {

    drawBlackHole();

  }

  // mountains whatever
  fill(110, 50, 18);
  triangle(200, 400, 520, 253, 800, 400);
  fill(110, 95, 20);
  triangle(200, 400, 520, 253, 350, 400);

  fill(150, 75, 0);
  triangle(-100, 400, 150, 200, 400, 400);
  fill(100, 50, 12);
  triangle(-100, 400, 150, 200, 0, 400);

  fill(150, 100, 0);
  triangle(200, 400, 450, 250, 800, 400);
  fill(120, 80, 50);
  triangle(200, 400, 450, 250, 300, 400);

  // birds appear when sun rises above horizon, I want them to fly across the sky so I need to track their position and reset it when they go off screen. I also want them to only appear when the sun is above the horizon, so I need to check for that condition before drawing them. I can use a simple line drawing for the birds, maybe just a V shape to represent them flying. I also want to add some randomness to their position and size to make it look more natural.
  if (sunHeight < 300) {
    drawBirds();
  }
}


// BLACK HOLE- This is my function, not too hard easy concept
function drawBlackHole(){

  let x = 300;
  let y = blackHoleY;

  noStroke();

  // glowing ring- Refer to the city in SS1 what we liked
  fill(255,120,0,120);
  circle(x,y,160);

  fill(255,200,80,140);
  circle(x,y,120);

  fill(255,255,200,120);
  circle(x,y,90);

  // black center
  fill(0);
  circle(x,y,70);
}


// CLICK EVENT-In class
function mousePressed(){

  // toggle sun / black hole
  blackSun = !blackSun;

}


// function to draw birds-in class
function drawBirds() {

  stroke(0);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < 5; i++) {

    let x = birdX + i * 40;
    let y = 80 + i * 5;

    line(x, y, x + 10, y - 5);
    line(x + 10, y - 5, x + 20, y);

  }

  birdX += 2;

  if (birdX > width + 50) {
    birdX = -50;
  }
}