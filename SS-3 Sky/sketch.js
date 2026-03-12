// sun position
let sunHeight = 150;

// sun mode
let blackHole = false;

// birds
let birdX = -50;

// stars
let starX = [];
let starY = [];

// horizon
let horizon = 200;

function setup() {
  createCanvas(600, 400);
}

function draw() {

  // background color changes depending on sun height
  if (sunHeight < 100) {
    background(20, 20, 60); // night
  } 
  else if (sunHeight < 200) {
    background(255, 150, 100); // sunset
  } 
  else {
    background(135, 206, 235); // daytime
  }

  // draw stars
  for (let i = 0; i < starX.length; i++) {
    fill(255);
    circle(starX[i], starY[i], 4);
  }

  // sun follows mouse
  sunHeight = mouseY;

  // draw sun or black hole
  if (blackHole == false) {
    fill(255, 200, 0);
    circle(width/2, sunHeight, 80);
  } else {
    fill(0);
    circle(width/2, sunHeight, 80);

    // random glowing ring
    stroke(255, random(50,150), random(150,255));
    noFill();
    circle(width/2, sunHeight, random(90,120));
    noStroke();
  }

  // horizon
  fill(50, 200, 80);
  rect(0, horizon, width, height);

  // birds move across screen
  fill(0);
  birdX += 2;

  for (let i = 0; i < 3; i++) {
    triangle(birdX + i*20, 100, birdX + 10 + i*20, 90, birdX + 20 + i*20, 100);
  }

  // reset birds randomly
  if (birdX > width) {
    birdX = random(-100, -50);
  }
}

// mouse click toggles black hole
function mousePressed() {
  blackHole = !blackHole;
}

// key press spawns random stars
function keyPressed() {
  starX.push(random(width));
  starY.push(random(height/2));
}