function Pipe(x, y, imagetop, imagebottom) {
	this.imagetop = imagetop;
	this.imagebottom = imagebottom;
	this.x = x;
	this.y = y;
	this.bottom = this.y + 610;
	this.w = 65;
	this.h = 400;
	this.vx = -3.5;

	this.show = function() {
		image(this.imagetop, this.x, this.y, this.w, this.h)
		image(this.imagebottom, this.x, this.bottom, this.w, this.h)
	}

	this.update = function() {
		this.x += this.vx;
	}

	this.hits = function(bird) {
		if (bird.y < this.y + 400 || bird.y > this.bottom - 25) {
			if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w) {
				console.log("HIT!");
				return true;
			}
		}
		return false;
	}
}