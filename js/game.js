class Game {
    constructor() {
        this.ball_list = [];

        this.table = new Table();
        scene.add(this.table);

        for (var i = 0; i < NUM_BALLS; i++) {
            var newBall = false;
            var x, z;
            while (!newBall) {
                x = THREE.Math.randFloat(-10 + RADIUS, 10 - RADIUS);
                z = THREE.Math.randFloat(-5 + RADIUS, 5 - RADIUS);
                if (!this.newBallColides(x, RADIUS, z))
                    newBall = true;
            }
            this.addBall(new Ball(x, RADIUS, z, 1));
        }
    }

    addBall(ball) {

        this.ball_list.push(ball);
        scene.add(ball);
    }

    newBallColides(x, y, z) {
        for (var i = 0; i < this.ball_list.length; i++)
            if(2 * RADIUS >= this.ball_list[i].getDistance(x, y, z))
                return true;
        return false;
    }

    colidesWithBalls(i) {
        for (var j = 0; j < NUM_BALLS; j++) {
            if(i != j)
                if(this.ball_list[i].colides(this.ball_list[j])) {
                	var b1_v = this.ball_list[i].velocity;
                	var b2_v = this.ball_list[j].velocity;

                	var b1_mass = this.ball_list[i].mass;
                	var b2_mass = this.ball_list[j].mass;

                	var b1_c = new THREE.Vector3(this.ball_list[i].x, 0 , this.ball_list[i].z);
                	console.log(b1_c);
                	var b2_c = new THREE.Vector3(this.ball_list[j].x, 0, this.ball_list[j].z);

                	var first_parcel = (2*b2_mass) / (b1_mass+b2_mass);
                	console.log(first_parcel);

                	var vector_mult = (b1_v.add(b2_v.negate())).dot(b1_c.add(b2_c.negate()));
                	console.log(vector_mult);
                	var norma_aux = Math.sqrt(Math.pow(b1_c.x - b2_c.x, 2) + Math.pow(b1_c.y - b2_c.y, 2) + Math.pow(b1_c.z - b2_c.z, 2));
                	var norma = Math.pow(norma_aux, 2);
                	console.log(norma);
                	var second_parcel_aux = vector_mult/norma;
                	var second_parcel = (b1_c.add(b2_c.negate())).multiplyScalar(second_parcel_aux);
                	var total = second_parcel.multiplyScalar(first_parcel);

                	var velocity = b1_v.add(total.negate());

                	this.ball_list[i].velocity = velocity;
                	this.ball_list[j].velocity = -velocity;
                    
                    return true;
                }
        }
        return false;
    }
    
    colidesWithWall(ball){
        if (Math.abs(ball.x) >= (10 - RADIUS))
            ball.changeVelocity(-ball.velocity.x, 0, ball.velocity.z);
        else if (Math.abs(ball.z) >= (5 - RADIUS))
            ball.changeVelocity(ball.velocity.x, 0, -ball.velocity.z);
    }

    refresh() {
        var time = clock.getDelta();

        for(var i = 0; i < NUM_BALLS; i++) {
            if(this.colidesWithBalls(i))
                this.ball_list[i].changeVelocity(-this.ball_list[i].velocity.x,0,-this.ball_list[i].velocity.z);

            this.colidesWithWall(this.ball_list[i])
            
            this.ball_list[i].moveBall(time);
        }
    }
}
