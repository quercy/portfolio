// This file is concatenated to app.js if there was an error while trying to compile the SASS.
$(document).ready(function() {
	var error_message = "There was an error during SASS compilation! Check the gulp log.";
	$exclamationPoint = $("<div id'exclamation_point'>!</div>").css({
		'font-size' : '80px',
		'overflow' : 'hidden',
		'position': 'absolute',
	    'left': '20px',
	    'top': '10px',
	    'font-family': 'serif'
	});
	$msgBox = $("<div id='error_box'>" + error_message + "</div>").css({
		'position':'absolute',
		'width' : '250px',
		'height' : '80px',
		'top' : '20px',
		'left' : '20px',
		'border-radius' : '5px',
		'padding':'20px 15px 0px 75px',
		'color' :'white',
		'background-color' : '#AB4F57'
	}).prepend($exclamationPoint).appendTo('body');
});