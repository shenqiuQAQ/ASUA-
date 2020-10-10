console.log('加载成功');

require.config({
	paths: {
    jquery: "jquery-1.10.1.min",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola",
    shopping1:'shopping1',
  },
  //jquery-cookie 依赖于jquery
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
    parabola: {
      exports: "_",
    }
  }
})

require(['shopping1'],function(shopping1){
  shopping1.body();
})