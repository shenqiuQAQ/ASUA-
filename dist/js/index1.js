//轮播图
define(['jquery'], function ($) {
	function body() {
		$(function () {
			var aBtns = $('#banner').find('ol li');
			var oUl = $('#banner').find('ul');
			var leftAndRights = $('#leftandright').find('button');
			var iNow = 1;
			var timer = null;

			tab();

			aBtns.click(function () {
				iNow = $(this).index();
				tab();
			})

			$('#banner').mouseenter(function () {
				clearInterval(timer);
			})

			$('#banner').mouseleave(function () {
				timer = setInterval(function () {
					iNow++;
					tab();
				}, 5000);
			});

			timer = setInterval(function () {
				iNow++;
				tab();
			}, 5000);

			function tab() {
				aBtns.removeClass('active').eq(iNow).addClass('active');

				if (iNow == aBtns.size()) {
					aBtns.eq(0).addClass('active');
				}

				oUl.animate({
					left: iNow * -1530,
				},
					300,
					function () {
						if (iNow === aBtns.size() + 1) {
							iNow = 1;
							oUl.css('left', -1530);
						} else if (iNow == 0) {
							iNow = aBtns.size();
							oUl.css('left', iNow * -1530)
						}
					}
				)
			}

			leftAndRights[0].onclick = throttle(function () {
				iNow--;
				tab();
			},1000)

			leftAndRights[1].onclick = throttle(function () {
				iNow++;
				tab();
			}, 1000)

			function throttle(func, wait){
				let prevDate = 0;
				let curDate = Date.now();
				return function(){
					const context = this;
					const args = arguments;
					curDate = Date.now();
					if(curDate - prevDate >= wait){
						func.apply(context, args);
						prevDate = curDate;
					}
				}
			}


		});
	}
	return {
		body: body
	}
})