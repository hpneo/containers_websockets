var slides = document.querySelectorAll('.slide'),
    slidesProgress = document.querySelector('.slide-progress'),
    currentIndex = location.hash ? Number(location.hash.replace('#', '')) : 0;

function buildSnippet(snippet) {
  snippet.classList.add('cm-s-neo');

  CodeMirror.runMode(snippet.textContent, snippet.lang, snippet);
}

function buildEvents() {
  window.addEventListener('keyup', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    var index = location.hash ? Number(location.hash.replace('#', '')) : 0;

    if (event.keyCode === 39) {
      index++;
    }
    else if (event.keyCode === 37) {
      index--;
    }

    if (index < 0) {
      index = 0;
    }
    else if (index > (slides.length - 1)) {
      index = slides.length - 1;
    }

    goToSlide(index);
  });

  window.addEventListener('popstate', function(event) {
    var index = location.hash ? Number(location.hash.replace('#', '')) : 0;

    goToSlide(index);
  });
}

function goToSlide(index) {
  if (!slides[index]) {
    return;
  }

  Array.prototype.forEach.call(slides, function(slide) {
    slide.classList.remove('active');
  });


  if (!slides[index].dataset.rendered) {
    Array.prototype.forEach.call(slides[index].querySelectorAll('pre[lang]'), buildSnippet);
  }

  if (index === slides.length - 1 && document.querySelector('#codebite-demo')) {
    var bite = new CodeBite({
      type: 'devpad-nodejs',
      element: document.querySelector('#codebite-demo')
    });

    setTimeout(function() {
      bite.editor.refresh();
    }, 0);
  }

  slides[index].classList.add('active');
  slides[index].dataset.rendered = true;

  currentIndex = index;
  slidesProgress.value = index;
  location.hash = '#' + currentIndex;
}

function startSlides() {
  var index = location.hash ? Number(location.hash.replace('#', '')) : 0;

  slidesProgress.max = slides.length - 1;
  slidesProgress.value = index;

  buildEvents();

  goToSlide(index);
}