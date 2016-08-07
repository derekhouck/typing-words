jQuery( document ).ready(function( $) {
	//Variables
	var words = [];

	// Choosing colors
	function randomColor() {
        var color;
        color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }

	function invertCssColor(color) {
        var rgb = invertColor(hexColor2rgb(color));
        return rgb2hexColor(rgb);
    }
    
    function invertColor(rgb) {
        var yuv = rgb2yuv(rgb);
        var factor = 90;
        var threshold = 100;
        yuv.y = clamp(yuv.y + (yuv.y > threshold ? -factor : factor));
        return yuv2rgb(yuv);
    }
    
    function rgb2hexColor(rgb) {
        return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
    }
    
    function hexColor2rgb(color) {
        color = color.substring(1); // remove #
        return {
            r: parseInt(color.substring(0, 2), 16),
            g: parseInt(color.substring(2, 4), 16),
            b: parseInt(color.substring(4, 6), 16)
        };
    }
    
    function rgb2hexColor(rgb) {
        return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
    }
    
    function dec2hex(n) {
        var hex = n.toString(16);
        if (hex.length < 2) {
            return '0' + hex;
        }
        return hex;
    }

	function rgb2yuv(rgb){
	  var y = clamp(rgb.r *  0.29900 + rgb.g *  0.587   + rgb.b * 0.114);
	  var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
	  var v = clamp(rgb.r *  0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
	  return {y:y, u:u, v:v};
	}

	function yuv2rgb(yuv){
	  var y = yuv.y;
	  var u = yuv.u;
	  var v = yuv.v;
	  var r = clamp(y + (v - 128) *  1.40200);
	  var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
	  var b = clamp(y + (u - 128) *  1.77200);
	  return {r:r,g:g,b:b};
	}
		
	function clamp(n){
		if (n<0) { return 0;}
		if (n>255) { return 255;}
		return Math.floor(n);
	}
	
	//Selecting a word
	function selectWord(){
		var c1 = randomColor();
		var c2 = invertCssColor(c1);
		$('.wordContainer__word').fadeOut(function(){
			$(this).text(words[Math.floor(Math.random()*words.length)]).fadeIn();
			$('.wordContainer').bigtext();
		});
		$('body').css({
				"color": c2,
				"background-color": c1});
	}
	
	// Get words
	$.getJSON("js/words.json", function() {
		console.log( "success" );
	})
		.done(function(object) {
			$.each(object.words, function(word) {
				words.push(object.words[word]);
			});
			console.log(words);
			selectWord();
			setInterval(function(){
				selectWord()
			}, 5000);
		});
});
