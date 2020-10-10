define(['jquery'], function () {
	function body() {
		$(function () {
			var timer = null;
			var oUl = $('#topgif').find('ul')
			var iNow = 0;

			// timer = setInterval(function () {
			// 	if (iNow == 2) {
			// 		iNow = 1;
			// 		$('#topgif').find('ul').css('top', iNow * -100)
			// 	} else {
			// 		iNow++;
			// 		$('#topgif').find('ul').css('top', iNow * -100)
			// 	}
			// }, 2000)

			timer = setInterval(function(){
				iNow++;
				tab();
			},5000)

			$("#topgif").mouseenter(function(){
				clearInterval(timer);
				console.log(2);
			})

			$("#topgif").mouseleave(function(){
				timer = setInterval(function(){
					iNow++;
					tab();
				},5000)
				console.log(3);
			})

			function tab(){
				oUl.animate({
					top:iNow * -100,
				},800,
				function(){
					if(iNow == 3){
						iNow = 1;
						oUl.css('top',iNow * -100)
					}
				})
			}
		})
	}
	return {
		body: body
	}
})