/*
	Rewind by Pixelarity
	pixelarity.com @pixelarity
	License: pixelarity.com/license
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until page has loaded.
			$body.addClass('loading');

			$window.on('load', function() {
				$body.removeClass('loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'slide',
				offsetY: -10
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Slider.
			var $slider = $('#slider');
			if ($slider.length > 0) {

				$slider.slidertron({
					viewerSelector:		'.viewer',
					reelSelector:		'.viewer .reel',
					slidesSelector:		'.viewer .reel .slide',
					jumpLinksSelector:	'.jumplink',
					autoFit:			true,
					autoFitAspectRatio:	(895 / 374),
					advanceDelay:		4000,
					mode:				'fade',
					speed:				'slow',
					seamlessWrap:		false
				});

				$window
					.on('resize load', function() {
						$slider.trigger('slidertron_reFit');
					})
					.trigger('resize');

			}

	});

})(jQuery);