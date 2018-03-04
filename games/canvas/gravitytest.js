var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mousedown = false;

var mouse = {
  x: undefined,
  y: undefined
}

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

  window.addEventListener('mousemove',
    function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
      if(mousedown) {
        circle.drag();
      }
    })

    window.addEventListener('mousedown',
      function() {
        mousedown = true;
      })

    window.addEventListener('mouseup',
      function() {
        mousedown = false;
        circle.drag();
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
    this.y += this.dy;

    if ((this.y + this.radius) > this.bottomLine - (this.dy) - (this.ay)) {
      this.isOnGround = true;
      this.dy = 0;
      this.ay = 0;
      console.log('on ground');
      if ((this.y + this.radius) > this.bottomLine)  {
          this.y = this.bottomLine - this.radius;
      }
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

  drag() {
    if ((mouse.y + this.radius) > this.bottomLine && mousedown)  {
      this.y = this.bottomLine - this.radius;
      this.x = mouse.x;
    } else {
      this.dy = 0;
      this.ay = 0;
      this.x = mouse.x;
      this.y = mouse.y;
    }
    if (!(mousedown)) {
      this.dy = 5;
      this.ay = 1;
    }
}
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight)

  circle.update();
}


var circle = new Circle();
animate();
