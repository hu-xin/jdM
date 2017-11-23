window.onload = function(){
	check();
	deleteGoods();
}

// 选择框
function check(){
 	var checks = document.getElementsByClassName('icon-check');
 	var shop_checks = document.getElementsByClassName('shop-check');
 	var total_check = document.getElementById('total_check');
 	// 单个check框
 	for(var i = 0;i < checks.length;i++){
 		checks[i].addEventListener('click',function(){
 			var haschecked = this.getAttribute('checked');
 			if(haschecked !== null){
 				this.removeAttribute('checked');
 			}else{
 				this.setAttribute('checked','');
 			}
 		})
 	}
}
// 删除
function deleteGoods(){
	var delete_btns = document.getElementsByClassName('delete_btn');
	var cart_shade = document.getElementsByClassName('cart-shade')[0];
	var cancel = document.getElementsByClassName('cancel')[0];
	for(var i = 0; i < delete_btns.length;i++){
		delete_btns[i].addEventListener('click',function(){
			cart_shade.style.display = 'block';
			cart_shade.style.animation = 'delete-goods 1s';
			cart_shade.style.webkitAnimation = 'delete-goods 1s';
	})
	}
	cancel.addEventListener('click',function(){
			cart_shade.style.display = 'none';
	})
	
}