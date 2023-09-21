/*
	Fractal by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on load.
    $window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
        window.setTimeout(function() {
          $body.addClass('is-fullload');
        }, 1000);
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500
			});

})(jQuery);

var target = document.getElementById('mce-success-response');

// create an observer instance
new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (target.innerHTML === "Thank you for subscribing!") {
      target.innerHTML = "Thanks for your support!";
    }
    if (target.innerHTML === "You're already subscribed, your profile has been updated. Thank you!") {
      target.innerHTML = "We already have your email. Thanks!";
    }
  });
}).observe(target, { attributes: true, childList: true, characterData: true });
