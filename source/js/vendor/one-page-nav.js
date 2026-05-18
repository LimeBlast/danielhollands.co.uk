/*! one-page-nav vanilla JS - based on jQuery One Page Nav Plugin v3.0.0 MIT @davist11 */
(function() {
  function onePageNav(navEl, options) {
    const config = Object.assign({
      navItems: 'a',
      currentClass: 'current',
      changeHash: false,
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      scrollOffset: 0,
      filter: '',
      begin: false,
      end: false,
      scrollChange: false
    }, options);

    const nav = typeof navEl === 'string' ? document.querySelector(navEl) : navEl;
    if (!nav) return;

    let navLinks = Array.from(nav.querySelectorAll(config.navItems));
    if (config.filter) {
      navLinks = navLinks.filter(function(link) { return link.matches(config.filter); });
    }

    const sections = {};
    let didScroll = false;
    let docHeight = document.documentElement.scrollHeight;
    let intervalId = null;

    function getHash(link) {
      return link.getAttribute('href').split('#')[1];
    }

    function getPositions() {
      navLinks.forEach(function(link) {
        const hash = getHash(link);
        const target = document.getElementById(hash);
        if (target) {
          sections[hash] = Math.round(target.getBoundingClientRect().top + window.scrollY);
        }
      });
    }

    function adjustNav(parentLi) {
      nav.querySelectorAll('.' + config.currentClass)
        .forEach(function(el) { el.classList.remove(config.currentClass); });
      parentLi.classList.add(config.currentClass);
    }

    function getSection(windowPos) {
      const threshold = Math.round(window.innerHeight * config.scrollThreshold);
      let result = null;
      for (const id in sections) {
        if ((sections[id] - threshold) < windowPos) result = id;
      }
      return result;
    }

    function scrollTo(targetId, callback) {
      const target = document.getElementById(targetId);
      if (!target) return;

      const targetPos = Math.round(target.getBoundingClientRect().top + window.scrollY) - config.scrollOffset;
      const startPos = window.scrollY;
      const distance = targetPos - startPos;
      const duration = config.scrollSpeed;
      let startTime = null;

      function ease(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startPos + distance * ease(progress));
        if (elapsed < duration) {
          requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      }

      requestAnimationFrame(step);
    }

    function onScroll() {
      didScroll = true;
    }

    function scrollChange() {
      const windowTop = window.scrollY;
      const position = getSection(windowTop);
      if (position === null) return;

      const link = nav.querySelector('a[href$="#' + position + '"]');
      if (!link) return;

      const parent = link.parentElement;
      if (!parent.classList.contains(config.currentClass)) {
        adjustNav(parent);
        if (config.scrollChange) config.scrollChange(parent);
      }
    }

    function bindInterval() {
      window.addEventListener('scroll', onScroll);
      intervalId = setInterval(function() {
        const newDocHeight = document.documentElement.scrollHeight;
        if (didScroll) {
          didScroll = false;
          scrollChange();
        }
        if (newDocHeight !== docHeight) {
          docHeight = newDocHeight;
          getPositions();
        }
      }, 250);
    }

    function unbindInterval() {
      clearInterval(intervalId);
      window.removeEventListener('scroll', onScroll);
    }

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const parent = link.parentElement;
        const hash = getHash(link);

        if (!parent.classList.contains(config.currentClass)) {
          if (config.begin) config.begin();
          adjustNav(parent);
          unbindInterval();
          scrollTo(hash, function() {
            if (config.changeHash) window.location.hash = '#' + hash;
            bindInterval();
            if (config.end) config.end();
          });
        }

        e.preventDefault();
      });
    });

    getPositions();
    bindInterval();
    window.addEventListener('resize', getPositions);
  }

  window.onePageNav = onePageNav;
})();
