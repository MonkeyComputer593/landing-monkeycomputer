document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var project = document.getElementById('project').value;
    var message = document.getElementById('message').value;

    var texto =
      'Hola,%20me%20llamo%20' +
      encodeURIComponent(name) +
      '%20(' +
      encodeURIComponent(email) +
      ')%20y%20quiero%20un%20proyecto%20de%20' +
      encodeURIComponent(project) +
      '.%20' +
      encodeURIComponent(message);

    window.open('https://wa.me/5491136000797?text=' + texto, '_blank');
  });
});
