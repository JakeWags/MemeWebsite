class PasswordInput {
  constructor() {
    this.password = 'chicken'
    this.canvasLink = document.getElementById('canvas');

  }
  passwordPrompt() {
    if(prompt('Password:') === this.password) {
      this.canvasLink.innerHTML = 'canvas';
      this.canvasLink.href = 'DeveloperTools/canvas.html';
    } else {
      alert('Access Denied');
    }
}
}
var a = new PasswordInput();
