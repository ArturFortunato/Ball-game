class Game {
    constructor(num_balls) {
        this.ball_list = [];
        
        this.table = new Table();
        scene.add(this.table);

        for (var i = 0; i < num_balls; i++) {
            var newBall = false;

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
        sthis.ball_list.add(ball);
        scene.add(ball);
    }

    detectColisions() {
        return true;
    }
}