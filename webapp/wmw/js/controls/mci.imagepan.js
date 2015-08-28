/**
* h5player v0.0.1 by yangyin 
* Copyright 2014 yangyin@mcitech.cn http://weibo.com/nodersolar
*/
!function(a){"function"==typeof define&&define.amd?define("mci.imagepan",["jquery","mci.support","mci.mask"],a):a(jQuery,Support)}(function(a,b,c){"use strict";function d(a,b){return e?a.changedTouches[0][b]:a[b]}var e=b.touch,f=b.touchStartEvent,g=b.touchMoveEvent,h=b.touchEndEvent,i=function(a){return this instanceof i?this.init(a):new i(a)};return i.prototype.init=function(c){var d=this;if(d.options=d.options||{initialZoomRate:0,initialOffsetX:0,initialOffsetY:0,largerView:!1,scrollView:!1,converRes:"",src:""},d.options=a.extend(d.options,c),!d.options.dom)throw"setting dom can't be null or undefine";d.dom=d.options.dom,d.moveDom=d.dom.find(">.mci-imagepan-w > .mci-imagepan-i "),d.moveDom.css(b.transform3d?{transform:"translate3d("+d.options.initialOffsetX+"px,"+d.options.initialOffsetY+"px,0)"}:{transform:"translate("+d.options.initialOffsetX+"px,"+d.options.initialOffsetY+"px)"}),d.options.largerView&&"zoom"==d.options.scrollerView?(a(d.options.dom)[0].addEventListener("click",d,!1),d.dom[0].addEventListener(f,d,!1),d.dom[0].addEventListener(g,d,!1),d.dom[0].addEventListener(h,d,!1)):"zoom"!=d.options.scrollerView&&(d.dom[0].addEventListener(f,d,!1),d.dom[0].addEventListener(g,d,!1),d.dom[0].addEventListener(h,d,!1),b.touch||d.dom[0].addEventListener(b.mouseOut,d,!1)),d.currentPosition={x:d.options.initialOffsetX,y:d.options.initialOffsetY},d.scrolling=!1},i.prototype.handleEvent=function(a){var c=this;switch(a.type){case"click":c._click(a);break;case f:c._touchStart(a);break;case g:c._touchMove(a);break;case h:c._touchEnd(a);break;case b.mouseOut:c._touchEnd(a)}},i.prototype._click=function(a){var b=this;a.stopPropagation(),a.preventDefault(),b.canZoom&&b._Zoom(a)},i.prototype._touchStart=function(a){var b=this;b._setTransition(!1),b.scrolling||(b.startPageX=d(a,"pageX"),b.startPageY=d(a,"pageY"),b.basePageX=b.startPageX,b.basePageY=b.startPageY,b.scrolling=!0,b.moveReady=!1,b.canZoom=!0,b.duration=0,b.timeStamp=a.timeStamp||(new Date).getTime())},i.prototype._touchMove=function(a){var b=this;if(b.scrolling){if("zoom"==b.options.scrollerView)return void(b.canZoom=!1);var c=d(a,"pageX"),e=d(a,"pageY"),f=0,g=0,h=0,i=0,j=0,k=0;if(b.moveReady)a.preventDefault(),a.stopPropagation(),f=c-b.basePageX,g=e-b.basePageY,j=b.currentPosition.x+f,k=b.currentPosition.y+g,b.currentX=j,b.currentY=k,b._setPosition({x:j,y:k});else{var l=!1,m=!1;h=Math.abs(c-b.startPageX),i=Math.abs(e-b.startPageY),h>5&&(l=!0),i>5&&(m=!0),"both"==b.options.scrollerView?(l||m)&&(b._canMoved(c-b.startPageX,-1)&&l&&(b.moveReady=!0),b._canMoved(e-b.startPageY,1)&&m&&(b.moveReady=!0)):(l&&"horizontal"==b.options.scrollerView&&b._canMoved(c-b.startPageX,-1)&&l&&(b.moveReady=!0),m&&"vertical"==b.options.scrollerView&&b._canMoved(e-b.startPageY,1)&&m&&(b.moveReady=!0)),b.moveReady&&(a.preventDefault(),a.stopPropagation(),b.dom[0].addEventListener("click",b,!1))}b.basePageX=c,b.basePageY=e}},i.prototype._touchEnd=function(a){var b=this;if(b.scrolling=!1,b.duration=(a.timeStamp||(new Date).getTime())-b.timeStamp,b.moveReady&&(setTimeout(function(){b.dom[0].removeEventListener("click",b,!1)},100),b.moveReady=!1),a.duration=b.duration,!(a.duration>=300)){var c=a.duration,e=d(a,"pageX"),f=d(a,"pageY"),g=0,h=0;g=e-b.startPageX,h=f-b.startPageY;var i=0,j=0,k=0,l=0;i=b.options.maxX-Math.abs(b.currentX),j=Math.abs(b.currentX),k=b.options.maxY-Math.abs(b.currentY),l=Math.abs(b.currentY);var m=b._momentum(g,c,i,j),n=b._momentum(h,c,k,l),o=b.currentX+m.dist,p=b.currentY+n.dist;o>=0?o=0:o<=-b.options.maxX&&(o=-b.options.maxX),p>=0?p=0:p<=-b.options.maxY&&(p=-b.options.maxY),(0!=g||0!=h)&&b.scrollTo(o,p,m.time>n.time?m.time:n.time)}},i.prototype._canMoved=function(a,b){var c=this,d=0,e=0,f=0,g=0;if(f=c.options.maxX,g=c.options.maxY,c.options.initialOffsetX>0&&(d=c.options.initialOffsetX),c.options.initialOffsetY>0&&(e=c.options.initialOffsetY),1==b){if(c.currentPosition.y>-c.options.maxY&&0>a)return!0;if(a>0&&c.currentPosition.y<e)return!0}if(-1==b){if(c.currentPosition.x>-c.options.maxX&&0>a)return!0;if(a>0&&c.currentPosition.x<d)return!0}return!1},i.prototype._Zoom=function(){var b=this;if(b.options.largerView){var d=b.dom.find(">.mci-imagepan-w > .mci-imagepan-i.lager"),e=0,f=0;if(0==e||0==f)for(var g=d.find(">.text-separated >.text-sperate"),h=0,i=0,j=0;j<g.length;j++){var k=parseInt(g.eq(j).css("top"),10),l=parseInt(g.eq(j).css("left"),10),m=parseInt(g.eq(j).width(),10),n=parseInt(g.eq(j).height(),10);0==j?(i=-k,h=-l,n>f&&(f=n),m>e&&(e=m)):(k+n>f&&(f=k+n),m+l>e&&(e=m+l))}var o=b.options.width,p=0;0!=e&&(p=o/e);var q=1,r=window.pageWidth||a("body").width(),s=window.pageHeight||a("body").height();e>=r&&(q=(e-100)/e,e-=100,f=q*f);var k=(s-f)/2,l=(r-e)/2;k+=i,l+=h;var t=a('<div class="mci-imagpan-max" style="z-index:9911;width:'+e+"px;height:"+f+"px;position:absolute;left:"+b.options.pageLeft+"px;top:"+b.options.pageTop+'px;display: block;visibility:visible;"></div>'),u=a(d).clone();t.css({transform:"scale("+p+")"}),t.append(u),a("body").append(t);var v=new c({conDom:d.parent(),top:b.options.top,left:b.options.left,width:r,height:s,hiddenChanged:function(){t.css({transition:"all 1s ease",transform:"scale("+p+")",left:b.options.pageLeft+"px",top:b.options.pageTop+"px"}),setTimeout(function(){a(t).remove()},1e3)}});v.show(),t.css({transition:"all 1s ease",transform:"scale("+q+")","z-index":"9911",visibility:"visible",top:k+"px",left:l+"px"})}},i.prototype._setPosition=function(a){var c=this;if("zoom"!=c.options.scrollerView){var d={x:0,y:0};switch(c.options.scrollerView){case"both":d=a;break;case"vertical":d.x=c.currentPosition.x,d.y=a.y;break;case"horizontal":d.y=c.currentPosition.y,d.x=a.x}var e=0,f=0,g=0,h=0;c.options.initialOffsetX>0&&(e=c.options.initialOffsetX),c.options.initialOffsetY>0&&(f=c.options.initialOffsetY),g=c.options.maxX,h=c.options.maxY,d.x>e&&(d.x=e),d.y>f&&(d.y=f),d.y<-h&&(d.y=-h),d.x<-g&&(d.x=-g),c.currentPosition=d,c.moveDom.css(b.transform3d?{transform:"translate3d("+d.x+"px,"+d.y+"px,0px)"}:{transform:"translate("+d.x+"px,"+d.y+"px)"})}},i.prototype._momentum=function(a,b,c,d){var e=6e-4,f=Math.abs(a)/b,g=f*f/(2*e),h=0;return a>0&&g>c?(f=f*c/g,g=c):0>a&&g>d&&(f=f*d/g,g=d),g*=0>a?-1:1,h=f/e,{dist:Math.round(g),time:Math.round(h)}},i.prototype._setItemContainerStyle=function(a){var b=this;a&&b.moveDom.css(a)},i.prototype._getTranslate=function(a,c,d){var a=a||"0",c=c||"0",d=d||"0";return b.transform3d?"translate3d("+a+"px, "+c+"px, "+d+"px)":"translate("+a+"px, "+c+"px)"},i.prototype.scrollTo=function(a,c,d){var e=this;e.currentX=a,e.currentY=c,e.currentPosition.x=a,e.currentPosition.y=c,b.transform3d?e._setItemContainerStyle({transform:e._getTranslate(e.currentX,e.currentY,0),transition:b.getCSSVal("transform")+" "+d+"ms ease"}):e.itemContainerDom.animate({position:"relative",left:a+"px",top:c+"px"},d)},i.prototype._setTransition=function(a){var c=this;c._setItemContainerStyle(a?{transition:b.getCSSVal("transform")+" "+c.options.crossEffectTime+"ms ease"}:{transition:""})},window.ImagePan=i,i});