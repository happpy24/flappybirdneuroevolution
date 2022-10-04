function Backdrop(x, img) {
	this.img = img;
	this.x = x;
	this.y = 0;
	this.vx = -1;
	
	this.show = function() {
		image(this.img, this.x, this.y, 405, height);
	}

	this.update = function() {
		if (this.x < -403) {
			this.x = (402 * 4);
		}
		this.x += this.vx;
	}
}