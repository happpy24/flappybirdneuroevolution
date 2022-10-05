function Bird(img) {
	this.img = img;
	this.x = 300
	this.y = 288;
	this.gravity = 1;
	this.vy = 0;

	this.score = 0;
	this.fitniss = 0;
	this.brain = new NeuralNetwork(5,8,2);

	this.show = function() {
		image(img, this.x, this.y, 51, 36);
	}

	this.up = function() {
		this.vy = -13;
	}

	this.idle = function() {
		if (this.y > 288 + 10) {
			this.vy += -0.2;
			this.y += this.vy;
		} else {
			this.vy += 0.2;
			this.y += this.vy;
		}
		
	}

	this.dead = function() {
		this.vy += this.gravity;
		this.y += this.vy;
		
		if (this.y > height - 160) {
			this.y = height - 160;
			this.vy = 0;
		}
	}

	this.think = function(pipes) {

		let closestPipe = null;
		let closestD = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let d = pipes[i].x - this.x;
			if (i > 6) {
				i = 0;
			}
			if (d < closestD && d > 0) {
				closestPipe = pipes[i]
				closestD = d;
			}
		}
		
		let inputs = [];

		inputs[0] = map(closestPipe.x, this.x, width, 0, 1);
		inputs[1] = map(closestPipe.y1, 0, height, 0, 1);
		inputs[2] = map(closestPipe.y2, 0, height, 0, 1);
		inputs[3] = map(this.y, 0, height, 0, 1);
		inputs[4] = map(this.vy, -5, -5, 0, 1);
			
		let output = this.brain.predict(inputs);
		if (output[0] < output[1]) {
			this.up();
		}
	}

	this.update = function() {
		this.score++;
		this.vy += this.gravity;
		this.y += this.vy;
	}
}