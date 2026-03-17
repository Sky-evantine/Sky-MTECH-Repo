//sun position
let sunHeight = 150;

//sun mode
let blackHole = false;

//birds
let birdX = -50;

//stars
let starX = [];
let starY = [];

//horizon
let horizon = 200;

// marilyn image + timer
let marilyn;
let marilynActive = false;
let marilynStartTime = 0;
let marilynDuration = 10000; //10 seconds

function preload() {
  marilyn = loadImage("marilyn.png"); 
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
}

function draw() {

  //background color changes depending on sun height
  if (sunHeight < 100) {
    background(20, 20, 60); //night
  } 
  else if (sunHeight < 200) {
    background(255, 150, 100); //sunset
  } 
  else {
    background(135, 206, 235); //daytime
  }

  //draw stars
  for (let i = 0; i < starX.length; i++) {
    fill(255);
    circle(starX[i], starY[i], 4);
  }

  //sun follows mouse
  sunHeight = mouseY;

  //check Marilyn timer
  if (marilynActive && millis() - marilynStartTime > marilynDuration) {
    marilynActive = false;
  }

  //draw sun or black hole
  if (blackHole == false) {
    fill(255, 200, 0);
    circle(width/2, sunHeight, 80);
  } else {
    fill(0);
    circle(width/2, sunHeight, 80);

    //glowing ring
    noFill();

    if (marilynActive) {
      stroke(255, 105, 180); //pink glow
    } else {
      stroke(255, random(50,150), random(150,255));
    }

    circle(width/2, sunHeight, random(90,120));
    noStroke();

    //Marilyn inside the moon
    if (marilynActive) {
      push();

      //create circular mask
      let maskG = createGraphics(80, 80);
      maskG.fill(255);
      maskG.circle(40, 40, 80);

      let maskedImg = marilyn.get();
     maskedImg.resize(100, 100);
      maskedImg.mask(maskG);

      image(maskedImg, width/2, sunHeight);

      pop();
    }
  }

  //horizon
  fill(50, 200, 80);
  rect(0, horizon, width, height);

  //birds move across screen
  fill(0);
  birdX += 2;

  for (let i = 0; i < 3; i++) {
    triangle(birdX + i*20, 100, birdX + 10 + i*20, 90, birdX + 20 + i*20, 100);
  }

  //reset birds randomly
  if (birdX > width) {
    birdX = random(-100, -50);
  }
}

//mouse click toggles black hole
function mousePressed() {
  blackHole = !blackHole;
}

//key press
function keyPressed() {

  //press M for Marilyn mode
  if (key === 'm' || key === 'M') {
    marilynActive = true;
    marilynStartTime = millis();
  }

  //spawn stars
  starX.push(random(width));
  starY.push(random(height/2));
}