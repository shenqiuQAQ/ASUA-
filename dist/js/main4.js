console.log('加载成功');

require.config({
	paths: {
    jquery: "jquery-1.10.1.min",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola",
    register:'register',
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

require(['register'],function(register){
  register.body();
})