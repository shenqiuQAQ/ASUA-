console.log('加载成功');

require.config({
	paths: {
    jquery: "jquery-1.10.1.min",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola",
    commodity1: "commodity1",
    commodity2:'commodity2',
    data1:'data1'
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

require(['commodity1','commodity2','data1'],function(commodity1,commodity2,data1){
    commodity1.body();
    commodity2.body();
    data1.body();
})