$(function(){
	/***全局变量**/
	var GLOBAL = GLOBAL || {};
	/**专业个数**/
	GLOBAL.isPlaying = false;
    //所有页面的点击logo，调到首页
	$("#logo").click(function(){
		window.location.href= "index.html";
	});
	
	/**头部的导航下换线**/
	$(".navLi").click(function(){
		$(this).children("a").addClass("active");
	})
	
	
	$('.lession_hover').hover(function(){
		console.log($(this).children('.sub_nav'))
		$(this).children('.sub_nav').show();
	},function(){
		$(this).children('.sub_nav').hide();
	})
	
	
	var oDiv = $('.courseIntrInner');
	var scrollImg = $('#scrollImg');
	var oPrev = oDiv.find(".prev");
	var oNext = oDiv.find(".next");
	var moveDiv = oDiv.find(".clearfix");
	var li = moveDiv.find("li");
	var timer = null;
	var nextTimer = null;
	var prevTimer = null;
	var nowIndex = 0;
	var c = 1;

	oPrev.click(function(){
		clearTimeout( prevTimer );
		clearTimeout( nextTimer );
		prevTimer = setInterval(function(){
			doPrev();
		},10)
		c = 0;
	});
	oNext.click(function(){
		clearTimeout( nextTimer );
		clearTimeout( prevTimer );
		nextTimer = setInterval(function(){
			doNext();
		},10)
		c = 1;
	});
	oDiv.hover(function(){
		clearTimeout( nextTimer );
		clearTimeout( prevTimer );
	}, function(){
		clearTimeout( nextTimer );
		clearTimeout( prevTimer );
		if(c == 0){
			prevTimer = setInterval(function(){
				doPrev();
			},10)
		}else if(c==1){
			nextTimer = setInterval(function(){
				doNext();
			},10)
		}
	})


	function autoMove(){
		clearInterval( prevTimer );
		prevTimer = setInterval(function(){
			doNext();
		},10)

	}
	autoMove();
	scrollImg.innerHTML+=scrollImg.innerHTML;
	function doPrev(){
		scrollImgParent.scrollLeft--;
		if(scrollImgParent.scrollLeft==0){
			scrollImgParent.scrollLeft = scrollImgParent.scrollWidth/2;
		}
	}

	function doNext(){
		scrollImgParent.scrollLeft++;
		if(scrollImgParent.scrollLeft>=scrollImgParent.scrollWidth/2){
			scrollImgParent.scrollLeft = 0;
		}
	}

	/*********************课程介绍*******************/
	/**点击右侧按钮换页***/
	function rightLunbo(length){
		//alert(length);
		var liWidth = 376;
		
		for (var i = 0;i<=length;i++){
			
			$(".courseIntroduction li").eq(i).animate({
				
				"left":i*liWidth-liWidth*3+"px"
				
			},1000)
			
		}
	}
	/**点击左侧按钮换页***/
	function leftLunbo(length){
		var n = 1;
		n++
		var liWidth = 376;
		for (var i = 0;i<=length;i++){
			/*$(".courseIntroduction li").eq(i).css("left",i*liWidth+"px");*/
			$(".courseIntroduction li").eq(i).animate({
				"left":i*liWidth+"px"
			},1000)
		}
	}

	
	/**点击右侧按钮的时候导航变绿色**/
	function rightArrowNavChange(){
		$(".courseIntrDot li").removeClass("changeNavActive");
		//GLOBAL.this.addClass("changeNavActive");
		
		$(".courseIntrDot li").eq(1).addClass("changeNavActive");
		rightLunbo(length);
	}
	/**点击左侧按钮的时候导航变绿色**/
	function leftArrowNavChange(){
		$(".courseIntrDot li").removeClass("changeNavActive");
		//GLOBAL.this.addClass("changeNavActive");
		GLOBAL.basicIndex -= 1;
		if(GLOBAL.basicIndex = 0){
			$(".courseIntrDot li").eq(0).addClass("changeNavActive");
		}
		$(".courseIntrDot li").eq(GLOBAL.basicIndex).addClass("changeNavActive");
		leftLunbo(length);
	}
	
	
	GLOBAL.movingInterval = 200;
	
	
	/**课程咨询**/
    $(".courseBtn").click(function(){
   	    window.location.href= "index.html";  //TODO
    }) 
    /**更多动态**/
    $(".newsBtn").click(function(){
    	window.location.href= "feicuinews.html";  //TODO
    })
    /**翡翠新闻的tab点击切换**/
    $(".taba").click(function(){
       var index = $(this).index();
       $(this).addClass("tabhover").siblings('.taba').removeClass('tabhover');
   	   $('.newsContent').eq(index).fadeIn(1000).siblings('.newsContent').hide();
    });
  

    
    
   
   
   
    
	

	/**首页课程介绍的鼠标悬停效果**/;
	courseAnimate();
	function courseAnimate(){
		$(".subjects").delegate(".poster","mouseover",function(event){
		    $(this).stop().animate({
		    		"top":"62px",
		    		"box-shadow":"0 0 10px 10px #d5ebdd"
			},GLOBAL.movingInterval);
			$(this).find(".posterTitleLine").css({"background":"#01a83f","margin-top":"24px"});
	    	$(this).find(".posterMainTitle").css({"color":"#01a83f","padding-top":"20px"});
	    	$(this).find(".posterSubsTitle").css("color","#01a83f");
	    	$(this).find(".posterTxt").css("display","block");
		});
		$(".subjects").delegate(".poster","mouseout",function(event){
		    $(this).stop().animate({
	    		"top":"226px",
	    		"box-shadow":"0 0 0 0 #d5ebdd"
	    	},GLOBAL.movingInterval);
	    	
	    	$(this).find(".posterTxt").css("display","none");
			$(this).find(".posterTitleLine").css({"background":"#434343","margin-top":"13px"});
	    	$(this).find(".posterMainTitle").css({"color":"#434343","padding-top":"48px"});
	    	$(this).find(".posterSubsTitle").css("color","#434343");	 
		});
	}
	
    /*********************************翡翠新闻************************8****/
    $(".newsTitleList li").hover(function(){
    	var num =$(this).index();
    	$(".newContentTotal>li").eq(num).css("display","block").siblings().hide();
    })
	
	$(".qAndA li").hover(function(){
		var index =$(this).index();
		$(".qAndA li").parents().find(".answer").hide();
		$(".qAndA li").eq(index).find(".answer").show();
	   
		
	})
	
	
	
	
	
	
	/**视频    滚动条监听事件***/
	$(window.document).scroll(function () {
		/****/
		var a = $(".studentsIntroduction").offset().top;
		
		var windowTop = $(window.document).scrollTop();
		if(!GLOBAL.isPlaying && windowTop>a-400 && windowTop<a+180){
			var myPlayer = videojs('my-video');
			videojs("my-video").ready(function(){
				var myPlayer = this;
				myPlayer.play();
				GLOBAL.isPlaying= true;
			});
		}else if (GLOBAL.isPlaying && (windowTop<a-600|| windowTop>a+100)){
			var myPlayer = videojs('my-video');
			videojs("my-video").ready(function(){
				var myPlayer = this;
				myPlayer.pause();
				GLOBAL.isPlaying= false;
			});
		}
	    
	 
    });
   
    /**取到**/
    var clientName  = $(".nameText").val();
    var clientPhone = $(".phoneText").val();
    
   
    /****数据校验**/
    
    /***点击立即预定座位上传数据**/
    $(".reservation").click(function(){
    	/**取到**/
	    clientName  = $(".nameText").val();
	    clientPhone = $(".phoneText").val();
	    if(clientName==""){
			alert("请录入您的姓名或昵称!");
			return;
		}
		if(!isPhoneMatch()){
			alert("请填写正确的手机");
			return;
		}
    	postNameAndPhone();

    })
	
     //判断输入的字符是否满足要求
	function isNameMatch() {
		var clientName  = $(".nameText").val();
		var patten = new RegExp("^([\u4E00-\u9FA5]{2,5})$");
		return patten.test(clientName);
	}
	//非法字符的验证
	/*function isLegalChar() {
		var clientName  = $(".nameText").val();
		var patten =/[`~!@#$%^&*_+<>{}\/'[\]]/im;
		return patten.test(clientName);
	}*/
    //判断输入的电话是否满足要求
    function isPhoneMatch(){
    	var clientPhone = $(".phoneText").val();
		var pattern = /^1[34578]\d{9}$/;   
		return pattern.test(clientPhone);
    }
    
    //获得字符串的字节数
	function getCharSize(str) {
		var realLength = 0,
			len = str.length,
			charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128)
				realLength += 1;
			else
				realLength += 2;
		}
		return realLength;
	}
    
   
    
    /**上传姓名和电话***/
    function postNameAndPhone(){
	 	
	    $.ajax({
	        async: true,　　　　　　　
	        type: "post",   
	        url: "/feicuiwb/enroll/insertEnroll",
            dataType: "json",
	        data:{
	        	name:clientName,  
	        	telphone:clientPhone  
	        },
	        success: function(json) {  
	        	$(".nameText").val("");
    			$(".phoneText").val("");
	        	alert(json.msg);
	        },
	        error : function() { 
		    	alert("网络错误"); 
	   		} 
	    });
	}
	
	
	//ip地址获取更改头部地区
	
	//根据ip地址获取地理位置
	        var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	        $.getJSON(url, function(data) {
	            var ip = data.Ip;
	            $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + ip, function(_result) {
	                // console.log(remote_ip_info.city);
	                //城市
	                var xuanxiang = remote_ip_info.city;
	          		$('.location>.right:nth-of-type(3)').html(xuanxiang);
	            });
	        	});
	
})		