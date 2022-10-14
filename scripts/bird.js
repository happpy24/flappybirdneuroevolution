function mutate(x) {
  	if (random(1) < 0.1) {
    	let offset = randomGaussian() * 0.5;
    	let newx = x + offset;
    	return newx;
  	} else {
    	return x;
  	}
}

class Bird {
	constructor(img, brain) {
		this.img = img;
		this.x = 300;
		this.y = 288;
		this.gravity = 1;
		this.vy = 0;
	
		if (brain instanceof NeuralNetwork) {
        	this.brain = brain.copy();
        	this.brain.mutate(mutate);
    	} else {
       		this.brain = new NeuralNetwork(5, 12, 2);
    	}
	}

	show() {
		image(this.img, this.x, this.y, 51, 36);
	}

	up() {
		this.vy = -13;
	}

	idle() {
		if (this.y > 288 + 10) {
			this.vy += -0.2;
			this.y += this.vy;
		} else {
			this.vy += 0.2;
			this.y += this.vy;
		}
		
	}

	dead() {
		this.vy += this.gravity;
		this.y += this.vy;
		
		if (this.y > height - 160) {
			this.y = height - 160;
			this.vy = 0;
		}
	}	

	think(pipes) {
		if (pipes.length < 1) {
			return;
		}
		
		let closest;
		let record = Infinity;
		
		for (let i = 0; i < pipes.length; i++) {
			let diff = pipes[i].x - this.x;
			if (diff > 0 && diff < record) {
				closest = diff;
				closest = pipes[i];
			}
		}

		if (closest != null) {
			let inputs = [];
			inputs[0] = map(closest.x, this.x, width, 0, 1);
      		inputs[1] = map(closest.y + 400, 0, height, 0, 1);
      		inputs[2] = map(closest.bottom + 400, 0, height, 0, 1);
      		inputs[3] = map(this.y, 0, height, 0, 1);
      		inputs[4] = map(this.vy, -5, 5, 0, 1);

			let action = this.brain.predict(inputs);
			
			if (action[1] > action[0]) {
				this.up();
			}
		}
	}

	update() {
		this.score++;
		this.vy += this.gravity;
		this.y += this.vy;
	}
}