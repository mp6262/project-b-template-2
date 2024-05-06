let radioWidth = 200;
let radioHeight = 150;
let knobDiameter = 40;
let knobAngle = 0;
let knobIsDragging = false;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(255);
  drawRadio(width / 2, height / 2, radioWidth, radioHeight);
  drawKnob(width / 2, height / 2, radioWidth, radioHeight, knobDiameter, knobAngle);
  drawCenturies(); // Call the drawCenturies function
}

function drawRadio(x, y, width, height) {
  noStroke();
  fill(70, 111, 122);
  rect(width / 2, height / 2, 250, 200);
  fill(200);
  circle(180, 200, 100);
  fill(255);
  rect(145, 90, 160, 20);
  fill(0);
  circle(180, 200, 90);
}

function drawKnob(radioX, radioY, radioWidth, radioHeight, knobDiameter, angle) {
  let knobX = radioX + cos(angle) * (radioWidth / 2 - knobDiameter / 2);
  let knobY = radioY + sin(angle) * (radioHeight / 2 - knobDiameter / 2);

  fill(73, 170, 196);
  ellipse(knobX, knobY, knobDiameter);
}

function mousePressed() {
  let knobX = width / 2 + cos(knobAngle) * (radioWidth / 2 - knobDiameter / 2);
  let knobY = height / 2 + sin(knobAngle) * (radioHeight / 2 - knobDiameter / 2);
  let distance = dist(mouseX, mouseY, knobX, knobY);

  if (distance < knobDiameter / 2) {
    knobIsDragging = true;
  } else {
    // Check if the mouse is clicked on one of the century labels
    if (mouseX >= 175 && mouseX <= 225 && mouseY >= 50 && mouseY <= 100) {
      // Redirect to a new page based on the selected century
      window.location.href = "page1.html";
    } else if (mouseX >= 25 && mouseX <= 75 && mouseY >= 145 && mouseY <= 195) {
      window.location.href = "page2.html";
    } else if (mouseX >= 125 && mouseX <= 175 && mouseY >= 265 && mouseY <= 315) {
      window.location.href = "page3.html";
    } else if (mouseX >= 225 && mouseX <= 275 && mouseY >= 265 && mouseY <= 315) {
      window.location.href = "page4.html";
    } else if (mouseX >= 325 && mouseX <= 375 && mouseY >= 165 && mouseY <= 215) {
      window.location.href = "page5.html";
    }
  }
}

function mouseReleased() {
  knobIsDragging = false;
}

function mouseDragged() {
  if (knobIsDragging) {
    let centerX = width / 2;
    let centerY = height / 2;
    let newAngle = atan2(mouseY - centerY, mouseX - centerX);
    let angleDiff = newAngle - knobAngle;
    knobAngle += angleDiff;
  }
}

function drawCenturies() {
  textSize(20);
  textAlign(CENTER);
  fill(0);
  text("60s", 200, 75);
  text("70s", 50, 170);
  text("80s", 150, 290);
  text("90s", 250, 290);
  text("00s", 360, 190);
}