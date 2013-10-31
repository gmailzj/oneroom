

//配置文件
require.config({
	baseUrl: "./",
	paths: {
		"jquery": "jquery"
		//"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"  //另外一个台主机
	}
});

/*
理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？
回答是可以的。
这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。
举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。


require.config({
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
		'jquery.scroll': {
			deps: ['jquery'],
			exports: 'jQuery.fn.scroll'
		}
	}
});
*/

//多个模块一起定义
/*

require(['jquery','math'], function($, math) {
	alert(math.add(1,1))
});

*/

require(['math'], function(math) {
	alert(math.add(1,1));////后弹 因为math依赖jquery，math.js中定义了依赖

});

require(['jquery'], function ($){
	// some code here
	alert('23')  //先弹
	//alert(math.add(1,1));
});



