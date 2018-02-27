var password = 'chicken'

function password () {
   if (document.getElementById('passwordForm').elements[0].value === password) {
     document.getElementById('developerTools').href = 'DeveloperTools/developer.html';
   } else {
     alert ('Wrong password');
     document.getElementById('passwordForm').reset();
   }
}

var meow = {
   tester: function test () {
    console.log('test');
  }
}
