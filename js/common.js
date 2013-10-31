function ajax(url,data,responseType,status_div,callback, http_type){
    if( ! http_type){
        http_type = 'POST';
    }
    return $.ajax({
        url: url,
        type: http_type,
        data: data,
        dataType: responseType,
        beforeSend: function(){
            $('#'+status_div).html('<center><img src="images/loading.gif"/></center>');
        },
        success: callback,
        error: function(error){
            $('#'+status_div).html('Request error!');
        }
    });
}

if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    }
}

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX + 
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + 
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

function resizeFbCanvas(){
    FB.Canvas.setSize({
        width: $('#root').offsetWidth, 
        height: $('#root').offsetHeight
    });
}

function fb_scrollTo(from,to){
    FB.Canvas.scrollTo(0,from);
    if(from <= to){
        setTimeout(fb_scrollTo, 100, from+20, to);
    }
    else{
        FB.Canvas.scrollTo(0,from + 20);
    }
}

function close_facebox(){
    $(document).trigger('close.facebox');
}

function isie() {
    var ua = navigator.userAgent;
    var IE = (ua.indexOf("MSIE") > 0?true:false);

    return IE;
}


function isie6() {
    var result = false;

    var ua = navigator.userAgent;
    var IE = (ua.indexOf("MSIE") > 0?true:false);
    // register mouse over and mouseout for IE
    if (IE) {
        var rv;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );

        if (rv <= 6 ) {
            result = true;
        }
    }
    return result;
}

function gotofunc(object, func, args)
{
    return function() {
        return func.apply(object, args);
    };
}

function convert_month(month_str)
{
    if(month_str == "Jan"){
        return 0;
    }else if(month_str == "Feb"){
        return 1;
    }else if(month_str == "Mar"){
        return 2;
    }else if(month_str == "Apr"){
        return 3;
    }else if(month_str == "May"){
        return 4;
    }else if(month_str == "Jun"){
        return 5;
    }else if(month_str == "Jul"){
        return 6;
    }else if(month_str == "Aug"){
        return 7;
    }else if(month_str == "Sep"){
        return 8;
    }else if(month_str == "Oct"){
        return 9;
    }else if(month_str == "Nov"){
        return 10;
    }else if(month_str == "Dec"){
        return 11;
    }
};