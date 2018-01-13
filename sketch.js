function Firework(fuse, secondaries, x, y, xSpeed, ySpeed) {
    this.fuse         = fuse,
    this.secondaries  = secondaries,
    this.x            = x,
    this.y            = y,
    this.xSpeed       = xSpeed,
    this.ySpeed       = ySpeed,
    this.fwUpdate  = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.fuse--;
        this.ySpeed += 0.25;
    }
}

var fireworks = [];

function Fire(timeLeft, x, y) {
    this.timeLeft    = timeLeft,
    this.x           = x,
    this.y           = y,
    this.fUpdate     = function() {
        this.timeLeft -= 1;
    }
}
var fires = [];

function setup() {
    createCanvas(windowWidth, windowHeight-4);
    fireworks.push(new Firework(45, 5, windowWidth/2, windowHeight-5, 5, -15))
}

function draw() {
    background(0);
    var i;
    for (i = 0; i < fireworks.length; i++) {
        fires.push(new Fire(18, fireworks[i].x, fireworks[i].y))
    }

    for (i = 0; i < fireworks.length; i++) {
        fireworks[i].fwUpdate();
        if (fireworks[i].fuse <= 0) {
            var sub;
            for (sub = 0; sub < fireworks[i].secondaries; sub++) {
                fireworks.push(new Firework(random(15, 30), 0, fireworks[i].x, fireworks[i].y, random(-10,10), random(-8, 8)))
            }
        fireworks.splice(i, 1);
        }
    }

    for (i = 0; i < fires.length; i++) {
        fill(200, 200, 0);
        noStroke();
        ellipse(fires[i].x, fires[i].y, fires[i].timeLeft/2, fires[i].timeLeft/2);
    }

    for (i = 0; i < fires.length; i++) {
        fires[i].fUpdate();
        if (fires[i].timeLeft <= 0) {
            fires.splice(i, 1);
            i--;
        }
    }

    if (random(100) > 80) {
        fireworks.push(new Firework(random(35, 65), random(3,20), windowWidth/2, windowHeight-5, random(-15,15), random(-13, -20)))
    }
}
