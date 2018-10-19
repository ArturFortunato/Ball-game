class Ball extends Objeto {
	constructor(pos_x, pos_y, pos_z, mass){
		super();

		this.x = pos_x;
		this.y = pos_y;
		this.z = pos_z;
		this.mass = mass;
		this.geometry = new THREE.SphereGeometry(RADIUS, 32, 32);

		this.addElement(pos_x, pos_y, pos_z, new THREE.SphereGeometry(RADIUS, 32, 32), BALL_MATERIAL);
		this.updateMatrixWorld();
		this.velocity = new THREE.Vector3(THREE.Math.randFloat(-3, 3), 0, THREE.Math.randFloat(-3, 3));

		return this;
	}

	getDistance(x, y, z) {
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) + Math.pow(this.z - z, 2));
	}

	moveBall(time) {
		this.position.x += this.velocity.x * 0.02;
		this.position.z += this.velocity.z * 0.02;
		this.x += this.velocity.x * 0.02;
		this.z += this.velocity.z * 0.02;
	}

	colides(ball) {
		return 2 * RADIUS >= this.getDistance(ball.x, ball.y, ball.z);
	}

	changeVelocity(x, y, z) {
		this.velocity.x = x;
		this.velocity.y = y;
		this.velocity.z = z;
	}

	drawAxis(type){
		if(type === 0){
			var axes = new THREE.AxesHelper(1.5);
			this.children[0].add(axes);
		}
		else {
			this.children[0].remove();
		}
	}

	removeAxis(){
		this.children[0].remove();
	}
}
