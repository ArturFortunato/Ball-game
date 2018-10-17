var material;

class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){
		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.pos_z = pos_z;
		this.velocity = Math.randFloat(0.1, 5);

		return this;
	}
}