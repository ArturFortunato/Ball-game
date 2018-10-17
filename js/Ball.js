class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){
		super();

		this.position.x = pos_x;
		this.position.y = pos_y;
		this.position.z = pos_z;

		return this;
	}
}