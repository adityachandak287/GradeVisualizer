var total = 0;
var avg = 0;
var std = 2;

var totalSlider, avgSlider, stdSlider;

var sliderY = 0;
var numberLineY;
var fail = 50;
var regionLineY = 0;

var failAlpha = 100;
var passAlpha = 100;

var failColor, sColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  numberLineY = height * 0.8;
  regionLineY = height * 0.6;
  failColor = color(0); //, 0, 0);
  sColor = color(255); //, 255, 0);
  sliderY = height * 0.1;
  sliderX = width / 4;
  sliderWidth = "" + parseInt((width * 0.9) / 2) + "px";
  totalWidth = "" + parseInt(width / 2) + "px";
  totalSlider = createSlider(0, 100, 50);
  totalSlider.style("width", totalWidth);
  totalSlider.position(width / 4, height * 0.3);

  avgSlider = createSlider(0, 100, 50);
  avgSlider.style("width", sliderWidth);
  avgSlider.position(1 * sliderX - avgSlider.width / 2, sliderY);

  stdSlider = createSlider(0, 250, 100);
  stdSlider.style("width", sliderWidth);
  stdSlider.position(3 * sliderX - stdSlider.width / 2, sliderY);
  alert(
    "Adjust the Average, Standard Deviation and Total sliders to visualize class grades."
  );
}

function draw() {
  background(0);
  strokeWeight(1);
  total = totalSlider.value();
  avg = avgSlider.value();
  std = stdSlider.value() / 10;

  textAlign(CENTER);
  fill(255);
  textSize(24);
  var sliderMargin = 20;
  text("Total Marks", width / 2, height * 0.3 - sliderMargin);
  text("Class Average", 1 * sliderX, sliderY - sliderMargin);
  text("Standard Deviation", 3 * sliderX, sliderY - sliderMargin);
  text(total, width / 2, height * 0.3 + sliderMargin * 3);
  text(avg, 1 * sliderX, sliderY + sliderMargin * 3);
  text(std, 3 * sliderX, sliderY + sliderMargin * 3);

  noStroke();
  fill(200, 4, 4, failAlpha);
  rect(0, numberLineY + 1, (width * fail) / 100, height - numberLineY);
  fill(4, 200, 33, passAlpha);
  rect(
    (width * fail) / 100,
    numberLineY + 1,
    width - fail,
    height - numberLineY
  );
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, failAlpha);
  text("FAIL", (width * fail) / 200, numberLineY + (height - numberLineY) / 2);
  fill(255, passAlpha);
  text(
    "PASS",
    ((fail + (100 - fail) / 2) * width) / 100,
    numberLineY + (height - numberLineY) / 2
  );

  sGrade = max(round(avg + std), 0);
  aGrade = max(round(avg + std * 0.5), 0);
  bGrade = max(round(avg - std * 0.5), 0);
  cGrade = max(round(avg - std), 0);
  dGrade = max(round(avg - std * 1.5), 0);
  eGrade = max(round(avg - std * 2), 0);
  fail = min(eGrade, fail);
  if (eGrade <= 50) fail = eGrade;
  else {
    fail = 50;
    eGrade = 50;
  }

  const cutoffs = [
    0,
    fail,
    eGrade,
    dGrade,
    cGrade,
    bGrade,
    aGrade,
    sGrade,
    100
  ];
  noStroke();
  textSize(24);
  var flag = -1;
  if (total < fail) {
    fill(255, 255, 0);
    flag = 1;
  } else fill(lerpColor(failColor, sColor, 1 / 8));
  rect(0, regionLineY, (width * fail) / 100, numberLineY - regionLineY);
  for (var i = 1; i < cutoffs.length - 1; i++) {
    var regionX = (width * cutoffs[i]) / 100;
    var regionWidth = (width * (cutoffs[i + 1] - cutoffs[i])) / 100;
    noStroke();
    if (i < 7 && total >= cutoffs[i] && total < cutoffs[i + 1]) {
      fill(255, 255, 0);
      flag = i;
    } else if (i == 7 && total >= cutoffs[i]) {
      fill(255, 255, 0);
      flag = i;
    } else {
      fill(lerpColor(failColor, sColor, i / 8));
    }
    rect(regionX, regionLineY, regionWidth, numberLineY - regionLineY);
    fill(255);
    stroke(255);
    strokeWeight(1);
    textAlign(CENTER);
    if (i == 1) {
      regionX = 0;
      regionWidth = (width * fail) / 100;
    }
    if (std <= 7.5 && std > 5) textSize(16);
    else if (std <= 5 && std > 3.5) textSize(12);
    else if (std <= 3.5) {
      textSize(8);
      strokeWeight(0.8);
    }
    if (i > 1) text(cutoffs[i], regionX, regionLineY - 15);
    if (i == flag) {
      fill(0);
      stroke(0);
    }
    const gradeY = regionLineY + (numberLineY - regionLineY) / 2;
    text(" FEDCBAS"[i], regionX + regionWidth / 2, gradeY);
  }

  stroke(0);
  strokeWeight(4);
  line(0, numberLineY, width, numberLineY);
  fill(0);
  noStroke();
  const pointerX = (total * width) / 100;
  const ht = 10;
  triangle(
    pointerX - ht,
    numberLineY + ht,
    pointerX + ht,
    numberLineY + ht,
    pointerX,
    numberLineY - ht
  );

  if (total >= fail) passAlpha = 255;
  else passAlpha = 100;
  if (total < fail) failAlpha = 255;
  else failAlpha = 100;
}
