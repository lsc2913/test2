$(document).ready(function () {
	//登录验证
	var flag = 0;//存储标识判断输入框全部验证成功
	function loginVerify(who,select,rep,callback){
		
		let w = $(select).width()
		$(select).css('right',-w+'px')
		$(who).on('blur',function(){
			if(rep.test($(this).val())){
				$(select).html(`
				<div  class="t">
							<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-querenzhengque"></use>
							</svg>
						</div>`)
				callback()
			}else{
				$(select).html(`
				<div class="f">
							<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-icon2"></use>
							</svg>格式不正确
						</div>`)
			}

		})
		
	}
	loginVerify('.user','.p1 .tf',/^\d{6,10}$/,function(){flag++})
	loginVerify('.password','.p2 .tf', /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,12}$/,function(){flag++})
	//用回调函数来判断全部输入正确
	$('.btn').on('click',function(){
		if(flag==2){
			// console.log('成功')
			$('.main').css('display','block')
		}
	})

	//滑动验证部分
	var main_left = document.querySelector('.main').offsetLeft
	//随机生成两个盒子的位置
	var doubleBox_width = $('.rightBox').width()//盒子宽度
	var leftBox_x_range = [0,$('.main').width()/2-doubleBox_width]
	var rightBox_x_range = [$('.main').width()/2,$('.main').width()-doubleBox_width]
	var box_y_range = [0,$('.content').height()-doubleBox_width]

	function random(min,max){
		return Math.floor(Math.random()*(max-min+1)+min)
	} 
	var top = random(0,box_y_range[1])
	var rightBox_left = random(rightBox_x_range[0],rightBox_x_range[1])
	var leftBox_left = random(0,leftBox_x_range[1]);//固定回去位置

	$('.leftBox').css({
		top: top+'px',
		left: leftBox_left+'px'
	})
	$('.rightBox').css({
		top: top+'px',
		left: rightBox_left+'px'
	})

	$(".moveBox").on("mousedown", function (e) {
		//求出固定不变的值
		 var fixed_distance = e.pageX - main_left
		//获取左边盒子的left
		var leftBox_offsetLeft = document.querySelector('.leftBox').offsetLeft
		$(document).on('mousemove',function(e){
			// document.querySelector('.moveBox').offsetLeft
			let moveTo = e.pageX - fixed_distance-main_left
			let max = $('.main').width()-$('.moveBox').width()
			if(moveTo<=0){
				moveTo = 0;
			}else if(moveTo>=max){
				moveTo = max
			}
			$('.moveBox').css('left',moveTo+'px')
			// 左边盒子移动的距离/盒子的最大移动距离 = 滑块移动的距离/滑块的最大移动距离
			
			leftBox_maxMove = ($('.main').width()-$('.leftBox').width()-leftBox_offsetLeft)
			let aa = leftBox_maxMove*moveTo/max
	
			$('.leftBox').css('left',aa+leftBox_offsetLeft+'px')
		})
		//鼠标抬起
		$(document).on('mouseup',function(e){
			$(document).unbind('mousemove')
			//动态返回
			animated($('.moveBox').get(0),0)
			animated($('.leftBox').get(0),leftBox_left)
			console.log(leftBox_left)
			//判断是否验证通过
			let leftoff = document.querySelector('.leftBox').offsetLeft
			let rightbox_offsetLeft = document.querySelector('.rightBox').offsetLeft
			if(leftoff>=(rightbox_offsetLeft-2)&&leftoff<=(rightbox_offsetLeft+2)){
				$('.slide .text').text('验证通过').css('color','green')
				// $('.main').css('display','none')
				
			}else{
				$('.slide .text').text('验证失败，请重新验证').css('color','red')
			}
		})
	  });
	 
	

	//设置左边盒子的背景图刚好贴合右边盒子
	$('.leftBox').css({
		'background-position-x':-rightBox_left+'px',
		'background-position-y':-top+'px',
		
	})

	//阻止文字被选中
	document.addEventListener('selectstart',function f(e) {
		e.preventDefault()
	})

	

	
	
  
});
