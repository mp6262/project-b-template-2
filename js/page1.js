let analyzer;
let level;
let levelHistory = [];
let delay;
let bDelay = false;
let reverb;
let bReverb = false;
let fft;
let button1;
let button2;
let bgImage;

function preload() {
  bgm1 = loadSound("js/assets/Bob Dylan - Blowin' in the Wind (Official Audio) [ ezmp3.cc ].mp3");
  bgm2 = loadSound("js/assets/Aretha Franklin - Respect (Official Lyric Video) [ ezmp3.cc ].mp3");
  bgImage= loadImage("js/assets/60s asthetic.jpg")
}

function setup() {
  createCanvas(400, 600);
  angleMode(DEGREES);

  analyzer = new p5.Amplitude();
  button1 = createButton("Song 1");
  button1.mouseClicked(playSong1);
  button2 = createButton("Song 2");
  button2.mouseClicked(playSong2);

  delay = new p5.Delay();
  reverb = new p5.Reverb();

  fft = new p5.FFT();
}

function draw() {
  if (bgm1.isPlaying()) {
    background(sin(frameCount * 0.5) * 100, cos(frameCount * 0.5) * 100, cos(frameCount * 0.5) * 150);
    level = analyzer.getLevel();
    levelHistory.push(level);

    if (levelHistory.length > 360) {
      levelHistory.splice(0, 1);
    }

    displayLyric();
    songVisuals();
    soundEffects(bgm1);
  } else if (bgm2.isPlaying()) {
    background(sin(frameCount * 0.5) * 100, cos(frameCount * 0.5) * 100, cos(frameCount * 0.5) * 150);
    level = analyzer.getLevel();
    levelHistory.push(level);

    if (levelHistory.length > 360) {
      levelHistory.splice(0, 1);
    }

    displayLyric();
    songVisuals();
    soundEffects(bgm2);
  } else {
    background(bgImage);
  }
}

function mousePressed() {
  if (bgm1.isPlaying()) {
    bgm1.pause();
  } else if (bgm2.isPlaying()) {
    bgm2.pause();
  }
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    bDelay = !bDelay;
  }

  if (key === 'r' || key === 'R') {
    bReverb = !bReverb;
  }
}

function soundEffects(playingAudio) {
  delay.disconnect();
  reverb.disconnect();

  if (bDelay) {
    delay.process(playingAudio, 0.12, 0.7, 2300);
    delay.setType('pingPong');
  }

  if (bReverb) {
    reverb.process(playingAudio, 5, 3);
    reverb.amp(4);
  }
}

function playSong1() {
  if (bgm2.isPlaying()) {
    bgm2.pause();
  }
  bgm1.play();
  soundEffects(bgm1);
}

function playSong2() {
  if (bgm1.isPlaying()) {
    bgm1.pause();
  }
  bgm2.play();
  soundEffects(bgm2);
}

function songVisuals() {
  let dia = map(level, 0, 0.5, 100, 500);
  noStroke();
  fill(255, 255, 100, 100);
  circle(width / 2, 150, dia);

  beginShape();
  for (let i = 0; i < levelHistory.length; i++) {
    let b = levelHistory[i];
    let y = map(b, 0, 1, 200, 0);
    stroke(255);
    noFill();
    vertex(i, y + 350);
  }
  endShape();

  push();
  translate(width / 2, 100);
  beginShape();

  for (let i = 0; i < levelHistory.length; i++) {
    let r = map(levelHistory[i], 0, 1, 80, 300);
    let x = cos(i) * r;
    let y = sin(i) * r + 50;
    vertex(x, y);
  }
  endShape();
  pop();

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 500, 600);
    stroke("yellow");
    vertex(x, y);
  }
  endShape();
}
function displayLyric(){
  let t = ["The name of this tune is Mississippi goddam n/And I mean every word of it Alabama's gotten me so upset Tennessee made me lose my rest And everybody knows about Mississippi goddam Alabama's gotten me so upset Tennessee made me lose my rest And everybody knows about Mississippi goddam Can't you see it Can't you feel it It's all in the air I can't stand the pressure much longer Somebody say a prayer Alabama's gotten me so upset Tennessee made me lose my rest And everybody knows about Mississippi goddam This is a show tune But the show hasn't been written for it, yet Hound dogs on my trail School children sitting in jail Black cat cross my path I think every day's gonna be my last Lord have mercy on this land of mine We all gonna get it in due time I don't belong here I don't belong there I've even stopped believing in prayer Don't tell me I tell you Me and my people just about due I've been there so"];
}