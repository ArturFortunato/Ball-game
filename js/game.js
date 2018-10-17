class Game {
    constructor(num_balls) {
        ball_list = [];
        table = new Table();

        for (i = 0; i < num_balls; i++) {
            newBall = false;

            while (!newBall) {
                x = Math.randFloat(-5 + RADIUS, 5 - RADIUS);
                z = Math.randFloat(-10 + RADIUS, 10 - RADIUS);
                if (!colides(x, z))
                    newBall = true;
            }
            this.addBall(new Ball(x, y, z));
        }
    }

    addBall(ball) {
        ball_list.add(ball);
        scene.add(ball);
    }

    detectColisions() {
        return true;
    }
}