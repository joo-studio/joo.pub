(function(navigator) {
    var userAgent = navigator.userAgent;
        documentElement = document.documentElement;
    if ( userAgent.match( /micromessenger\/5/gi ) ) {
        documentElement.className += " mobile wx_mobile wx_mobile_5";
    } else if ( userAgent.match( /micromessenger/gi ) ) {
        documentElement.className += " mobile wx_mobile";
    } else if ( userAgent.match( /ucbrowser/gi ) ) {
        documentElement.className += " mobile uc_mobile";
    } else if ( /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( userAgent.toLowerCase() ) ) {
        documentElement.className += " mobile";
    } else if ( userAgent.toLowerCase().match( /msie/gi ) && ( parseFloat( userAgent.toLowerCase().match( /msie ([0-9]{1,}[\.0-9]{0,})/i )[1] || 999 ) < 9 ) ) {
        documentElement.className += " pc pc-ie pc-ie8";
    } else if ( userAgent.toLowerCase().match( /msie/gi ) || navigator.msPointerEnabled || navigator.pointerEnabled ) {
         documentElement.className += " pc pc-ie";
    } else {
        documentElement.className += " pc";
    }
})(navigator);