/* media-queries pollyfill */
Modernizr.load({
	test: Modernizr.mq(),
	yep : '',
	nope: '/js/vendor/respond.min.js'
});

/* lets get this show on the road */
$(document).ready(function() {

	/* slab text */
	setTimeout(function(){
		$("#header h1").slabText();
		$("#header p").slabText();
	}, 1000);

	/* one page nav */
	$('#navigation').onePageNav({
		scrollSpeed: 2000,
		changeHash: true,
		begin: function() {
			//Hack so you can click other menu items after the initial click
			$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		},
		end: function() {
			$('#device-dummy').remove();
		}
	});

});