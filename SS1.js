function setup() {
  createCanvas(400, 400);
}

function draw () {
  // Night sky
  background(0);

  // Moon glow
  noStroke();
  fill(255, 255, 200, 80);
  ellipse(300, 100, 120, 120);

  // Moon
  fill(255, 255, 210);
  ellipse(300, 100, 80, 80);

  // Moon craters
  fill(230, 230, 200);
  ellipse(285, 90, 10, 10);
  ellipse(315, 110, 12, 12);
  ellipse(300, 120, 8, 8);

  // Ground
  fill(20);
  rect(0, 300, 400, 100);

  // Face line art (white)
  stroke(255);
  strokeWeight(2);
  noFill();

  // Face outline
  ellipse(200, 220, 120, 150);

  // Eyes
  arc(175, 210, 20, 10, 0, PI);
  arc(225, 210, 20, 10, 0, PI);

  // Nose
  line(200, 215, 195, 235);
  line(195, 235, 205, 235);

  // Mouth
  arc(200, 250, 40, 20, 0, PI);
}
