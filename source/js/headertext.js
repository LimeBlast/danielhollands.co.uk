(function() {
  function headerText(selector, options) {
    const settings = Object.assign({
      fontRatio: 0.78,
      forceNewCharCount: true,
      wrapAmpersand: true,
      headerBreakpoint: null,
      viewportBreakpoint: null,
      noResizeEvent: false,
      resizeThrottleTime: 300,
      maxFontSize: 999,
      postTweak: true,
      precision: 3,
      minCharsPerLine: 0
    }, options);

    document.body.classList.add('headertexted');

    const els = typeof selector === 'string'
      ? Array.from(document.querySelectorAll(selector))
      : (selector.length !== undefined ? Array.from(selector) : [selector]);

    els.forEach(function(el) {
      const keepSpans = el.querySelectorAll('span.headertext').length > 0;
      const words = keepSpans
        ? []
        : el.textContent.trim().replace(/\s{2,}/g, ' ').split(' ');

      if (!keepSpans && settings.minCharsPerLine && words.join(' ').length < settings.minCharsPerLine) {
        return;
      }

      const firstLink = el.querySelector('a');
      const headLink = firstLink ? firstLink.getAttribute('href') : el.getAttribute('href');
      const linkTitle = (headLink && firstLink) ? (firstLink.getAttribute('title') || '') : '';

      let origFontSize = null;
      let idealCharPerLine = null;
      let viewportWidth = window.innerWidth;

      function grabPixelFontSize() {
        const dummy = document.createElement('div');
        dummy.style.cssText = 'position:absolute;visibility:hidden;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;';
        dummy.innerHTML = '&nbsp;';
        el.appendChild(dummy);
        const emH = dummy.offsetHeight;
        el.removeChild(dummy);
        return emH;
      }

      function escapeHtml(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
      }

      function resizeSlabs() {
        const parentWidth = el.offsetWidth;
        if (parentWidth === 0) return;

        el.classList.remove('headertextdone', 'headertextinactive');

        if (
          (settings.viewportBreakpoint && settings.viewportBreakpoint > viewportWidth) ||
          (settings.headerBreakpoint && settings.headerBreakpoint > parentWidth)
        ) {
          el.classList.add('headertextinactive');
          return;
        }

        const fs = grabPixelFontSize();

        if (!keepSpans && (settings.forceNewCharCount || fs !== origFontSize)) {
          origFontSize = fs;

          const newCharPerLine = Math.min(60, Math.floor(parentWidth / (origFontSize * settings.fontRatio)));

          if (newCharPerLine !== idealCharPerLine) {
            idealCharPerLine = newCharPerLine;

            let wordIndex = 0;
            const lineText = [];

            while (wordIndex < words.length) {
              let preText = '';
              let postText = '';

              while (postText.length < idealCharPerLine) {
                preText = postText;
                postText += words[wordIndex] + ' ';
                if (++wordIndex >= words.length) break;
              }

              if (settings.minCharsPerLine) {
                const slice = words.slice(wordIndex).join(' ');
                if (slice.length < settings.minCharsPerLine) {
                  postText += slice;
                  preText = postText;
                  wordIndex = words.length + 2;
                }
              }

              const preDiff = idealCharPerLine - preText.length;
              const postDiff = postText.length - idealCharPerLine;

              let finalText;
              if ((preDiff < postDiff) && (preText.length >= (settings.minCharsPerLine || 2))) {
                finalText = preText;
                wordIndex--;
              } else {
                finalText = postText;
              }

              finalText = escapeHtml(finalText);

              if (settings.wrapAmpersand) {
                finalText = finalText.replace(/&amp;/g, '<span class="amp">&amp;</span>');
              }

              finalText = finalText.trim();
              lineText.push('<span class="headertext">' + finalText + '</span>');
            }

            el.innerHTML = lineText.join(' ');

            if (headLink) {
              const inner = el.innerHTML;
              el.innerHTML = '<a href="' + headLink + '"' +
                (linkTitle ? ' title="' + linkTitle + '"' : '') +
                '>' + inner + '</a>';
            }
          }
        } else {
          origFontSize = fs;
        }

        el.querySelectorAll('span.headertext').forEach(function(span) {
          const innerText = span.textContent;
          const wordSpacing = innerText.split(' ').length > 1;

          if (settings.postTweak) {
            span.style.wordSpacing = '0';
            span.style.letterSpacing = '0';
          }

          const ratio = parentWidth / span.offsetWidth;
          const fontSize = parseFloat(span.style.fontSize) || origFontSize;

          span.style.fontSize = Math.min(
            parseFloat((fontSize * ratio).toFixed(settings.precision)),
            settings.maxFontSize
          ) + 'px';

          const diff = settings.postTweak ? parentWidth - span.offsetWidth : false;

          if (diff) {
            const prop = wordSpacing ? 'wordSpacing' : 'letterSpacing';
            const divisor = wordSpacing ? innerText.split(' ').length - 1 : innerText.length;
            span.style[prop] = parseFloat((diff / divisor).toFixed(settings.precision)) + 'px';
          }
        });

        el.classList.add('headertextdone');
      }

      resizeSlabs();

      if (!settings.noResizeEvent) {
        let resizeThrottle = null;
        window.addEventListener('resize', function() {
          if (window.innerWidth === viewportWidth) return;
          viewportWidth = window.innerWidth;
          clearTimeout(resizeThrottle);
          resizeThrottle = setTimeout(resizeSlabs, settings.resizeThrottleTime);
        });
      }
    });
  }

  window.headerText = headerText;
})();
