window.onload = function(){
	categoryLeft();
	categoryRight();
}
// 分类左边
function categoryLeft(){
	var scrollBox = document.getElementsByClassName('title-list')[0];
	var scrollBox_height = scrollBox.offsetHeight;
	var section_height = document.getElementsByClassName('jd-category-right')[0].offsetHeight;
	var lis = scrollBox.getElementsByTagName('ul')[0].children;
	var category_right = document.getElementsByClassName('jd-category-right')[0];
	// 添加过渡
	function addTransition(){
		scrollBox.style.transition = 'all .4s';
		scrollBox.style.webkitTransition = 'all .4s';
	}
	// 移除过渡
	function removeTransition(){
		scrollBox.style.transition = 'none';
		scrollBox.style.webkitTransition = 'none';
	}
	// 设置位置
	function setTransform(n){
		scrollBox.style.transform = 'translateY('+n+'px)';
		scrollBox.style.webkitTransform = 'translateY('+n+'px)';
	}
	var startY = 0,
	endY = 0,
	step = 0,
	currentY = 0;
	var maxY = 150;// 顶部下滑的最大值
	var minY = -(scrollBox_height + 150 -section_height);// 底部上滑的最大值
	var startTime,endTime;
	// touchstart
	scrollBox.addEventListener('touchstart',function(e){
		removeTransition();
		startY = e.touches[0].clientY;
		// 拿到手指接触到屏幕时的时间
		startTime = new Date().getTime();
	},false)
	// touchmove
	scrollBox.addEventListener('touchmove',function(e){
		// 滑动时的translateY
		endY = e.touches[0].clientY;
		step = endY - startY;
		// 正常范围滑动
		if(currentY + step < maxY && currentY + step > minY){
			setTransform(currentY + step);
		}
		// 下滑的临界
		else if(currentY + step > maxY){
			setTransform(maxY);
		}
		// 上滑的临界
		else{
			setTransform(minY);
		}
	},false)
	// touchcancel 更高级的事件（如电话接入）会触发touchcancel事件，暂停touch操作
	scrollBox.addEventListener('touchcancel',function(){
		// 记录滑动后当前的TranslateY
		if(currentY + step < 0 && currentY + step > -(scrollBox_height - section_height)){
			currentY = currentY + step;
		}
		// 下滑TranslateY超过0就弹回
		else if(currentY + step >= 0){
			addTransition();
			setTransform(0);
			currentY = 0;
		}
		// 上滑超过最大限度弹回底部
		else{
			addTransition();
			setTransform(-(scrollBox_height - section_height));
			currentY = -(scrollBox_height - section_height);
		}
		// 参数清0
		startY = 0;
		endY = 0;
		step = 0;
	},false)
	// touchend
	scrollBox.addEventListener('touchend',function(e){
  		// 记录滑动后当前的TranslateY
  		if(currentY + step < 0 && currentY + step > -(scrollBox_height - section_height)){
  			currentY = currentY + step;
  		}
		// 下滑TranslateY超过0就弹回
		else if(currentY + step >= 0){
			addTransition();
			setTransform(0);
			currentY = 0;
		}
		// 上滑超过最大限度弹回底部
		else{
			addTransition();
			setTransform(-(scrollBox_height - section_height));
			currentY = -(scrollBox_height - section_height);
		}
		// tap
		endTime = new Date().getTime();
		if(step == 0 && endTime - startTime < 150){
			// e.target表示发生点击事件的元素
			var li = e.target.parentNode;
			// 点击添加active类
			for(var i=0;i < lis.length;i++){
				lis[i].index = i;
				lis[i].className = '';
			}
			li.className = "active";
			// 计算滚动高度
			var translateY = -(li.index*(scrollBox_height/lis.length));
			// 点击不再滑动的条件
			translateY = translateY <= -(scrollBox_height - section_height) ? -(scrollBox_height - section_height) : translateY;
			addTransition();
			setTransform(translateY);
			// 记录点击滑动后的TranslateY
			currentY = translateY;

			category_right.style.transition = 'all 0.3s';
			category_right.style.webkotTransition = 'all 0.3s';
			category_right.style.opacity = 0;
			setTimeout(function(){
				category_right.style.opacity = 1;
			},300)
		}
		// 参数清0
		startY = 0;
		endY = 0;
		step = 0;
	},false)
}

// 分类右边
function categoryRight(){
	var scrollBox = document.getElementsByClassName('category-list')[0];
	var scrollBox_height = scrollBox.offsetHeight;
	var section_height = document.getElementsByClassName('jd-category-right')[0].offsetHeight;
	var startY,endY,step,currentY = 0;
	// 添加过渡
	function addTransition(){
		scrollBox.style.transition = 'all .4s';
		scrollBox.style.webkitTransition = 'all .4s';
	}
	// 移除过渡
	function removeTransition(){
		scrollBox.style.transition = 'none';
		scrollBox.style.webkitTransition = 'none';
	}
	// 设置位置
	function setTransform(n){
		scrollBox.style.transform = 'translateY('+n+'px)';
		scrollBox.style.webkitTransform = 'translateY('+n+'px)';
	}
	// touchstart	
	scrollBox.addEventListener('touchstart',function(e){
		removeTransition();
		startY = e.touches[0].clientY;
	})
	// touchmove
	scrollBox.addEventListener('touchmove',function(e){
		endY = e.touches[0].clientY;
		step = endY - startY;
		// 顶部下滑最大值
		if(currentY + step >= 100){
			setTransform(100);
		}
		// 底部上滑最大值
		else if(currentY + step <= -(scrollBox_height - section_height + 100)){
			setTransform(-(scrollBox_height - section_height + 100))
		}
		// 正常滑动范围
		else{
			setTransform(currentY + step);
		}
	})
	// touchcancel
	scrollBox.addEventListener('touchcancel',function(e){
		// 吸顶条件
		if(currentY + step >= 0){
			addTransition();
			setTransform(0);
			currentY = 0;
		}
		// 吸底
		else if(currentY + step < -(scrollBox_height - section_height)){
			addTransition();
			setTransform(-(scrollBox_height - section_height));
			currentY = -(scrollBox_height - section_height);
		}
		else{
			currentY += step;
		}
		startY = 0;
		endY = 0;
		step = 0;
	})
	// touchend
	scrollBox.addEventListener('touchend',function(e){
		// 吸顶条件
		if(currentY + step >= 0){
			addTransition();
			setTransform(0);
			currentY = 0;
		}
		// 吸底
		else if(currentY + step < -(scrollBox_height - section_height)){
			addTransition();
			setTransform(-(scrollBox_height - section_height));
			currentY = -(scrollBox_height - section_height);
		}
		else{
			currentY += step;
		}
		startY = 0;
		endY = 0;
		step = 0;
	})
}