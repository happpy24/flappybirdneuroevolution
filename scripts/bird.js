function Bird(img) {
	this.img = img;
	this.x = 300
	this.y = 288;
	this.gravity = 1;
	this.vy = 0;

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

	this.update = function() {
		this.vy += this.gravity;
		this.y += this.vy;
	}
}