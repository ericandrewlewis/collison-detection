// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// MIT license
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
		                           || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

document.addEventListener('DOMContentLoaded', function(event) {
	var svg = document.querySelector('svg');
	var rect = document.querySelector('rect');
	var keyState = {
		up: false,
		right: false,
		down: false,
		left: false
	};

	document.onkeydown = function (event) {
		var keyCode = event.keyCode;
		switch( keyCode ) {
			case 37:
				keyState.left = true;
				break;
			case 38:
				keyState.up = true;
				break;
			case 39:
				keyState.right = true;
				break;
			case 40:
				keyState.down = true;
				break;
		}
	};

	document.onkeyup = function (event) {
		var keyCode = event.keyCode;
		switch( keyCode ) {
			case 37:
				keyState.left = false;
				break;
			case 38:
				keyState.up = false;
				break;
			case 39:
				keyState.right = false;
				break;
			case 40:
				keyState.down = false;
				break;
		}
	};

	function draw(time) {
		if ( keyState.right ) {
			var currentX = parseInt( document.querySelector('rect').getAttribute( 'x' ) );
			document.querySelector('rect').setAttribute( 'x', currentX + 5 );
		}
		if ( keyState.left ) {
			var currentX = parseInt( document.querySelector('rect').getAttribute( 'x' ) );
			document.querySelector('rect').setAttribute( 'x', currentX - 5 );
		}
		if ( keyState.down ) {
			var currentY = parseInt( document.querySelector('rect').getAttribute( 'y' ) );
			document.querySelector('rect').setAttribute( 'y', currentY + 5 );
		}
		if ( keyState.up ) {
			var currentY = parseInt( document.querySelector('rect').getAttribute( 'y' ) );
			document.querySelector('rect').setAttribute( 'y', currentY - 5 );
		}
	}
	animate();

	function animate() {
		requestAnimationFrame( animate );
		draw();
	}
});