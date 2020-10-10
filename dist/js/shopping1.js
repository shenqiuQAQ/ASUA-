define(['jquery', 'jquery-cookie'], function () {
  function body() {
    $(function () {
      sc_msg();
      sc_num();
      //顶部轮播图
      var timer = null;
      var oUl = $('#topgif').find('ul')
      var iNow = 0;

      timer = setInterval(function () {
        iNow++;
        tab();
      }, 5000)

      $("#topgif").mouseenter(function () {
        clearInterval(timer);
        console.log(2);
      })

      $("#topgif").mouseleave(function () {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 5000)
        console.log(3);
      })

      function tab() {
        oUl.animate({
          top: iNow * -100,
        }, 800,
          function () {
            if (iNow == 3) {
              iNow = 1;
              oUl.css('top', iNow * -100)
            }
          })
      }

      //空购物车
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);
      if (!cookieArr) {
        $('#shopping dl').css('display', 'none')
        $("#nullshopping").css('display', 'block')
      }


      function sc_num() {
        var cookieStr = $.cookie("goods");
        var sum = 0;
        var str = ``;
        if (cookieStr) {
          var cookieArr = JSON.parse(cookieStr);
          for (var i = 0; i < cookieArr.length; i++) {
            sum += cookieArr[i].num;
            str = `购物车（${sum}）`
          }
        }
        $('#topmenu #topmenushoppingnum').html(str);
        $('#shoppingp p span').eq(0).html(sum);
      }

      function sc_msg() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
          return;
        }
        $.ajax({
          url: "data/data.json",
          success: function (arr) {
            var cookieArr = JSON.parse(cookieStr);
            //精益求精  写算法
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < cookieArr.length; j++) {
                if (cookieArr[j].id == arr[i].id) {
                  arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }
            //通过newArr。处理数据，将数据添加页面上
            var str = ``;
            var sum = 0;
            for (var i = 0; i < newArr.length; i++) {
              sum += (newArr[i].price * newArr[i].num);
              let sum1 = (newArr[i].price * newArr[i].num);

              str += `<dd id="${newArr[i].id}">
              <div class="shoppingddtop">
                <div>
                  <img src="images/screencapture-www-asus-com-cn-store-cart-index-html-1601345561616_03.png" alt="">
                </div>
                <a href=""><img src="${newArr[i].img}" alt=""></a>
                <span>
                  <a href="">${newArr[i].name}${newArr[i].explain}</a>
                </span>
                <span>￥${newArr[i].price}</span>
                <span class="numbuttonspan">
                  <button id="${newArr[i].id}" class="numbutton">-</button>
                  <span>${newArr[i].num}</span>
                  <button id="${newArr[i].id}" class="numbutton">+</button>
                </span>
                <span>￥0</span>
                <span>${sum1}</span>
                <span>${sum1}</span>
                <button class="shoppingdddelete" hid="${newArr[i].id}">×</button>
              </div>
              <div class="shoppingddbottom">
                <p>[赠品]新机专属8项服务(仅限购机三个月内使用1次，需提前1天预约到店服务) ￥99 x ${newArr[i].num}</p>
                <p>[赠品]【意外保】第一年不限次(赠送专用，不单独出售) ￥199 x ${newArr[i].num}</p>
              </div>
            </dd>`;
            }
            $('#shopping dl #shoppinghtml').html(str)

          },
          error: function (msg) {
            console.log(msg);
          }
        })
      }

      var cursum = 0;
      var curnum = 0;

      //单选
      $("#shoppinghtml").on('click', 'dd .shoppingddtop div', function () {
        var id = $(this).parents('dd').attr('id')
        var cookieStr = $.cookie('goods')
        var newArr = [];
        var that = this
        $.ajax({
          type: 'get',
          url: 'data/data.json',
          success: function (arr) {
            var cookieArr = JSON.parse(cookieStr);
            //精益求精  写算法
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < cookieArr.length; j++) {
                if (cookieArr[j].id == arr[i].id) {
                  arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }
            if (!$(that).attr('class')) {
              $(that).find('img').css('display', 'block')
              $(that).addClass('target')
              for (var i = 0; i < newArr.length; i++) {
                if (id == newArr[i].id) {
                  cursum += newArr[i].num * newArr[i].price;
                  curnum += newArr[i].num
                }
              }
              $('#choosenum').html(curnum)
              $('#shoppingprice').html(`￥${cursum}`)
            } else {
              $(that).find('img').css('display', 'none')
              $(that).removeClass();
              for (var i = 0; i < newArr.length; i++) {
                if (id == newArr[i].id) {
                  cursum -= newArr[i].num * newArr[i].price;
                  curnum -= newArr[i].num
                }
              }
              $('#choosenum').html(curnum)
              $('#shoppingprice').html(`￥${cursum}`)
            }

            var arr1 = $('#shoppinghtml dd .shoppingddtop div');
            for (i = 0; i < arr1.length; i++) {
              if (arr1[i].className != 'target') {
                $('#shopping dl dt div').removeClass();
                $('#shopping dl dt div').find('img').css('display', 'none');
                break;
              } else {
                $('#shopping dl dt div').addClass('target');
                $('#shopping dl dt div').find('img').css('display', 'block');
              }
            }
          },
          error: function (msg) {
            console.log(msg)
          }
        })


      })

      //多选
      $('#shopping dl dt').on('click', 'div', function () {
        var id = $(this).parents('dd').attr('id')
        var cookieStr = $.cookie('goods')
        var newArr = [];
        var that = this
        $.ajax({
          type: 'get',
          url: 'data/data.json',
          success: function (arr) {
            var cookieArr = JSON.parse(cookieStr);
            //精益求精  写算法
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < cookieArr.length; j++) {
                if (cookieArr[j].id == arr[i].id) {
                  arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }

            if (!$(that).attr('class')) {
              $(that).addClass('target');
              $(that).find('img').css('display', 'block');
              $('dd .shoppingddtop div').addClass('target');
              $('dd .shoppingddtop div img').css('display', 'block');
              var sum2 = 0;
              var num2 = 0;
              for (var i = 0; i < newArr.length; i++) {
                sum2 += newArr[i].num * newArr[i].price;
                num2 += newArr[i].num
                $('#choosenum').html(num2)
                $('#shoppingprice').html(`￥${sum2}`)
              }
            } else {
              $(that).removeClass();
              $(that).find('img').css('display', 'none');
              $('dd .shoppingddtop div').removeClass();
              $('dd .shoppingddtop div img').css('display', 'none');
              cursum = 0;
              curnum = 0;
              $('#choosenum').html(curnum)
              $('#shoppingprice').html(`￥${cursum}`)
            }
          },
          error: function (msg) {
            console.log(msg)
          }
        })

      })

      //加减按钮添加点击
      $('#shoppinghtml').on('click', '.numbutton', function () {
        var id = $(this).attr('id');
        var cookieArr = JSON.parse($.cookie("goods"));
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            break;
          }
        }
        if (this.innerHTML == "+") {
          cookieArr[i].num++;
        } else {
          cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
        }
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })
        $(this).siblings('span').html(cookieArr[i].num);
        sc_num();
        sc_msg();
      })

      //删除按钮添加点击
      $("#shoppinghtml").on("click", ".shoppingdddelete", function () {
        var id = $(this).parents('dd').remove().attr("id");

        //删除页面上的节点  从cookie中删除数据
        var cookieArr = JSON.parse($.cookie("goods"));
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            cookieArr.splice(i, 1);
            break;
          }
        }
        if (cookieArr.length) {
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          })
        } else {
          $.cookie("goods", null);
          $('#shopping dl').css('display', 'none')
          $("#nullshopping").css('display', 'block')
        }
        //更新数据数量
        sc_num();
        sc_msg();
      })
    })
  }
  return {
    body: body
  }
})