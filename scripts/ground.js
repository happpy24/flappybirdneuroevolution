function Ground(x) {
	this.image = ground;
	this.x = x;
	this.y = height - 135;
	this.vx = -3.5;

	this.show = function() {
		image(this.image, this.x, this.y, 420, 140);
	}

	this.update = function() {
		if (this.x < -419) {
			this.x = (420 * 4);
		}
		this.x += this.vx;
	}
}