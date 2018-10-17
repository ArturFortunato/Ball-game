var material;

class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){
		this.position.x = pos_x;
        this.position.y = pos_y;
        this.position.z = pos_z;
		this.velocity = Math.randFloat(0.1, 5);
		this.vector_mov = new THREE.Vector3(Math.randFloat(0,2), Math.randFloat(0,2), Math.randFloat(0,2));

		return this;
	}
}