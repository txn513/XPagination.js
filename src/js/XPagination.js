window.xpagination = (function(){
	var xp = function(params){
		this.numPerPage = 10;  //默认每页显示数量
		this.pageNo = 1; //默认第一页
		this.oContainer = params.el;
		this.totalPageNo = params.totalPageNo||8; //初始默认样式共8页
		this.fontShowNo = params.fontShowNo||8;
		this.endShowNo = params.endShowNo || 2;
		this.init();
	}
	xp.prototype = {
		init: function(){
			this.renderHtml();
		},
		renderHtml: function(){
			var xPaginationWrap = document.getElementById(this.oContainer);
			var xContainer = document.createElement('div');
			xContainer.className = 'xp_container clearFix';
			var tempDiv= '<div class="xp_single_page_btn xp_page_home_btn">首页</div><div class="xp_single_page_btn xp_page_prev_btn">&lt;</div>'
			for(var i=0; i<this.totalPageNo; i++){
				tempDiv +='<div class="xp_single_page_btn xp_page_num_btn">' + (i+1)+'</div>';
			}
			tempDiv +='<div class="xp_single_page_btn xp_page_next_btn">&gt;</div><div class="xp_single_page_btn xp_page_lastpage_btn">尾页</div>';
			xContainer.innerHTML = tempDiv;
			//console.log(xContainer);
			xPaginationWrap.innerHTML = '';
			xPaginationWrap.appendChild(xContainer);
		},
		clickEvent: function(){

		},
	}
	return xp;
})();