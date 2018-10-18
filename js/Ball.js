class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z){
		super();

		this.x = pos_x;
		this.y = pos_y;
		this.z = pos_z;
		
		this.addElement(pos_x, pos_y, pos_z, new THREE.SphereGeometry(RADIUS, 32, 32), BALL_MATERIAL);
		this.updateMatrixWorld();
		this.velocity = new THREE.Vector3(THREE.Math.randFloat(-3, 3), 0, THREE.Math.randFloat(-3, 3));

		return this;
	}

	getDistance(x, y, z) {
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) + Math.pow(this.z - z, 2));
	}

	moveBall(time) {
		this.position.x += this.velocity.x * 0.05;
		this.position.z += this.velocity.z * 0.05;
		this.x += this.velocity.x * 0.05;
		this.z += this.velocity.z * 0.05;
	}

	colides(ball) {
		return 2 * RADIUS >= this.getDistance(ball.x, ball.y, ball.z);
	}

	changeVelocity(x, y, z) {
		this.velocity.x = x;
		this.velocity.y = y;
		this.velocity.z = z;
	}
}
