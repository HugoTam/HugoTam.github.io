jQuery(function($){
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