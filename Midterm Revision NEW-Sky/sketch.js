//WELCOMEEEE TO MY NEW AND IMPROVED MIDTERM PROJECT!

//Moveable sun, basic scenery for now, Click the screen to charge the towers...or click the birds for a surprise. Moveable day-night cycle AND press M for a super surprise. Press it again just in case

// SUN
let sunY = 150;

// MODE
let darkMode = false;

// BIRDS MAYBE I DO MORE DETAIL??
let birds = [];

// TOWERS (DEFINITELY MORE DETAIL ON THE CHARGE)
let charge = 0;
let clickCount = 0;
let beamActive = false;

// PEOPLE
let people = [];

// CACTUS (SUPPOSED TO BE A DESERT BUT I CAN'T DRAW SAND)
let cactus = [];

// SKY SHIFT
let skyShift = 0;


//  SETUP 
function setup() {
  createCanvas(600, 400);
  resetScene();
}


//  MAIN LOOP 
function draw() {

  drawSky();
  drawSun();
  drawMountains();
  drawCactus();
  drawTowers();
  drawPeople();
  drawBirds();

  if (beamActive) {
    drawBeams();
    drawBlackHole();
    skyShift += 2; // fast sky change
  }
}


//  RESET FUNCTION 
function resetScene() {

  // reset values
  darkMode = false;
  charge = 0;
  clickCount = 0;
  beamActive = false;
  skyShift = 0;

  // reset birds
  birds = [];
  for (let i = 0; i < 5; i++) {
    birds.push({
      x: random(width),
      y: random(50, 150),
      falling: false,
      wing: random(100)
    });
  }

  // reset people
  people = [];
  for (let i = 0; i < 6; i++) {
    people.push({
      x: random(100, 500),
      dir: random([-1, 1])
    });
  }

  // reset cactus
  cactus = [];
  for (let i = 0; i < 5; i++) {
    cactus.push({
      x: random(width),
      h: random(40, 80)
    });
  }
}


//  SKY 
function drawSky() {

  let c;

  if (!darkMode) {

    if (beamActive) {
      // rapid flicker effect (I gotta make it smoother color change wise or else have sun and moon cycle) cirle val?
      c = color(random(20, 255), random(20, 100), random(50, 200));
    }

    else if (sunY < 150) {
      c = color(135, 206, 235); // day
    } 
    else if (sunY < 250) {
      c = color(255, 140, 0); // evening
    } 
    else {
      c = color(20, 20, 60); // night
    }

  } else {
    c = color(0);
  }

  background(c);
}


// SUN 
function drawSun() {
  fill(255, 180, 0);
  noStroke();
  circle(300, sunY, 80);
}


//  MOUNTAINS (I'll be adding more layers and detail to this but for now it's just a simple triangle)
function drawMountains() {
  fill(120, 70, 20);
  triangle(0, 400, 200, 200, 400, 400);
  triangle(200, 400, 400, 220, 600, 400);
}


//  CACTUS (SPACE TS OUTTTTTTTTT)
function drawCactus() {
  fill(0, 150, 80);

  for (let c of cactus) {
    rect(c.x, 400 - c.h, 20, c.h);
    rect(c.x - 10, 400 - c.h + 20, 10, 20);
    rect(c.x + 20, 400 - c.h + 30, 10, 20);
  }
}


//  BIRDS (Hehehehe flap n flap) MORE BIRDS 
function drawBirds() {

  for (let b of birds) {

    stroke(0);
    noFill();

    let flap = sin(frameCount * 0.2 + b.wing) * 5;

    line(b.x, b.y, b.x + 10, b.y - flap);
    line(b.x + 10, b.y - flap, b.x + 20, b.y);

    if (!b.falling) {
      b.x += 1;
    } else {
      b.y += 4;
    }

    if (b.x > width) b.x = -20;
  }
}


//  TOWERS (In nyc is wild, anyways obv more detail)
function drawTowers() {

  let glow = darkMode ? 200 : 0;

  // LEFT
  fill(120 + glow, 0, 150);
  rect(50, 200, 50, 200);

  fill(255, 215, 0);
  rect(60, 180, 30, 20 + charge * 20);

  // RIGHT
  fill(120 + glow, 0, 150);
  rect(500, 200, 50, 200);

  fill(255, 215, 0);
  rect(510, 180, 30, 20 + charge * 20);
}


//  PEOPLE (DETAIL)
function drawPeople() {

  fill(0);

  for (let p of people) {

    circle(p.x, 360, 5);
    line(p.x, 360, p.x, 370);

    p.x += p.dir * 0.5;

    if (p.x < 40 || p.x > width - 40) {
      p.dir *= -1;
    }
  }
}


// BEAMS (Taking inspo from minecraft beacons)
function drawBeams() {
  stroke(255, 215, 0);
  strokeWeight(2);

  line(75, 180, 300, 200);
  line(525, 180, 300, 200);
}


// BLACK HOLE (DETAIL)
function drawBlackHole() {

  noStroke();
  fill(0);
  circle(300, 200, 80 + sin(frameCount * 0.2) * 10);

  noFill();
  stroke(255, 0, 200);
  circle(300, 200, 120);
}

// CLICK
function mousePressed() {

  clickCount++;
  charge += 0.1;

  if (clickCount >= 10) {
    beamActive = true;
  }

  // hit birds (fuck them birds but also I'll have one transform into a dragon and "eat the mouse"????)
  for (let b of birds) {
    if (dist(mouseX, mouseY, b.x, b.y) < 20) {
      b.falling = true;
    }
  }
}

// DRAG SUN
function mouseDragged() {
  sunY = mouseY;
}

// KEYS
function keyPressed() {

  if (key === 'm' || key === 'M') {
    darkMode = !darkMode;
  }

  // RESET BUTTON
  if (key === 'r' || key === 'R') {
    resetScene();
  }
}