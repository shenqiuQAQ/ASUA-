define(['jquery',"jquery-cookie"], function ($) {
	function body() {
		$(function () {
			sc_num();
			$.ajax({
				type: 'get',
				url: "data/data.json",
				success: function (arr) {
					function getUrlParam(name) {
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
						var r = window.location.search.substr(1).match(reg); //匹配目标参数
						if (r != null) return unescape(r[2]);
						return null; //返回参数值
					}
					//接收URL中的参数goodsId
					var id = getUrlParam('goodsId');

					for (var i = 0; i < arr.length; i++) {
						if (id == arr[i].id) {
							var str = `￥${arr[i].price}`;
							var str1 = `<button id="${arr[i].id}" class="addshopping">加入购物车</button>`;
							$('#commodityrightcenter div span').eq(1).html(str);
							$('#commodityrightbottom4').html(str1)
						}
					}
				},
				error: function (msg) {
					console.log(msg);
				}
			})

			$('#commodityrightbottom4').on('click','.addshopping',function(){
				var id = this.id;

				var first = !($.cookie('goods'));
				if(first){
					$.cookie('goods',JSON.stringify([{id:id,num:1}]),{
						expires:7
					});
				}else{
					var cookieArr = JSON.parse($.cookie('goods'));
					var same = false;
					for(var i = 0;i < cookieArr.length;i++){
						if(cookieArr[i].id == id){
						same = true;
						break;
						}
					}
					same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1});

					$.cookie('goods',JSON.stringify(cookieArr),{
						expires:7
					})
					sc_num();
				}
			})

			function sc_num(){
        var cookieStr = $.cookie("goods");
				var sum = 0;
				var str = ``;
        if(cookieStr){
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0; i < cookieArr.length; i++){
						sum += cookieArr[i].num;
						str = `购物车（${sum}）`;
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