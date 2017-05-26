/*
* XPagination - a JS dropdown plugin.
* @author Lance Tian <xtian513@gmail.com>
* @Created 2017-05-24
* @Last-Modified 2017-05-25
* @version 1.3
*
* @param {Object} params - 传入参数集合
* @param {String} params.el - 下拉框id
* @param {String} params.fontShowNo - 显示分页页码数量
* @param {Array} params.numPerPage - 传入单页显示数量 eg.[10,20,40,100]
* @param {String} params.position - 靠左/靠右
* @param {Number} params.theme - 主题颜色 0-默认色 1-vi色
* @param {xp~callback} params.callback - 请求回调
* @param {Number} params.scrollTo - 传入滚动位置
* @returns {Object} - xp构造函数
*
*/


/*
*
* 增加点击滚动选项
* @version 1.3
*
* 增加位置选项-靠左或靠右
* @version 1.2
*
*/

window.xpagination = (function(){

	/*
	* @constructor
	*/
	var xp = function(params){
		this.numPerPage = params.numPerPage || [10,20,40,100];  //默认每页显示数量
		this.el = params.el;   //父级id
		this.fontShowNo = params.fontShowNo||8;  //显示页码数量
		this.position = params.position || 'left';
		this.callback = params.callback || function(){console.log('请传入回调')}; //回调函数
		this.theme = params.theme||0;
		this.scrollTo = params.scrollTo||0;

		this.totalPageNo = 1; //初始默认样式共1页
		//this.endShowNo = params.endShowNo || 2;
		// this.leftRightNo = 2; //左右显示页数
		this.curPageNo = 1; //默认当前页为1
		this.totalRecord = 0; //总记录数
		this.xPaginationWrap = null;   //父级对象
		this.onOff = true;
		this.curNumPerPage = this.numPerPage[0]; //默认当前每页页数为数组第一个
		this.totalThemeNo = 2; //总主题数
		this.inputValue = "";

		this.init();
	}
	xp.prototype = {
		init: function(){
			this.xPaginationWrap = document.getElementById(this.el); //获取父级 
			this.renderHtml();
		},
		update: function(totalPageNo,totalRecord){

			
			this.totalPageNo = totalPageNo;
			this.totalRecord = totalRecord; 
			this.onOff = true;

			this.setPos(this.curPageNo);
			//this.renderHtml();
			
		},
		renderHtml: function(){
			if(this.onOff){
				this.onOff = false;
				this.callback(this.curPageNo, this.curNumPerPage);//callback发送请求
			}
			
			this.setPos(this.curPageNo);
		},
		clickEvent: function(){
			var numBtns = document.querySelectorAll('.xp_page_num_btn');
			var oHomeBtn = document.querySelector('.xp_page_home_btn');
			var oLastBtn = document.querySelector('.xp_page_lastpage_btn');
			var oPrevBtn = document.querySelector('.xp_page_prev_btn');
			var oNextBtn = document.querySelector('.xp_page_next_btn');
			var oSubmit = this.xPaginationWrap.querySelector('.submit');

			var _self = this;
			
			function scrollTo(top){
				document.getElementsByTagName('body')[0].scrollTop = top;
			}
			
			//数字按钮点击事件
			for(var i = 0; i<numBtns.length; i++){
				numBtns[i].addEventListener('click',function(){
					scrollTo(_self.scrollTo);
					_self.curPageNo = this.dataset.pageno;
					//console.log(_self.fontShowNo);
					//_self.setPos(_self.curPageNo);
					_self.renderHtml();
				});
			}
			//首页按钮点击事件
			oHomeBtn.addEventListener('click',function(){
				scrollTo(_self.scrollTo);
				_self.curPageNo = 1;
				_self.renderHtml();
			});
			//尾页按钮点击事件
			oLastBtn.addEventListener('click',function(){
				scrollTo(_self.scrollTo);
				_self.curPageNo = _self.totalPageNo;
				_self.renderHtml();
			});
			//后退按钮点击事件
			oPrevBtn.addEventListener('click',function(){
				scrollTo(_self.scrollTo);
				_self.curPageNo--;
				if(_self.curPageNo <1){
					_self.curPageNo = 1;
				}
				_self.renderHtml();
			});
			//前进按钮点击事件
			oNextBtn.addEventListener('click',function(){
				scrollTo(_self.scrollTo);
				console.log(_self.curPageNo);
				_self.curPageNo++;
				if(_self.curPageNo > _self.totalPageNo){
					_self.curPageNo = _self.totalPageNo;
				}
				_self.renderHtml();
			});
			//确定按钮点击事件
			oSubmit.addEventListener('click',function(e){
				scrollTo(_self.scrollTo);
				var target  = e.currentTarget;
				var value = parseInt(target.previousElementSibling.value);
				if(value!=0 &&  value <= _self.totalPageNo){
					_self.inputValue = value;
					_self.curPageNo = value;
					_self.renderHtml();
				}
				//console.log(target.previousElementSibling);
			});
		},
		setPos: function(num){
			var newNum = parseInt(num);
			var posClass = "fLeft";
			var themeClass = '';
			for(var i =0; i<this.totalThemeNo; i++){
				if(i == this.theme){
					themeClass = 'theme'+i;
				}
			}
			//var xPaginationWrap = document.getElementById(this.el);
			if(this.position == "right"){
				posClass = "fRight";
			}

			var xContainer = document.createElement('div');
			xContainer.className = 'xp_container clearFix '+themeClass;


			var xpPartOneHtml = '<div class="xp_left '+ posClass +'">'+
			'<div class="fLeft">每页</div>'+
			'<div id="xSelect" class="xselect fLeft">'+
			'<span>'+ this.curNumPerPage +'</span>'+
			'<ul class="dropdown">';

			this.numPerPage.forEach(function(data, i){
				xpPartOneHtml += '<li>'+ data +'</li>'
			});
			xpPartOneHtml += '</ul>'+
			'</div>'+
			'<div class="fLeft">条数据&nbsp;共<span class="total_record">'+ 
			this.totalRecord +
			'</span>条数据，共<span class="total_page">'+ 
			this.totalPageNo +
			'</span>页。</div>'+
			'</div>';



			var mainPartHtml = '<div class="xp_right '+ posClass +'"><div class="xp_single_page_btn xp_page_home_btn">首页</div><div class="xp_single_page_btn xp_page_prev_btn">&lt;</div>';

			function activeClass(index){
				if((index+1) == newNum){
					mainPartHtml += '<div class="xp_single_page_btn xp_page_num_btn current" data-pageno="'+ (i+1) +'">' + (i+1)+'</div>';
				}
				else {
					mainPartHtml +='<div class="xp_single_page_btn xp_page_num_btn" data-pageno="'+ (i+1) +'">' + (i+1)+'</div>';
				}
				
			}
			if(this.fontShowNo+1>this.totalPageNo){
				for(var i = 0; i<this.totalPageNo; i++){
					activeClass(i);
				}
			}
			else {
				var leftNum = Math.ceil((this.fontShowNo+1-3)/2);
				var rightNum = this.fontShowNo+1-3-leftNum;
				if((newNum-leftNum)>1 && (newNum+rightNum)<this.totalPageNo){

					mainPartHtml +='<div class="xp_single_page_btn xp_page_ellipsis_btn">...</div>';
					for(var i = (newNum-leftNum-1); i<(newNum+rightNum); i++){
						activeClass(i);
					}
					mainPartHtml +='<div class="xp_single_page_btn xp_page_ellipsis_btn">...</div>';
				}
				else if((newNum-leftNum) <=1){
					for(var i = 0; i<this.fontShowNo; i++){
						activeClass(i);
					}
					mainPartHtml +='<div class="xp_single_page_btn xp_page_ellipsis_btn">...</div>';
				}
				else if((newNum+rightNum)>=this.totalPageNo){

					mainPartHtml +='<div class="xp_single_page_btn xp_page_ellipsis_btn">...</div>';
					for(var i = (this.totalPageNo-this.fontShowNo) ; i<this.totalPageNo; i++){
						activeClass(i);
					}
				}
			}

			mainPartHtml +='<div class="xp_single_page_btn xp_page_next_btn">&gt;</div><div class="xp_single_page_btn xp_page_lastpage_btn">尾页</div></div>';


			var xpPartRedirectHtml = '<div class="xp_redirect_part '+ posClass +'">到<input type="text" value="'+ this.inputValue +'">页<span class="submit">确定</span></div>';
			
			var tempDiv = '';
			if(this.position == "right"){
				tempDiv = xpPartRedirectHtml+mainPartHtml+xpPartOneHtml;
			}
			else if(this.position == "left"){
				tempDiv = xpPartOneHtml+mainPartHtml+xpPartRedirectHtml;
			}
			


			xContainer.innerHTML = tempDiv;
			this.xPaginationWrap.innerHTML = '';
			this.xPaginationWrap.appendChild(xContainer);

			this.clickEvent();
			this.selectInit();
			// this.callback(this.curPageNo, this.numPerPage);
			
		},
		selectInit: function(){
			var obj = this;
            var oXSelect = document.getElementById('xSelect');
            var oLis = oXSelect.querySelectorAll('li');
            var oSpan = oXSelect.querySelector('span');

            oXSelect.addEventListener('click',function(e){
                e.stopPropagation();
                var allSiblings = document.querySelectorAll('.xselect');
               
                
                //console.log(obj.hasClass(this,'active'));
                obj.toggleClass(this,'active'); 


            });

            for(var i=0; i<oLis.length; i++){
                oLis[i].addEventListener('click', function(){
                    obj.curNumPerPage = this.innerHTML;
                    if(oSpan.innerHTML == obj.curNumPerPage) return;
                    oSpan.innerHTML = obj.curNumPerPage;
                    obj.removeClass(oSpan.parentNode,'active')
                    obj.curPageNo = 1;  //还原到第一页
					obj.renderHtml();
                });
            }
		},
		hasClass: function(obj, cls) {
            var obj_class = obj.className,//获取 class 内容.
              obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
              x = 0;
              for(x in obj_class_lst) {
                if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                  return true;
                }
              }
              return false;
           // console.log(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
        },
        removeClass: function(obj, cls) {
            if (this.hasClass(obj, cls)) {
                var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
                  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
                  removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
                  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
                  obj.className = removed;//替换原来的 class.
            }
        },
        toggleClass: function(obj,cls){
            //console.log(this.hasClass(obj,cls));
            if(this.hasClass(obj,cls)){
                //console.log(1);
                this.removeClass(obj, cls);
            } else {
           // console.log(2);
                this.addClass(obj, cls);
            }
        },
        addClass: function(obj, cls) {
            if (!this.hasClass(obj, cls)) {
                obj.className += " " + cls;
            }
        },
        siblingElems: function(elem){
               	var nodes=[ ];
                var _elem=elem;
               	while((elem=elem.previousSibling)){
                      if(elem.nodeType==1){
                             nodes.push(elem);
                      }
               	}
               	var elem=_elem;
              	while((elem=elem.nextSibling)){
                  	if(elem.nodeType==1){
                       	nodes.push(elem);
                  	}
               	}
        },
	}
	return xp;
})();