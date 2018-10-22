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
        setInterval(this.increaseVelocities, 5000, this);
    }

    addBall(ball) {
        this.ball_list.push(ball);
        scene.add(ball);
    }

    newBallColides(x, y, z) {
        for (var i = 0; i < this.ball_list.length; i++)
            if(2 * RADIUS >= this.ball_list[i].getDistance(x, y, z)) //Colide, nao pode ser colocada
                return true;
        return false;
    }

    increaseVelocities(game) {
        for(var i = 0; i < NUM_BALLS; i++)
            if(Math.abs(game.ball_list[i].velocity.x) < MAX_VELOCITY && Math.abs(game.ball_list[i].velocity.y) < MAX_VELOCITY && Math.abs(game.ball_list[i].velocity.z) < MAX_VELOCITY) {
                game.ball_list[i].increaseVelocity();
            }
    }

    getVelocityAfterColision(ball1, ball2) {
        var toReturn = ball1.velocity.clone();
        var vel1 = ball1.velocity.clone();
        var vel2_n = ball2.velocity.clone().negate();
        var distance_centers_sqr = Math.pow(ball1.mesh.position.x - ball2.mesh.position.x, 2) + Math.pow(ball1.mesh.position.y - ball2.mesh.position.y, 2) + Math.pow(ball1.mesh.position.z - ball2.mesh.position.z, 2);
        var vector_between_centers = new THREE.Vector3(ball1.mesh.position.x - ball2.mesh.position.x, ball1.mesh.position.y - ball2.mesh.position.y, ball1.mesh.position.z - ball2.mesh.position.z);

        var scalar1 = (2 * ball2.mass) / (ball1.mass + ball2.mass);
        var scalar2 = vel1.add(vel2_n).dot(vector_between_centers);
        var fim = vector_between_centers.multiplyScalar(scalar1 * scalar2 / distance_centers_sqr);
        toReturn.add(fim.negate());
        return toReturn;
    }

    correctColision(ball1, ball2) {
        
    }

    colidesWithBalls(i) {
        for (var j = 0; j < NUM_BALLS; j++) {
            if(i != j)
                if(this.ball_list[i].colides(this.ball_list[j])) {
                    var separate = -(2 * RADIUS - this.ball_list[i].getDistance(this.ball_list[j].mesh.position.x, this.ball_list[j].mesh.position.y, this.ball_list[j].mesh.position.z)) / 2;
                    this.ball_list[i].mesh.position.add(this.ball_list[i].velocity.clone().normalize().multiplyScalar(separate));
                    this.ball_list[j].mesh.position.add(this.ball_list[j].velocity.clone().normalize().multiplyScalar(separate));

                    var position1 = this.getVelocityAfterColision(this.ball_list[i], this.ball_list[j]);
                    this.ball_list[j].velocity.copy(this.getVelocityAfterColision(this.ball_list[j], this.ball_list[i]));
                    this.ball_list[i].velocity.copy(position1);
                }
        }
    }

    colidesWithWall(ball){
        if (Math.abs(ball.mesh.position.x) >= (10 - RADIUS)) {
            if (ball.mesh.position.x > 0)
                ball.mesh.position.x = 10 - RADIUS;
            else
                ball.mesh.position.x = RADIUS - 10;
            ball.changeVelocity(-ball.velocity.x, 0, ball.velocity.z);
        }
        else if (Math.abs(ball.mesh.position.z) >= (5 - RADIUS)) {
            if (ball.mesh.position.z > 0)
                ball.mesh.position.z = 5 - RADIUS;
            else
                ball.mesh.position.z = RADIUS - 5;
            ball.changeVelocity(ball.velocity.x, 0, -ball.velocity.z);
        }
    }

    refresh() {
        var time = clock.getDelta();

        for(var i = 0; i < NUM_BALLS; i++) {
            this.ball_list[i].moveBall(time);
            this.colidesWithBalls(i);

            this.colidesWithWall(this.ball_list[i]);
        }
    }
}
