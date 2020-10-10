console.log('加载成功');

require.config({
	paths: {
    jquery: "jquery-1.10.1.min",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola",
    index1: "index1",
    index2: "index2",
    index3: 'index3',
    data:'data',
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

require(['index1','index2','index3','data'],function(index1,index2,index3,data){
  index1.body();
  index2.body();
  index3.body();
  data.body();
})