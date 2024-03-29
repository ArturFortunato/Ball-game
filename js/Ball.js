class Ball extends Objeto {
	constructor(x, y, z, mass){
		super();

		this.mass = mass;

		BALL_MATERIAL = new THREE.MeshBasicMaterial( {color: generateRandomColor(), wireframe: true} );

		this.mesh = this.createMesh(new THREE.SphereGeometry(RADIUS, 32, 32), BALL_MATERIAL, x, y, z);
		this.addToScene(this.mesh);
		this.updateMatrixWorld();

		this.velocity = new THREE.Vector3(THREE.Math.randFloat(-VELOCITY, VELOCITY), 0, THREE.Math.randFloat(-VELOCITY, VELOCITY));
		this.mesh.add(new THREE.AxesHelper(1.5));
		return this;
	}

	getDistance(x, y, z) {
		return Math.sqrt(Math.pow(this.mesh.position.x - x, 2) + Math.pow(this.mesh.position.y - y, 2) + Math.pow(this.mesh.position.z - z, 2));
	}

	moveBall(time) {
		this.mesh.position.x += this.velocity.x * time;
		this.mesh.position.z += this.velocity.z * time;

		var vel = Math.sqrt(Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y, 2) + Math.pow(this.velocity.z, 2));
		var distance = vel*time; //distancia percorrida na frame
		var angle = distance/RADIUS;

		var quaternion = new THREE.Quaternion();
		quaternion.setFromAxisAngle(new THREE.Vector3(this.velocity.z,this.velocity.y,-this.velocity.x).normalize(), angle);
		this.mesh.applyQuaternion(quaternion);
	}

	colides(ball) {
		return 2 * RADIUS >= this.getDistance(ball.mesh.position.x, ball.mesh.position.y, ball.mesh.position.z);
	}

	changeVelocity(x, y, z) {
		this.velocity.x = x;
		this.velocity.y = y;
		this.velocity.z = z;
	}

	drawAxis(type){
		if(type === 1){ // type = 1 -> desenha os eixos da bola
			var axes = new THREE.AxesHelper(1.5);
			this.mesh.add(axes);
		}
		else { // type != 1 -> apaga os eixos da bola
			this.mesh.remove(this.mesh.children[0]);
		}
	}

	increaseVelocity() {
		this.velocity.multiplyScalar(1.2);
		if(Math.abs(this.velocity.x) > MAX_VELOCITY){
			if(this.velocity.x < 0)
				this.velocity.x = - MAX_VELOCITY;
			else
				this.velocity.x = MAX_VELOCITY;
		}
		if(Math.abs(this.velocity.z) > MAX_VELOCITY){
			if(this.velocity.z < 0)
				this.velocity.z = - MAX_VELOCITY;
			else
				this.velocity.z = MAX_VELOCITY;
		}
	}

}
