
// sun + mode
let sunHeight = 600;
let blackSun = false;

// color
let redVal = 0;
let greenVal = 0;

let horizon = 200;

// birds
let birdX = -50;

// black hole system
let clickCount = 0;
let pulseSize = 0;
let pulseSpeed = 0.05;

// stars
let stars = [];
let showStars = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {

  sunHeight = mouseY;

  // NORMAL MODE
  if (!blackSun) {

    redVal = map(sunHeight, height, 0, 0, 255);
    greenVal = map(sunHeight, height, 0, 50, 200);

    if (sunHeight < horizon) {
      background(redVal, greenVal, 255);
    } else {
      background(0, 0, 40);
    }

    // SUN
    fill(255, 135, 5, 60);
    circle(300, sunHeight, 180);
    fill(255, 100, 0, 100);
    circle(300, sunHeight, 140);

    // MOUNTAINS
    drawMountains();

    // BIRDS
    if (sunHeight < 300) {
      drawBirds();
    }

  } 
  else {
    // BLACK HOLE MODE

    background(0);

    // stars (only if space pressed)
    if (showStars) {
      for (let s of stars) {
        fill(255);
        noStroke();
        circle(s.x, s.y, 2);
      }
    }

    // pulse animation (faster with clicks)
    pulseSpeed = 0.05 + clickCount * 0.02;
    pulseSize = sin(frameCount * pulseSpeed) * 20;

    let size = 150 + pulseSize;

    // FINAL FORM AFTER 6 CLICKS
    if (clickCount >= 6) {
      background(0);

      // white core
      fill(255);
      noStroke();
      circle(300, 200, size);

      // red ring
      noFill();
      stroke(255, 0, 0);
      strokeWeight(4);
      circle(300, 200, size + 30);
    } 
    else {
      // normal black hole
      fill(0);
      noStroke();
      circle(300, 200, size);

      // glowing ring
      noFill();
      stroke(255, 100 + random(100), 0);
      strokeWeight(3);
      circle(300, 200, size + 20);
    }
  }
}

// MOUSE CLICK
function mousePressed() {
  if (!blackSun) {
    blackSun = true; //activate black hole
  } else {
    clickCount++; //increase intensity
  }
}

// RESET
function keyPressed() {

  // RESET EVERYTHING
  if (key === 'r' || key === 'R') {
    blackSun = false;
    clickCount = 0;
    showStars = false;
    stars = [];
  }

  // SPACEBAR = STARS
  if (key === ' ') {
    showStars = true;

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: random(width),
        y: random(height)
      });
    }
  }
}

// MOUNTAINS
function drawMountains() {
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
}

// BIRDS
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
