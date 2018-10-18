class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){
		super();

		this.x = pos_x;
		this.y = pos_y;
		this.z = pos_z;

		this.addElement(pos_x, pos_y, pos_z, new THREE.SphereGeometry(RADIUS, 32, 32), BALL_MATERIAL);
		this.velocity = new THREE.Vector3(THREE.Math.randFloat(1,3), 0, THREE.Math.randFloat(1,3));

		return this;
	}

	getDistance(x, y, z) {
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) + Math.pow(this.z - z, 2));
	}

	moveBall(time) {
		this.position.x += this.velocity.x * time;
		this.position.z += this.velocity.z * time;
	}
}