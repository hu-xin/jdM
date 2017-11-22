window.onload = function(){
	search();
	banner();
	msTime();
}
// 头部搜索
var search = function(){
	// 搜索框对象
	var jd_header_box = document.getElementsByClassName('jd-header-box')[0];
	// 轮播图对象
	var banner = document.getElementsByClassName('jd-banner')[0];
	// 轮播图高
	var height = banner.offsetHeight;
	// 页面被卷去的高度
	var top = document.documentElement.scrollTop;
	// 刷新时判断
	if(top <= height){
		var op = top/height*0.85;
		jd_header_box.style.background = 'rgba(201,21,35,'+ op +')';
	}else{
		jd_header_box.style.background = 'rgba(201,21,35,0.85)';
	}
	// 页面滚动时
	window.onscroll = function(){
		top = document.documentElement.scrollTop;
		if(top <= height){
			var op = top/height*0.85;
			jd_header_box.style.background = 'rgba(201,21,35,'+ op +')';
		}else{
			jd_header_box.style.background = 'rgba(201,21,35,0.85)';
		}
	}

}

// 轮播图
var banner = function(){
	// 轮播图盒子
	var banner_img = document.getElementsByClassName('banner-img')[0];
	var pointsList = document.getElementsByClassName('focus-btn')[0].children;
	var width = banner_img.offsetWidth;
	// 加过渡
	var addTransition = function(){
		banner_img.style.transition = 'all .3s';
		banner_img.style.webkitTransition = 'all .3s';
	}
	// 移除过渡
	var removeTransition = function(){
		banner_img.style.transition = 'none';
		banner_img.style.webkitTransition = 'none';
	}
	// 改变位置
	var setTransform = function(n){
		banner_img.style.transform = 'translateX('+ n +'px)';
		banner_img.style.webkitTransform = 'translateX('+ n +'px)';
	}
	var index = 1;
	var timer = null;
	// 滚动函数
	function scroll(){
		index++;
		addTransition();
		setTransform(-index*width/10);
		for(var i = 0;i < pointsList.length;i++){
			pointsList[i].classList.remove('active')
		}
		// 小圆点跟随
		if(index > 0 && index < 9){
			pointsList[index-1].classList.add('active');
		}else if(index >= 9){
			pointsList[0].classList.add('active');
		}else{
			pointsList[7].classList.add('active');
		}	
	}
	// 自动轮播
	timer = setInterval(scroll,2000)
	// 添加过渡结束事件，实现无缝滚动
	banner_img.addEventListener('transitionend',function(){
		if(index >= 9){
			removeTransition();
			banner_img.style.transform = 'translateX(-10%)';
			index = 1;
		}else if(index <= 0){
			removeTransition();
			banner_img.style.transform = 'translateX(-80%)';
			index = 8;
		}
	},false)
	// 滑动轮播图
	var banner_box = document.getElementsByClassName('jd-banner')[0];
	var startX = 0,moveX = 0,step = 0;
	// touchstart
	banner_box.addEventListener('touchstart',function(e){
		clearInterval(timer);
		// 清除上一次滑动添加的过渡，防止不跟手
		removeTransition();
		startX = e.touches[0].clientX;
	})
	// touchmove
	banner_box.addEventListener('touchmove',function(e){
		moveX = e.touches[0].clientX;
		step = moveX - startX;
		setTransform(-index*width/10 + step)
	})
	// touchend
	banner_box.addEventListener('touchend',function(e){
		if(step < width/10*0.33333 && step > -width/10*0.33333){
			addTransition();
			setTransform(-index*width/10);
		}else if(step > 0){
			index = index - 2;
			scroll();
		}else{
			scroll();
		}
		timer = setInterval(scroll,2000)
	})
}


// 秒杀倒计时
function msTime(){
	var time = 4;
	var t = time * 3600;
	var nums = document.getElementsByClassName('ms-time')[0].getElementsByClassName('num');
	var h,m,s;
	var timer = null;
	timer = setInterval(function(){
		t--;
		h = Math.floor(t/3600);
		m = Math.floor((t%3600)/60);
		s = Math.floor(t%60);
		nums[0].innerHTML = Math.floor(h/10);
		nums[1].innerHTML = h%10;
		nums[2].innerHTML = Math.floor(m/10);
		nums[3].innerHTML = m%10;
		nums[4].innerHTML = Math.floor(s/10);
		nums[5].innerHTML = s%10;
		// 倒计时结束清除计时器
		if(t <= 0){
			clearInterval(timer);
		}
	},1000)
}