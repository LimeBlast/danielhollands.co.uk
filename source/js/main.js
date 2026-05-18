
window.addEventListener('load', function() {
  slabText('.header-title');
  slabText('.header-copy');
});

document.addEventListener('DOMContentLoaded', function() {
  onePageNav('#navigation', {
    scrollOffset: 50,
    begin: function() {
      var dummy = document.createElement('div');
      dummy.id = 'device-dummy';
      dummy.style.height = '1px';
      document.body.appendChild(dummy);
    },
    end: function() {
      var dummy = document.getElementById('device-dummy');
      if (dummy) dummy.remove();
    },
    filter: ':not(.external)',
  });

  function toggleNav() {
    document.getElementById('shownav').classList.toggle('show');
  }

  document.getElementById('shownavbutton').addEventListener('click', toggleNav);

  document.querySelectorAll('#navigation a').forEach(function(link) {
    link.addEventListener('click', toggleNav);
  });
});
