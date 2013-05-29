// http://stackoverflow.com/a/8414666/1049688 (only use for after-font effects)
jQuery(window).bind("load", function () {
	// slab text
	jQuery('.header-title').slabText();
	jQuery('.header-copy').slabText();
});


$(document).ready(function () {

	// one page nav
	$('#navigation').onePageNav({
		scrollOffset: 50,
		begin: function () {
			//Hack so you can click other menu items after the initial click
			$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		},
		end: function () {
			$('#device-dummy').remove();
		}
	});

	// show navigation
	$('#shownavbutton').on('click', function () {
		toggleNav();
	});

	// hide navigation when a link is clicked on
	$('#navigation a').on('click', function () {
		toggleNav();
	});

	// set-up slide toggle function
	function toggleNav() {
		$("#shownav").toggleClass("show");
	}

});