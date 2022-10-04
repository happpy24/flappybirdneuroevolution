var pipeheights = [-350, -300, -250, -200, -150, -100, -50];
function Pipe(x, imagetop, imagebottom) {
	this.imagetop = imagetop;
	this.imagebottom = imagebottom;
	this.x = x;
	this.y1 = random(pipeheights);
	this.y2 = this.y1 + 575;
	this.w = 65;
	this.h = 400;
	this.vx = -3.5;
	this.pointable = true;

	this.hits = function(bird) {
		if (bird.y < this.y1 + 400 || bird.y > this.y2 - 25) {
			if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w) {
				return true;
			}
		}
		return false;
	}

	this.show = function() {
		image(this.imagetop, this.x, this.y1, this.w, this.h)
		image(this.imagebottom, this.x, this.y2, this.w, this.h)
	}

	this.point = function(bird) {
		if (bird.x > this.x && this.pointable == true) {
			this.pointable = false;
			return true;
		}
		return false;
	}

	this.update = function() {
		if (this.x < -65) {
			this.pointable = true;
			this.x = (width + 256 - 65);
			this.y1 = random(pipeheights);
			this.y2 = this.y1 + 550;
		}
		this.x += this.vx;
	}
}