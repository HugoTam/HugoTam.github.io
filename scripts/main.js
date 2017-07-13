jQuery(function($){
	// 检测是否手机
	var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            isAndroid = ua.match(/(Android)\s+([\d.]+)/),
            isMobile = isIphone || isAndroid;
        //判断
    if(isMobile) {

        console.log("phone is"+isMobile);
        $("body").addClass("is-phone");
    }else {
       console.log("not phone");
    }



	var $gallery = $(".gallery");
	$gallery.flickity({
	  // options
	  cellSelector: '.page',
	  cellAlign: 'center',
	  setGallerySize: false,
	  contain: false,
	  draggable: false,
	  pageDots: false
	});

	console.log("run");


});


window.onload = function(){


	// 等图片加载完，再加载gif
	$(".gif-wrapper").addClass("show");

	$(".gif-wrapper .gif").each(function(){
		// console.log($(this));
		var $this = $(this);

		$this.attr("src",$this.attr("alt"));


	});



};