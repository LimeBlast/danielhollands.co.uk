/* webfont loader */
WebFontConfig = {
	custom: {
		families: ['Forque', 'OpenDyslexic', 'PT Sans'],
		urls: [ '/css/fonts.css' ]
	},
	active: function() {
		$("#header h1").slabText();
		$("#header p").slabText();
	}
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

/* media-queries pollyfill */
Modernizr.load({
	test: Modernizr.mq('only all'),
	yep: '',
	nope: '/js/vendor/respond.min.js',
	callback: function (url, result, key) {
		alert(url);
	}
});

/* lets get this show on the road */
$(document).ready(function() {

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