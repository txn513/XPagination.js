XPagination.js
==========

纯原生js轻量级分页控件

## 用法

在html页面中想要添加分页的位置创建div并添加id属性：

```
...
<div id="xpagination"></div>
...
```

引入样css文件到页面中：
```
...
<link rel="stylesheet" href="XPagination.css">
...
```

引入js文件到页面中：
```
...
<script src="XPagination.js"></script>
...
```

初始化插件：
```
...
var pagination  = new XPagination({
	el: 'xPagination', 				//{String} - 外层id
	fontShowNo: 2,					//{Number} - 显示分页数字按钮数量，默认值8
	numPerPage: [12,24,36,48],			//{Array} - 没显示数量选项，默认值[10,20,40,100]
	position: 'right',				//{String} - 左浮动或有浮动, 默认值'left'
	theme: 1,					//{Number} - 主题，默认值0
	scrollTo: 600,					//{Number} - 点击分页跳转后滚动至某位置，默认值0
	callback: function(curPageNo, curNumPerPage){},	//{Function} - 回调函数请求数据包含两个参数:@curPageNo 当前页数, 									//@curNumPerPage 当前每页显示数

});
..
```

## API

upadate(totalPageNo,totalRecord)     更新总页数和总数据数量
