/**
 * Created by hugotam on 16/2/23.
 */

var ME = {};

$(function(){
    TamTool.initENV();


    if($("body").hasClass("touch-device")){
        window.location.href = "/mobile";
    }


});