let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background('#7d8193'); // Match the background color
    for (let particle of particles) {
        particle.update();
        particle.show();
    }
}

class Particle {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.r = 2;
    }

    update() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150);
        ellipse(this.x, this.y, this.r * 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
