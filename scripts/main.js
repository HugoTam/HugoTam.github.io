jQuery(function($){
	var $gallery = $(".gallery");
	$gallery.flickity({
	  // options
	  cellSelector: '.page',
	  cellAlign: 'center',
	  contain: true,
	  draggable: false,
	  pageDots: false
	});


	var $quiz = $(".quiz");
	$quiz.on("click",function(){
		$gallery.flickity("next");
	});

	// 介绍的habbit
	var habbits = ["UI","Web Design","basketball","animation","interaction","HTML5"];
	// 现在集合的队列
	var i = 0;
	var j = 0;
	var newText = "",
		oldText = "";
	var firstLoadText = true;
	var $newText = $(".new");
	var $oldText = $(".old");
	var habbitsTimer = setInterval(function(){
		if(i<habbits.length && i!==0){
			if(j<habbits[i].length || j<=habbits[i-1].length){
				oldText = habbits[i-1].substring(j);
				newText = habbits[i].substring(0,j+1);

				$newText.text(newText);
				$oldText.text(oldText);

				j++;
			}else{
				i++;
				j=0;
			}
		}else if(i===0 && firstLoadText){
			console.log(1);
			// 第一次
			if(j<habbits[i].length){
				oldText = "";
				newText = habbits[i].substring(0,j+1);

				$newText.text(newText);
				$oldText.text(oldText);

				j++;
			}else{
				i++;
				j=0;
				firstLoadText = false;
			}
		}else{
			// 大于数组，重置，要与第一次区分
			if(j===0){
				i=0;
			}
			if(j<habbits[i].length || j<=habbits[habbits.length-1].length){
				oldText = habbits[habbits.length-1].substring(j);
				newText = habbits[i].substring(0,j+1);

				$newText.text(newText);
				$oldText.text(oldText);

				j++;
			}else{
				i++;
				j=0;
			}
		}

	},100);
	// for(var i=0;i<habbits.length;i++){
	// 	for(var j=0;j<habbits[i].length;j++){
	// 		if(i!==0){
	// 			oldText = habbits[i-1].substring(j);
	// 		}
	// 		newText = habbits[i].substring(0,j+1);
	// 		console.log("newText: "+newText);
	// 		console.log("oldText: "+oldText);
	// 	}
	// }

});
// var habbitsTimer = setInterval(function(){
// 		if(i<habbits.length){
// 			if(j<habbits[i].length){
// 				if(i!==0){
// 					oldText = habbits[i-1].substring(j);
// 				}
// 				newText = habbits[i].substring(0,j+1);

// 				$newText.text(newText);
// 				$oldText.text(oldText);

// 				j++;
// 			}else{
// 				i++;
// 				j=0;
// 			}
// 		}else{
// 			oldText = habbits[i-1].substring(j);
// 			i=0;
// 			j=0;
// 		}

// 	},100);