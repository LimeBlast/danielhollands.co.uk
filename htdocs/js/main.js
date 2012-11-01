$(document).ready(function() {
	/* slab text */
	$(".intro p").slabText();

	/* one page nav */
	$('#navigation').onePageNav({
		scrollSpeed: 2000,
		begin: function() {
			//Hack so you can click other menu items after the initial click
			$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		},
		end: function() {
			$('#device-dummy').remove();
		}
	});

});