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
            this.addBall(new Ball(x, RADIUS, z));
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
                    this.ball_list[j].changeVelocity(-this.ball_list[j].velocity.x,0,-this.ball_list[j].velocity.z);
                    return true;
                }
        }
        return false;
    }
    
    colidesWithWall(ball){
        return Math.abs(ball.x) >= (10 - RADIUS) || Math.abs(ball.z) >= (5 - RADIUS);
    }

    refresh() {
        var time = clock.getDelta();

        for(var i = 0; i < NUM_BALLS; i++) {
            if(this.colidesWithBalls(i))
                this.ball_list[i].changeVelocity(-this.ball_list[i].velocity.x,0,-this.ball_list[i].velocity.z);

            else if(this.colidesWithWall(this.ball_list[i]))
                this.ball_list[i].changeVelocity(-this.ball_list[i].velocity.x, 0, -this.ball_list[i].velocity.z);
            
            this.ball_list[i].moveBall(time);
        }
    }
}
