function Bird(img) {
	this.img = img;
	this.x = 300
	this.y = 288;
	this.gravity = 1;
	this.vy = 0;

	this.brain = new NeuralNetwork(4,4,1);

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

		let closest = null;
		let closestD = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let d = pipes[i].x - this.x;
			if (i > 6) {
				i = 0;
			}
			if (d < closestD && d > 0) {
				closest = pipes[i]
				closestD = d;
			}
		}
		
		let inputs = [];
		inputs[0] = this.y / height;
		inputs[1] = closest.y1 / height;
		inputs[2] = closest.y2 / height;
		inputs[3] = closest.x / width;
			
		let output = this.brain.predict(inputs);
		if (output > 0.5) {
			this.up();
		}
	}

	this.update = function() {
		this.vy += this.gravity;
		this.y += this.vy;
	}
}