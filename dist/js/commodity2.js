define(['jquery'], function () {
	function body() {
		$('#magnifying').mouseenter(function(){
			$('#mark').css('display','block');
			$('#bigmagnifying').css('display','block');
		})
		
		$('#magnifying').mouseleave(function(){
			$('#mark').css('display','none');
			$('#bigmagnifying').css('display','none');
		})

		$('#magnifyingmenu li').eq(0).mouseenter(function(){
			$('#magnifying .magnifyingimg1').css('display','block')
			$('#magnifying img').not('.magnifyingimg1').css('display','none')
			$('#bigmagnifying .bigmagnifyingimg1').css('display','block')
			$('#bigmagnifying img').not('.bigmagnifyingimg1').css('display','none')
		})
		
		$('#magnifyingmenu li').eq(1).mouseenter(function(){
			$('#magnifying .magnifyingimg2').css('display','block')
			$('#magnifying img').not('.magnifyingimg2').css('display','none')
			$('#bigmagnifying .bigmagnifyingimg2').css('display','block')
			$('#bigmagnifying img').not('.bigmagnifyingimg2').css('display','none')
		})

		$('#magnifyingmenu li').eq(2).mouseenter(function(){
			$('#magnifying .magnifyingimg3').css('display','block')
			$('#magnifying img').not('.magnifyingimg3').css('display','none')
			$('#bigmagnifying .bigmagnifyingimg3').css('display','block')
			$('#bigmagnifying img').not('.bigmagnifyingimg3').css('display','none')
		})

		$('#magnifyingmenu li').eq(3).mouseenter(function(){
			$('#magnifying .magnifyingimg4').css('display','block')
			$('#magnifying img').not('.magnifyingimg4').css('display','none')
			$('#bigmagnifying .bigmagnifyingimg4').css('display','block')
			$('#bigmagnifying img').not('.bigmagnifyingimg4').css('display','none')
		})

		$('#magnifying').mousemove(function(ev){
			var l = ev.clientX - ($('#magnifying').offset().left + 100);
			l = Math.max(0,l);
			l = Math.min(l,300)
			var t = ev.pageY - ($('#magnifying').offset().top + 100);
			t = Math.max(0,t)
			t = Math.min(t,300)

			$('#mark').css({
				left:l,
				top:t
			})

			$('#bigmagnifying img').css({
				left:-2 * l,
				top:-2 * t
			})
		})
	}
	return {
		body: body
	}
})