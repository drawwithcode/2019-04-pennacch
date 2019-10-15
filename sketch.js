var mySound;
var analyzer;
var backgroundImage;
var logoImage;

function preload() {
  // put preload code here
  mySound = loadSound("./assets/uno.mp3");
  backgroundImage = loadImage("./assets/01.jpg");
  logoImage = loadImage("./assets/02.png");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(200);
  noStroke();

  fill(150);
  triangle(width / 2 - 18, height - 50, width / 2 - 18, height - 100, width / 2 + 27, height - 75);

  analyzer = new p5.Amplitude;
  analyzer.setInput(mySound);

  fft = new p5.FFT();
  fft.setInput(mySound);

}

function draw() {
  // put drawing code here
  background(backgroundImage);
  //audio spectrum
  strokeWeight(8);
  noFill();
  stroke('orange');
  let spectrum = fft.analyze();

  for (i = 0; i < spectrum.length; i++) {
    point(i * 10, map(spectrum[i], 0, 255, height - 10, 0));
  }


  image(logoImage, 20, 55, 300, 100);
  noStroke();
  fill(220);
  rectMode(CORNERS);
  rect(width / 2 - 50, height - 200, width / 2 + 50, height - 100, 20);
  fill(125);
  triangle(width / 2 - 18, height - 120, width / 2 - 18, height - 180, width / 2 + 27, height - 150, );

  //text
  var myText = "Move horizontal to modify rate, move vertical to modify amp ";
  textFont("Karma");
  textSize(29);
  fill(100);
  text(myText,width / 2 - 200 , 450, 450,400);

  fill("Aquamarine" );
  rect(width / 2 - 200, 200, width / 2 + 200, 400, 5);
  strokeWeight(1);
  stroke('white');
  line(width/2 , 200, width/2 , 400);
  line(width/2-200,300,width/2+200,300);
  if (mouseX >= width / 2 - 200 && mouseX <= width / 2 + 200 && mouseY >= 200 && mouseY <= 400) {
    strokeWeight(10);
    stroke('red');
    noCursor();
    point(mouseX, mouseY);
    mySound.amp(map(mouseY, 400, 200, 0, 1));
    mySound.rate(map(mouseX, width / 2 - 200, width / 2 + 200 , 0 , 2 ));
  } else {
    cursor(ARROW);
    mySound.amp(1);
    mySound.rate(1);


  }





}

function mouseClicked() {
  if (mouseX >= width / 2 - 50 && mouseX <= width / 2 + 50 && mouseY >= height - 200 && mouseY <= height - 100) {
    if (mySound.isPlaying() == false) {
      mySound.play();

    } else {
      mySound.stop();
    }
  }
}
