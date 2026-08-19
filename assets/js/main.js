/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

})(jQuery);

(function() {

	var carousel = document.querySelector('.partner-carousel');

	if (!carousel)
		return;

	var viewport = carousel.querySelector('.partner-viewport');
	var track = carousel.querySelector('.partner-logos');
	var prev = carousel.querySelector('.partner-nav.prev');
	var next = carousel.querySelector('.partner-nav.next');
	var slides = Array.prototype.slice.call(track.children);
	var index = 0;
	var touchStartX = 0;

	function visibleCount() {
		return parseInt(getComputedStyle(carousel).getPropertyValue('--partner-visible'), 10) || 4;
	}

	function maxIndex() {
		return Math.max(0, slides.length - visibleCount());
	}

	function gapSize() {
		var styles = getComputedStyle(track);
		return parseFloat(styles.columnGap || styles.gap) || 0;
	}

	function goTo(nextIndex) {
		index = Math.max(0, Math.min(nextIndex, maxIndex()));

		var offset = 0;

		if (slides.length) {
			offset = index * (slides[0].getBoundingClientRect().width + gapSize());
		}

		track.style.transform = 'translateX(' + (-offset) + 'px)';
		prev.disabled = index <= 0;
		next.disabled = index >= maxIndex();
		carousel.classList.toggle('is-static', maxIndex() === 0);
	}

	prev.addEventListener('click', function() {
		goTo(index - 1);
	});

	next.addEventListener('click', function() {
		goTo(index + 1);
	});

	viewport.addEventListener('touchstart', function(event) {
		touchStartX = event.changedTouches[0].clientX;
	}, { passive: true });

	viewport.addEventListener('touchend', function(event) {
		var deltaX = event.changedTouches[0].clientX - touchStartX;

		if (Math.abs(deltaX) > 40)
			goTo(index + (deltaX < 0 ? 1 : -1));
	}, { passive: true });

	window.addEventListener('resize', function() {
		goTo(index);
	});

	carousel.classList.add('is-ready');
	goTo(0);

})();