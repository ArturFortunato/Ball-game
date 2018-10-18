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

    getVelocityAfterColision(ball1, ball2) {
        var toReturn = ball1.velocity.clone();
        var vel1 = ball1.velocity.clone();
        var vel2_n = ball2.velocity.clone().negate();
        var distance_centers_sqr = Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2) + Math.pow(ball1.z - ball2.z, 2);
        var vector_between_centers = new THREE.Vector3(ball1.x - ball2.x, ball1.y - ball2.y, ball1.z - ball2.z);

        var scalar1 = (2 * ball2.mass) / (ball1.mass + ball2.mass);
        var scalar2 = vel1.add(vel2_n).dot(vector_between_centers);
        var fim = vector_between_centers.multiplyScalar(scalar1 * scalar2 / distance_centers_sqr);
        toReturn.add(fim.negate());
        return toReturn;
    }

    colidesWithBalls(i) {
        for (var j = 0; j < NUM_BALLS; j++) {
            if(i != j)
                if(this.ball_list[i].colides(this.ball_list[j])) {
                	var position1 = this.getVelocityAfterColision(this.ball_list[i], this.ball_list[j]);
                    this.ball_list[j].velocity.copy(this.getVelocityAfterColision(this.ball_list[j], this.ball_list[i]));
                    this.ball_list[i].velocity.copy(position1);	                    
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
            this.colidesWithBalls(i)

            this.colidesWithWall(this.ball_list[i])
            
            this.ball_list[i].moveBall(time);
        }
    }
}
