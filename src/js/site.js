$(document).ready(function() {
	var header = $('header');
	var header_text = $('header').find('#header_text');
	var header_reid = header_text.find('#header_reid');
	var header_savage = header_text.find('#header_savage');
	var reid_mask = header_reid.find('.mask');
	var savage_mask = header_savage.find('.mask');

	(function animate(alreadyPlayed) {
		if(!alreadyPlayed) {
			(function setup() {
				// hide the entire header
				header_reid.velocity({'opacity':0}, {'duration':0});
				header_savage.velocity({'opacity':0}, {'duration':0});

				// keep track of our heights, widths, etc
				header_savage.data('margin-top', header_savage.css('margin-top'));

				// position the text
				reid_mask.css({
				    'width': '0%'
				});
				savage_mask.css({
				    'width': '0%'
				});;
				header_reid.css({
					'margin-top' : "-40px" // to come in from the top
				});
				header_savage.css({
					'margin-top' : "40px" // to come in from the bottom
				});
			})();

			(function fade() {
				header_reid.velocity({'opacity':1, 'margin-top' : "0px"}, {'queue' : false, delay:500, duration:1000, 'easing' : 'easeOutQuint'});
				header_savage.velocity({'opacity':1, 'margin-top' : header_savage.data('margin-top')}, {'queue' : false, delay:500, duration:1000, 'easing' : 'easeOutQuint'});
			})();
	
			(function swipey_maskey() {
				var reid_mask_delay = 900;
				var reid_mask_duration = 700;
				var savage_mask_delay = reid_mask_delay + reid_mask_duration + 50;
				var savage_mask_duration = reid_mask_duration - 100;
				var values = {
					'opacity' : 1, 'width' : '100%'
				}
				reid_mask.velocity(values, {'queue' : false, delay:reid_mask_delay, duration:reid_mask_duration, easing:'easeInOutExpo'});
				savage_mask.velocity(values, {'queue' : false, delay:savage_mask_delay, duration:savage_mask_duration, easing:'easeInOutExpo'});
			})();
		}
	})(false);
	

});