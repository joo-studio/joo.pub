/*
	Expanse by Pixelarity
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
				offsetY: -18,
				offsetX: -1,
				mode: 'fade',
				noOpenerFade: true
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
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

		// Portfolio.
			var $portfolio = $('#portfolio');
			if ($portfolio.length > 0)
			{
				// Tabs
					$portfolio.rotatorrr({
						titlesSelector: '.titles li',
						slidesSelector: '.slides li'
					});

				// Thumbnails
					var poptroxSettings;

					if (skel.breakpoint('mobile').active)
						poptroxSettings = {
							overlayClass: 'poptrox-overlay skel-layers-fixed',
							usePopupDefaultStyling: false,
							usePopupCaption: false,
							usePopupCloser: false,
							usePopupEasyClose: true,
							usePopupNav: false,
							useBodyOverflow: false,
							windowMargin: 10,
							overlayOpacity: 0.85,
							popupWidth: 0,
							popupHeight: 0
						};
					else
						poptroxSettings = {
							overlayClass: 'poptrox-overlay skel-layers-fixed',
							usePopupDefaultStyling: false,
							usePopupCaption: true,
							usePopupCloser: true,
							usePopupEasyClose: false,
							usePopupNav: true,
							popupCloserText: ''
						};

					$portfolio.find('.slides li').poptrox(poptroxSettings);

			}

	});

})(jQuery);