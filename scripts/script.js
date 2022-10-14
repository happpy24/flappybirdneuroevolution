const TOTAL = 500;
var totalPopulation = 500;
var allBirds = [];
var smartestBird;
var generation = 1;

var bgDay, bgNight, ground, pipeGreenBottom, pipeGreenTop, pipeRedBottom, pipeRedTop, birdYellow, birdRed, birdBlue, taptap, gameOver;
var gameSize = [1280, 720];
var gamestate = 0;
var birds = [];
var backdrops = [];
var grounds = [];
var pipes = [];
var score = -3;
var highscore = 0;
var pipeheights = [-350, -300, -250, -200, -150, -100, -50];
var randombackdrop = ['day', 'night'];
var randombird = ['yellow', 'red', 'blue'];

function preload() {
	// BACKGROUNDS
	bgDay = loadImage('sprites/backgrounds/bgDay.png');
	bgNight = loadImage('sprites/backgrounds/bgNight.png');
	ground = loadImage('sprites/backgrounds/ground.png');

	// PIPES
	pipeGreenBottom = loadImage('sprites/pipes/pipeGreenBottom.png');
	pipeGreenTop = loadImage('sprites/pipes/pipeGreenTop.png');

	// BIRDS
	birdYellow = loadImage('sprites/birdYellow.png');
	birdRed = loadImage('sprites/birdRed.png');
	birdBlue = loadImage('sprites/birdBlue.png');

	// MISCELLANEOUS
	taptap = loadImage('sprites/taptap.png');
	gameOver = loadImage('sprites/gameOver.png');
	flappybird = loadImage('sprites/flappybird.png');
	scoreFont = loadFont('bit5x3.ttf');
}

// SETUP
function setup() {
	createCanvas(gameSize[0], gameSize[1]);
	frameRate(60);
	textFont(scoreFont);
	stroke('#111');
	strokeWeight(10);
	fill(255, 255, 255);
	textAlign(CENTER);
	textSize(80);
	
	// CREATE BACKDROPS + RANDOMIZER
	var rbackdrop = random(randombackdrop);
	for (var i = 0; i < 5; i++) {
		var backdrop;
		if (rbackdrop == 'day') {
			backdrop = new Backdrop(i * 402, bgDay);
			backdrops.push(backdrop);
		} else if (rbackdrop == 'night') {
			backdrop = new Backdrop(i * 402, bgNight);
			backdrops.push(backdrop);
		}
	}
	
	// CREATE GROUNDS
	for (var i = 0; i < 5; i++) {
		var ground;
		ground = new Ground(i * 420);
		grounds.push(ground);
	}

	// CREATE POPULATION
	newBirds()
}

// MAIN DRAW FUNCTION -> 50FPS
function draw() {
	background(0);
	if (gamestate === 0) {
		menu();
	} else if (gamestate === 1) {
		game();
	}
}

// GAMESTATE = 0
function menu() {
	// BACKDROP DRAW & PARALLAX
	for (var i = 0; i < backdrops.length; i++) {
		backdrops[i].update();
		backdrops[i].show();
	}

	// SPRITES DRAW
	for (let i = birds.length - 1; i >= 0; i--) {
		birds[i].idle();
		birds[i].show();
	}
	

	// GROUND DRAW & PARALLAX
	for (var i = 0; i < grounds.length; i++) {
		grounds[i].update();
		grounds[i].show();
	}

}

// GAMESTATE = 1
function game() {
	// BACKDROP DRAW & PARALLAX
	for (var i = 0; i < backdrops.length; i++) {
		backdrops[i].update();
		backdrops[i].show();
	}
	
	// PIPE DRAW
	for (var i = 0; i < pipes.length; i++) {
		pipes[i].update();
		pipes[i].show();

		// PIPE COLLISION
		for (let j = birds.length - 1; j >= 0; j--) {
			if (pipes[i].hits(birds[j])) {
				birds.splice(j, 1);
			}
		}
	}
	
	if (frameCount % 90 == 0) {
		console.log('SPAWNED PIPE')
        score++;
		let height = random(pipeheights);
		pipes.push(new Pipe(width, height, pipeGreenTop, pipeGreenBottom));
		console.log(pipes)
	}

	if (score > 0) {
		textFont(scoreFont);
		stroke('#111');
		strokeWeight(10);
		fill(255, 255, 255);
		textAlign(CENTER);
		textSize(80);
		text(score, width/2, 100);
	} else {
		textFont(scoreFont);
		stroke('#111');
		strokeWeight(10);
		fill(255, 255, 255);
		textAlign(CENTER);
		textSize(80);
		text(0, width/2, 100);
	}
	
	textFont(scoreFont);
	stroke('#111');
	strokeWeight(2);
	fill(255, 255, 255);
	textAlign(LEFT);
	textSize(20);
	text("Generation: "+generation, 10, 20)
	text("Highscore: "+highscore, 10, 40)
	text("Alive Birds: "+birds.length, 10, 60)
	
	

	if (birds.length === 1) {
		smartestBird = birds[0];
	}

	if (birds.length === 0) {
		reset();
	}
	
	// GROUND DRAW & PARALLAX
	for (var i = 0; i < grounds.length; i++) {
		grounds[i].update();
		grounds[i].show();
	}

	for (let i = birds.length - 1; i >= 0; i--) {
		if (birds[i].y > height - 160) {
			birds[i].y = height - 161;
		} else if (birds[i].y < 0) {
			birds[i].y = 1;
		} else {
			birds[i].think(pipes);
			birds[i].update();
			birds[i].show();
		}
	}
}

function reset() {
	console.log("RESET")
	gamestate = 0;
	backdrops = [];
	grounds = [];
	pipes = [];
	if (score > highscore) {
		highscore = score;
	}
	score = -3;
	generation += 1;
	
	console.log(smartestBird);
	console.log("MAKING NEW BIRDS")
	newBirds();
	console.log("MADE NEW BIRDS")
	
	// CREATE BACKDROPS + RANDOMIZER
	rbackdrop = random(randombackdrop);
	for (var i = 0; i < 5; i++) {
		var backdrop;
		if (rbackdrop == 'day') {
			backdrop = new Backdrop(i * 402, bgDay);
			backdrops.push(backdrop);
		} else if (rbackdrop == 'night') {
			backdrop = new Backdrop(i * 402, bgNight);
			backdrops.push(backdrop);
		}
	}
	
	// CREATE GROUNDS
	for (var i = 0; i < 5; i++) {
		var ground;
		ground = new Ground(i * 420);
		grounds.push(ground);
	}
	
	gamestate = 1;
}

function newBirds() {
    for (let i = 0; i < totalPopulation; i++) {
    	let bird;
    	if (smartestBird){
    		bird = new Bird(birdRed, smartestBird.brain);
    	} else {
        	bird = new Bird(birdYellow);
    	}
    	birds[i] = bird;
    	allBirds[i] = bird;
  	}  
}

// KEY DETECTION
function keyPressed() {
	if (key == ' ') {
		if (gamestate == 0) {
			gamestate = 1;
		}
	}
}
