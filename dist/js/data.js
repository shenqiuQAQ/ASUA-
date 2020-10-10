define(['jquery'], function ($) {
	function body() {
		$.ajax({
			type:'get',
			url:"data/data.json",
			success:function(arr){
				var str = ``;
				for(var i = 0;i < arr.length;i++){
					str +=`<li>
					<a id="${arr[i].id}" target="_blank" href="commodity.html?goodsId=${arr[i].id}">
						<img src="${arr[i].img}" alt="">
						<p>${arr[i].name}</p>
						<p>${arr[i].explain}</p>
						<p>¥${arr[i].price}</p>
						<p>¥${arr[i].oldprice}</p>
					</a>
				</li>`;
					$('#mainhotsale ul').html(str);
				}

			},
			error:function(msg){
				console.log(msg);
			}
		})


	}
	return {
		body: body
	}
})