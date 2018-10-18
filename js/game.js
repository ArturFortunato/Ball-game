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

    colidesWithWall(ball){
      if (Math.abs(ball.x) >= (10 - RADIUS)){
        ball.changeVelocity(0, 0, 0);
        colide = true;
      }
      if(Math.abs(ball.z) >= (5 - RADIUS)){
        ball.changeVelocity(0, 0, 0);
        colide = true;
      }
    }

    refresh() {
        var time = clock.getDelta();
        for(var i = 0; i < 1; i++) {

          this.colidesWithWall(this.ball_list[i]);
            //if(colides(i))
                //print("Colidi" + i);
            //else if(colidesWithWall(i))
                //print("Bati na parede:" + i);

              this.ball_list[i].moveBall(time);
        }
    }
}
