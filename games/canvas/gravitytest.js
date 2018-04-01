var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 63;

var c = canvas.getContext('2d');

var keyup = true;

var mouse = {
  x: undefined,
  y: undefined
}

var bottomLine = innerHeight/1.25;

  window.addEventListener('resize',
    function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circle.recenter();
    })

  window.addEventListener('keydown',
   function(e) {
     console.log(e.keyCode);
    switch (e.keyCode) {
      case 32:
        circle.jump();
      break;

      case 37:
        circle.move('left');
             keyup = false;
      break;

      case 39:
        circle.move('right');
             keyup = false;
      break;
    }
  })

  window.addEventListener('keyup',
    function(e) {
      if(e.keyCode === 37 || e.keyCode === 39) {
              keyup = true;
        circle.move('stop');
      }
    })

  window.addEventListener('touchstart',
    function(e) {
      circle.jump();
  })

  window.addEventListener('mousemove',
    function(e) {
      mouse.x = e.x;
      mouse.y = e.y - 63;
    })


class Circle {
    constructor() {
      this._x = innerWidth/2;
      this._y = innerHeight/2;
      this._radius = 50;
      this._dy = 5;
      this._dx = 0;
      this._ax = 0;
      this._ay = 1;
      this._isOnGround = false;
}

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }

  draw() {
    c.beginPath();
    c.fillStyle = "#4c495d";
    c.fillRect(0, 0, innerWidth, innerHeight);

    c.beginPath();
    c.font = "30px verdana";
    c.textAlign = "center";
    c.fillStyle = "#ffffff";
    c.fillText('Press space, tap,', innerWidth/2, innerHeight/4);
    c.fillText('or use the arrow keys!', innerWidth/2, innerHeight/4 + 35);

    c.beginPath();
    c.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    c.fillStyle = "#ffffff";
    c.fill();

    c.beginPath();
    c.fillStyle = "#182233";
    c.fillRect(0, bottomLine, innerWidth, (innerHeight - (innerHeight - bottomLine)))
}

  update() {
    this._y += this._dy;
    this._x += this._dx;

  if ((this._y + this._radius) > bottomLine) {
    this._isOnGround = true;
    this._dy = 0;
    this._ay = 0;
    this._y = bottomLine - this._radius;
    console.log('on ground');
  } else {
      this._dy += this._ay;
  }

  if (this._dx < 20 && this._dx > -20 || keyup) {
    this._dx += this._ax;
  }


  if (this._x > innerWidth) {
    this._x = 1;
  } else if (this._x < 1) {
    this._x = innerWidth;
  }


  if (this._dx === 0) {
    this._ax = 0;
  }
    this.draw();
  }

  jump(e) {
    if(this._isOnGround) {
      this._dy = -20;
      this._ay = 1;
      this._isOnGround = false;
      console.log("we jumped!");
    }
  }

  recenter() {
    this._x = innerWidth/2;
    bottomLine = innerHeight/1.25;
    this._y = bottomLine - this._radius;
    this._ay = 1;
    this._dy = 5;
  }

  move(direction) {
    switch (direction) {
      case 'left':
        this._ax = -0.5;
      break;

      case 'right':
        this._ax = 0.5;
      break;

      case 'stop':
        this._ax *= -0.5;
      break;
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
