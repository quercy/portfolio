// This file is concatenated to app.js if there was an error while trying to compile the SASS.
$(document).ready(function() {
	var error_message = "There was an error during SASS compilation! Check the gulp log.";
	$msgBox = $("<div id='error_box'>" + error_message + "</div>").css({
		'position':'absolute',
		'width' : '200px',
		'height' : '100px',
		'top' : '20px',
		'left' : '20px'
	}).appendTo('body');
});