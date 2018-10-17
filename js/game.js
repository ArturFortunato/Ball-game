class Game {
    constructor(num_balls) {
        this.ball_list = [];
        
        this.table = new Table();
        scene.add(this.table);

        for (var i = 0; i < num_balls; i++) {
            var newBall = false;

            while (!newBall) {
                /*x = Math.Math.randFloat(-5 + RADIUS, 5 - RADIUS);
                z = Math.Math.randFloat(-10 + RADIUS, 10 - RADIUS);
                if (!colides(x, z))
                    newBall = true;*/
                var x = i * 2;
                var z = i * 2;
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