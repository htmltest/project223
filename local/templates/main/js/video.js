$(document).ready(function(){
	$('iframe').each(function(){
		console.log('wrap');
		$(this).wrap('<div class="video"></div>');
	});
});