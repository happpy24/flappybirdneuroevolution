var bgDay, bgNight, ground, pipeGreenBottom, pipeGreenTop, pipeRedBottom, pipeRedTop, birdYellow, birdRed, birdBlue, taptap, gameOver;
var gameSize = [1280, 720];
var gamestate = 1;
var bird;
var backdrops = [];
var grounds = [];
var pipes = [];
var score = 0;
var highscore = 0;
var randompipe = ['green', 'red'];
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
	pipeRedBottom = loadImage('sprites/pipes/pipeRedBottom.png');
	pipeRedTop = loadImage('sprites/pipes/pipeRedTop.png');

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
	frameRate(50);
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

	// CREATE PIPES + RANDOMIZER
	var rpipe = random(randompipe);
	for (var i = 0; i < 6; i++) {
		var pipe;
		if (rpipe == 'green') {
			pipe = new Pipe(width + (i * 256), pipeGreenTop, pipeGreenBottom);
			pipes.push(pipe);
		} else if (rpipe == 'red') {
			pipe = new Pipe(width + (i * 256), pipeRedTop, pipeRedBottom);
			pipes.push(pipe);
		}
	}
	// CREATE GROUNDS
	for (var i = 0; i < 5; i++) {
		var ground;
		ground = new Ground(i * 420);
		grounds.push(ground);
	}

	// CREATE BIRD
	var rbird = random(randombird);
	if (rbird == 'yellow') {
		bird = new Bird(birdYellow);
	} else if (rbird == 'red') {
		bird = new Bird(birdRed);
	} else if (rbird == 'blue') {
		bird = new Bird(birdBlue);
	}
	
}

// MAIN DRAW FUNCTION -> 50FPS
function draw() {
	background(0);
	if (gamestate === 0) {
		menu();
	} else if (gamestate === 1) {
		game();
	} else if (gamestate === 2) {
		gameover();
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
	bird.idle();
	bird.show();

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

		// PIPE COLLISION & POINT DETECTION
		if (pipes[i].hits(bird)) {
			console.log("HIT");
			gamestate = 2;
		} if (pipes[i].point(bird)) {
			console.log("POINT");
			score += 1;
		}
	}

	// SCORE DRAW
	text(score, width/2, 100);

	// BIRD GROUND DETECTION & DRAW & UPDATE
	if (bird.y > height - 160 || bird.y < -20) {
		console.log("HIT")
		gamestate = 2;
	} else {
		bird.think(pipes);
		bird.update();
		bird.show();
	}

	// GROUND DRAW & PARALLAX
	for (var i = 0; i < grounds.length; i++) {
		grounds[i].update();
		grounds[i].show();
	}
}

// GAMESTATE = 2
function gameover() {
	// BACKDROP DRAW
	for (var i = 0; i < backdrops.length; i++) {
		backdrops[i].show();
	}

	// PIPE DRAW
	for (var i = 0; i < pipes.length; i++) {
		pipes[i].show();
	}

	// SCORE DRAW & UPDATER
	text(score, width/2, 100);
	if (score >= highscore) {
		highscore = score;
	}

	// BIRD DRAW
	bird.dead();
	bird.show();

	// GROUND DRAW
	for (var i = 0; i < grounds.length; i++) {
		grounds[i].show();
	}
	
	gamestate = 1;
	backdrops = [];
	grounds = [];
	pipes = [];
	score = 0;
	console.log(highscore);
	setup();
}

// KEY DETECTION
// function keyPressed() {
// 	if (key == ' ') {
// 		bird.up();
// 	}
// }