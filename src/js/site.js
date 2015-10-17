$(document).ready(function() {
	
	var header = $('header');
	var header_text = $('header').find('#header_text');
	var header_reid = header_text.find('#header_reid');
	var header_savage = header_text.find('#header_savage');
	var reid_mask = header_reid.find('.mask');
	var savage_mask = header_savage.find('.mask');
	var swipey_maskey_toggle = false;

	var swipey_maskey = function swipey_maskey(delay, duration) {

		var in_out = (swipey_maskey_toggle == true ? 'out' : 'in');
		swipey_maskey_toggle = !swipey_maskey_toggle;
		var reid_mask_delay;
		var reid_mask_duration;
		var savage_mask_duration;
		var savage_mask_delay;

		if(in_out === 'in') {
			reid_mask_delay = (delay || 0);
			reid_mask_duration = (duration || 400);
			savage_mask_delay = reid_mask_delay + reid_mask_duration + 50;
			savage_mask_duration = reid_mask_duration + reid_mask_delay;
		} else {
			savage_mask_delay = 0;
			savage_mask_duration = (duration || 400);
			reid_mask_delay = savage_mask_duration + savage_mask_delay + 50;
			reid_mask_duration = savage_mask_duration - 50;
		}

		if(in_out === 'in') {
			reid_mask.velocity({'width' : '100%'}, {queue:false,delay:reid_mask_delay, duration:reid_mask_duration, easing:'easeInCirc'});
			savage_mask.velocity({'width' : '100%'}, {queue:false,delay:savage_mask_delay, duration:savage_mask_duration, easing:'easeOutCirc'});
		} else if(in_out === 'out') {
			savage_mask.velocity({'width' : '0%'}, {queue:false,delay:savage_mask_delay, duration:savage_mask_duration, easing:'easeInCubic'});
			reid_mask.velocity({'width' : '0%'}, {queue:false,delay:reid_mask_delay, duration:reid_mask_duration, easing:'easeOutCubic'});
		} else {
			throw new Error();
		}
	};

	// setTimeout(function() {
	// 	header_text.hover(function() {
	// 		if(!reid_mask.hasClass('velocity-animating') && !savage_mask.hasClass('velocity-animating')) {
	// 			swipey_maskey(0, 100);
	// 		}
	// 	}, function() {
	// 		if(!reid_mask.hasClass('velocity-animating') && !savage_mask.hasClass('velocity-animating')) {
	// 			swipey_maskey(0, 100);
	// 		}
	// 	});
	// }, 1000);
	
	(function animate(alreadyPlayed) {
		if(!alreadyPlayed) {
			(function setup() {
				// hide the entire header
				header_reid.velocity({'opacity':0}, {'duration':0});
				header_savage.velocity({'opacity':0}, {'duration':0});

				// keep track of our heights, widths, etc
				header_savage.data('margin-top', header_savage.css('margin-top'));

				// position the text and 
				reid_mask.css({
				    'width': '0%'
				});
				savage_mask.css({
				    'width': '0%'
				});;
				header_reid.css({
					'margin-top' : "-30px" // to come in from the top
				});
				header_savage.css({
					'margin-top' : "30px" // to come in from the bottom
				});
			})();

			(function fade() {
				header_reid.velocity({'opacity':1, 'margin-top' : "0px"}, {'queue' : false, delay:500, duration:500, 'easing' : 'easeOutCubic'});
				header_savage.velocity({'opacity':1, 'margin-top' : header_savage.data('margin-top')}, {'queue' : false, delay:500, duration:500, 'easing' : 'easeOutCubic'});
			})();
	
			swipey_maskey(750);
		}
	})(false);
});