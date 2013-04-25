// http://stackoverflow.com/a/8414666/1049688 (only use for after-font effects)
jQuery(window).bind("load", function() {
	// slab text
	jQuery('.header-title').slabText();
	jQuery('.header-copy').slabText();
});


$(document).ready(function() {

	// one page nav
	$('#navigation').onePageNav();

});