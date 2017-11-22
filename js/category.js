window.onload = function(){
	scroll('title-list');
}
function scroll(obj){
	var scrollBox = document.getElementsByClassName(obj)[0];
	var scrollBox_height = scrollBox.offsetHeight;
	var section_height = document.getElementsByClassName('jd-category-right')[0].offsetHeight;
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
	var startY = 0,moveY = 0,step = 0,currentY = 0;
	// touchstart
	scrollBox.addEventListener('touchstart',function(e){
		startY = e.touches[0].clientY;
		console.log(startY);
	})
	// touchmove
	scrollBox.addEventListener('touchmove',function(e){
		evt.preventDefault();
		moveY = e.touches[0].clientY;
		step = moveY - startY;
		setTransform(currentY + step);
	})
	scrollBox.addEventListener('touchcancel',function(e){
		console.log(11);
	})
	// touchend
	scrollBox.addEventListener('touchend',function(e){
		currentY = step;
		console.log(step);
	})

}