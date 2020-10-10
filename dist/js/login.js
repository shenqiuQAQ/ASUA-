define(['jquery','jquery-cookie'], function ($) {
  function body(){
    $(function(){
      $('button').click(function(){
        $.ajax({
          type:'post',
          url:'php/login.php',
          dataType:'json',
          data:{
            username:$('#login input').eq(0).val(),
            password:$('#login input').eq(1).val(),
          },
          success:function(msg){
            console.log(msg)
            var obj = msg; //JSON.parse (<anonymous>) 返回的字符串不是json格式。
            if(obj.code){
              $('#response').css('color','red');
              $('#response').css('display','block');
            $('#response').html(obj.msg);
            }else{
              $('#response').css('color','green');
              $('#response').css('display','block');
            $('#response').html(obj.msg);
            }
            
          },
          error:function(msg){
            console.log(msg)
          }
        })
      })
    })
  }
  return {
    body:body
  }
})