var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove',
    function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
})

window.addEventListener('resize',
  function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

var colorArray = [
  '#ea2e2e',
  '#b4cef7',
  '#f2eb65',
  '#f986f6',
  '#b4c4c4',
  '#ffc730',
  ]

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;
    this.maxRadius = Math.floor(Math.random() * 40 + 10);
    this.color = Math.floor(Math.random() * 6 + 1);
   // this.red = Math.floor(Math.random() * 255);
   // this.green = Math.floor(Math.random() * 255);
   // this.blue = Math.floor(Math.random() * 255);
  }

  draw() {
    c.fillStyle = "rgb(117, 115, 110)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = colorArray[this.color];
    //c.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 1)`;
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx; //x velocity
    this.y += this.dy; //y velocity

    //interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50
    ) {
      if (this.radius < this.maxRadius) {
      this.radius += 3;
      }
    } else if (this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];

for (var i = 0; i < 800; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
  var y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
  var dy = (Math.random() - 0.5) * 2;
  var dx = (Math.random() - 0.5) * 2;


  circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

   for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
}
animate();
