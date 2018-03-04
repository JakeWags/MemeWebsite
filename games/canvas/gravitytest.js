var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize',
  function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circle.recenter();
  })

  window.addEventListener('keydown',
   function(e) {
    if(e.keyCode === 32) {
      circle.jump();
    }
  })

  window.addEventListener('touchstart',
    function(e) {
      e.preventDefault();
      circle.jump();
  })

class Circle {
    constructor() {
      this.x = innerWidth/2;
      this.y = innerHeight/2;
      this.radius = 50;
      this.dy = 5;
      this.ay = 1;
      this.bottomLine = innerHeight/1.25;
      this.isOnGround = false;
}

  draw() {
    c.beginPath();
    c.fillStyle = "#182233";
    c.fillRect(0, 0, innerWidth, innerHeight);

    c.beginPath();
    c.font = "30px verdana";
    c.textAlign = "center";
    c.fillStyle = "#ffffff";
    c.fillText('Press space or tap!', innerWidth/2, innerHeight/4);

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "#ffffff";
    c.fill();

    c.beginPath();
    c.fillStyle = "#ea2e2e";
    c.fillRect(0, this.bottomLine, innerWidth, (innerHeight - (innerHeight - this.bottomLine)))
}

  update() {
    if ((this.y + this.radius) > this.bottomLine - this.dy) {
      this.dy *= -1;
    }

    this.y += this.dy;

    if ((this.y + this.radius) > this.bottomLine - this.dy) {
      this.isOnGround = true;
      this.dy = 0;
      this.ay = 0;
      console.log('on ground');
  } else {
    this.dy += this.ay;
  }

    this.draw();
}

  jump(e) {
    if(this.isOnGround) {
      this.dy = -20;
      this.ay = 1;
      this.isOnGround = false;
      console.log("we jumped!");
  }
}

  recenter() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.ay = 1;
    this.dy = 5;
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight)

  circle.update();
}


var circle = new Circle();
animate();
