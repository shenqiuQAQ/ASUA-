//左侧浮动导航栏
define(['jquery','jquery-cookie'], function () {
	function body() {
		$(function () {
			sc_num();

			$(document).scroll(function () {
				if ($(document).scrollTop() >= 750) {
					$('#floatmenu').css('display', 'block')
				} else if ($(document).scrollTop() < 750) {
					$('#floatmenu').css('display', 'none')
				}
			})

			$('#floatmenu .floatmenuli a').eq(0).mouseenter(function(){
				$('#floatmenu .floatmenuli div').eq(0).css({
					display:'block',
					animation:'move 1s',
					opacity:1
				})
			})
			$('#floatmenu .floatmenuli a').eq(0).mouseleave(function(){
				$('#floatmenu .floatmenuli div').eq(0).css({
					animation:'move1 1s',
					opacity:0
				})
			})

			function sc_num(){
        var cookieStr = $.cookie("goods");
				var sum = 0;
				var str = ``;
        if(cookieStr){
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0; i < cookieArr.length; i++){
						sum += cookieArr[i].num;
						str = `购物车（${sum}）`
          }
				}
				$('#topmenu #topmenushoppingnum').html(str);
      }
		})
	}
	return {
		body: body
	}
})