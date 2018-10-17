var material;

class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){

		this.createMesh(new THREE.SphereGeometry(RADIUS, 32, 32), pos_x, pos_y, pos_z);
		this.velocity = Math.randFloat(0.1, 5);
		this.vector_mov = new THREE.Vector3(Math.randFloat(0,2), Math.randFloat(0,2), Math.randFloat(0,2));

		return this;
	}
}