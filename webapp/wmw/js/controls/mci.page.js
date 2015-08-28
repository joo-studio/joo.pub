/**
* h5player v0.0.1 by yangyin 
* Copyright 2014 yangyin@mcitech.cn http://weibo.com/nodersolar
*/
!function(a){"function"==typeof define&&define.amd?define("mci.page",["jquery","mci.support"],a):a(jQuery,Support)}(function(a,b){"use strict";function c(a,b){return this instanceof c?this.init(a,b):new c(a,b)}function d(a,b){return window.navigator.msPointerEnabled?a[b]:l.touch?a.changedTouches[0][b]:a[b]}function e(a,b,c){var d=k[b];d?a[d]=c:void 0!==a[b]?(k[b]=b,a[b]=c):h(j,function(d){var e=g(d)+g(b);return void 0!==a[e]?(k[b]=e,a[e]=c,!0):void 0})}function f(a){if(void 0!==i.style[a])return a;var b;return h(j,function(c){var d=g(c)+g(a);return void 0!==i.style[d]?(b="-"+c+"-"+a,!0):void 0}),b}function g(a){return a.charAt(0).toUpperCase()+a.substr(1)}function h(a,b){for(var c=0,d=a.length;d>c;c++)if(b(a[c],c))return!0;return!1}var i=document.createElement("div"),j=["webkit","moz","o","ms"],k={},l={};l.transform3d=b.transform3d,l.transform=b.transform,l.transition=b.transition,l.touch=b.touch,l.cssAnimation=(b.transform3d||b.transform)&&b.transition;var m=b.touchStartEvent,n=b.touchMoveEvent,o=b.touchEndEvent,p=b.mouseOut;return c.prototype._enablePageAnimation=function(a){var b=this,c="0ms";1==a&&(c="350ms"),l.cssAnimation?b._setStyle({transitionDuration:c}):b.animation=a},c.prototype.init=function(b,c){var d=this;if(d.element=b,d.dom=a(b),"string"==typeof b&&(d.element=document.querySelector(b)),!d.element)throw new Error("element not found");return c=c||{},d.distance=void 0===c.distance?null:c.distance,d.sectionDistance=c.sectionDistance||"1024",d.maxPage=void 0===c.maxPage?null:c.maxPage-1,d.disableTouch=void 0===c.disableTouch?!1:c.disableTouch,d.disable3d=void 0===c.disable3d?!1:c.disable3d,d.itemCls=c.itemCls||".mpage-c",d.sectionContainer=c.sectionConCls||"section.item",d.sectionCls=c.sectionCls||"article",d.itemCount=c.itemCount||4,d.pageChanged=c.pageChanged||null,d.pageChanging=c.pageChanging||null,d.sectionChanged=c.sectionChanged,d.syncMoving=c.syncMoving,d.syncMoveEnd=c.syncMoveEnd,d.secFlowAttr=c.secFlowAttr||"flow",d.currentItemIndex=0,d.currentPage=0,d.currentSection=0,d.currentX=0,d.currentY=0,d.directionX=0,d.directionY=0,d.animation=!1,d.use3d=l.transform3d,d.disable3d===!0&&(d.use3d=!1),l.cssAnimation?(d._setStyle({transitionProperty:f("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:d._getTranslate(0)}),d._setSectionContainerStyle({transitionProperty:f("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:d._getTranslate(0)})):(d._setStyle({position:"relative",left:"0px"}),d._setStyle({position:"relative",top:"0px"})),d.element.addEventListener(m,d,!1),d.element.addEventListener(n,d,!1),d.element.addEventListener(o,d,!1),l.touch||d.element.addEventListener(p,d,!1),a(d.element).on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd",function(){if(null!=d.changeEvent){var a=d.changeEvent;d.changeEvent=null,d._pageChangedHanlder(a)}}),d},c.prototype.handleEvent=function(a){var b=this;switch(a.type){case m:b._touchStart(a);break;case n:b._touchMove(a);break;case o:b._touchEnd(a);break;case p:b._touchEnd(a);break;case"click":b._click(a);break;case"changeEvent":}},c.prototype.refresh=function(){},c.prototype._setSectionContainerStyle=function(a){var b=this;if(a){var c=b.dom.find(b.itemCls).eq(b.currentItemIndex).find(b.sectionContainer);if(c.length>0){var d=c[0].style;for(var f in a)e(d,f,a[f])}}},c.prototype.hasNext=function(){var a=this;return a.currentPage<a.maxPage},c.prototype.hasPrev=function(){var a=this;return a.currentPage>0},c.prototype.toNext=function(){var a=this;a.hasNext()&&a.goToPage(a.currentPage+1)},c.prototype.toPrev=function(){var a=this;a.hasPrev()&&a.goToPage(a.currentPage-1)},c.prototype.pageChanged=null,c.prototype.goToPage=function(b,c){var d=this,e=d.currentPage,f=0;if(void 0===b&&(b=d.currentPage),0>=b?(d.currentPage=0,b=0):b>=d.maxPage?b=d.currentPage=d.maxPage:d.currentPage=parseInt(b,10),d._enablePageAnimation(!0),b>e?(f=1,d.currentItemIndex++):e>b&&(d.currentItemIndex--,f=-1),d.changeEvent=null,void 0!=b&&e!=b){var g={};g.oldPage=e,g.newPage=b,g.itemIndex=d.currentItemIndex,g.jumpToSection=c,b>e?d.directionX=1:e>b&&(d.directionX=-1),g.direction=d.directionX,d.changeEvent=g}if(d._setX(-d.currentItemIndex*d.distance),a.isFunction(d.syncMoveEnd)){var h={};h.pageIndex=d.currentPage,h.sectionIndex=d.currentSection,h.from=e,h.to=b,h.incre=f,h.slideDirection=-1,d.syncMoveEnd(h)}},c.prototype.jumpToPage=function(b,c){var d=this;if(b==d.currentPage)return void(void 0!=typeof c&&d.goToSection(c));if(b==d.currentPage+1||b==d.currentPage-1)return void d.goToPage(b,c);var e=d.currentPage;void 0===b&&(b=d.currentPage),0>=b?(d.currentPage=0,b=0):b>=d.maxPage?b=d.currentPage=d.maxPage:d.currentPage=parseInt(b,10),d._enablePageAnimation(!0);var f=d.currentItemIndex,g=0;if(b>e?(d.directionX=1,d.currentItemIndex++,g=1):e>b&&(d.currentItemIndex--,d.directionX=-1,g=-1),a.isFunction(d.pageChanging)){var h={fromItemIndex:f,toItemIndex:d.currentItemIndex,toPage:b};h.dom=d.dom.find(d.itemCls).eq(d.currentItemIndex),h.oldPage=e,d.pageChanging(h)}if(void 0!=b&&e!=b){var i={};i.oldPage=e,i.newPage=b,i.itemIndex=d.currentItemIndex,i.direction=d.directionX,i.changedDoms=[],i.isJump=!0,i.jumpToSection=c;for(var j=d.dom.find(d.itemCls),k=0;k<j.length;k++)if(k!=d.currentItemIndex){var l=j.eq(k);l.pageIndex=d.currentPage+(k-d.currentItemIndex),l.oldPageIndex=e+d.directionX+(k-d.currentItemIndex),i.changedDoms.push(l)}d.changeEvent=i}if(d._setX(-d.currentItemIndex*d.distance),a.isFunction(d.syncMoveEnd)){var m={};m.pageIndex=d.currentPage,m.sectionIndex=d.currentSection,m.from=e,m.to=b,m.incre=g,m.slideDirection=-1,d.syncMoveEnd(m)}},c.prototype._getSectionHeight=function(){var b=this;return window.pageWidth=a(window).width(),window.pageHeight=a(window).height(),b.sectionDistance=window.pageHeight,b.distance=window.pageWidth,window.pageHeight},c.prototype._getPageWidth=function(){var b=this;return window.pageWidth=a(window).width(),window.pageHeight=a(window).height(),b.sectionDistance=window.pageHeight,b.distance=window.pageWidth,window.pageWidth},c.prototype._getSectionCount=function(){var a=this;return a.dom.find(a.itemCls).eq(a.currentItemIndex).find(a.sectionCls).length},c.prototype.goToSection=function(b){var c=this,d=c.dom.find(c.itemCls).eq(c.currentItemIndex).find(c.sectionCls).length,e=c.currentSection;(void 0==b||null==b)&&(b=c.currentSection),0>b?b=c.currentSection=0:b>=d?b=c.currentSection=d-1:c.currentSection=b,l.cssAnimation?c._setSectionContainerStyle({transitionProperty:f("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"450ms"}):c.animation=!0;var g=b,h=c.sectionDistance||c._getSectionHeight();c._setY(-g*h);var i=0;if(e>g?i=-1:g>e&&(i=1),a.isFunction(c.syncMoveEnd)){var j={};j.from=e,j.to=g,j.pageIndex=c.currentPage,j.sectionIndex=c.currentSection,j.incre=i,j.slideDirection=1,c.syncMoveEnd(j)}e!=g&&setTimeout(function(){if(a.isFunction(c.sectionChanged)){var b={from:e,to:g,dom:c.dom.find(c.itemCls).eq(c.currentItemIndex)};b.pageIndex=c.currentPage,c.sectionChanged(b)}},250)},c.prototype._pageChangedHanlder=function(b){var c=this;if(b.changedDoms=b.changedDoms||[],c.currentSection=0,c.currentY=0,b.currentPage=c.currentPage,c._setSectionContainerStyle({transitionProperty:f("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:c._getTranslate(0)}),2==c.currentItemIndex&&c.currentPage+2<=c.maxPage&&b.direction>0){c._enablePageAnimation(!1);var d=c.dom.find(c.itemCls+":first-child"),e=d;e.pageIndex=c.currentPage+2,e.oldPageIndex=c.currentPage-2,b.changedDoms.push(e),e.html("").appendTo(c.dom),c._setX(-c.distance),c.currentItemIndex=1,c.currentX=-c.distance,setTimeout(function(){c._enablePageAnimation(!0)},50)}else if(0==c.currentItemIndex&&c.currentPage-1>=0&&b.direction<0){c._enablePageAnimation(!1);var g=c.dom.find(c.itemCls+":last-child"),h=g;h.pageIndex=c.currentPage-1,h.oldPageIndex=c.currentPage+3,b.changedDoms.push(h),h.html("").insertBefore(c.dom.find(c.itemCls+":first-child")),c._setX(-c.distance),c.currentItemIndex=1,c.currentX=-c.distance,setTimeout(function(){c._enablePageAnimation(!0)},50)}a.isFunction(c.pageChanged)&&c.pageChanged(b),void 0!=typeof b.jumpToSection&&c.goToSection(b.jumpToSection)},c.prototype._setX=function(b){var c=this;c.currentX!=b&&(c.currentX=b,a(c.element).attr("data-offset",b),l.cssAnimation?c.element.style[k.transform]=c._getTranslate(b):c.animation?(c._animate(b),setTimeout(function(){if(null!=c.changeEvent){var a=c.changeEvent;c.changeEvent=null,c._pageChangedHanlder(a)}},360)):(-1==b.toString().indexOf("%")&&(b+="px"),c.element.style.left=b))},c.prototype._setY=function(b){var c=this;if(c.currentY!=b){c.currentY=b;var d=c.dom.find(c.itemCls).eq(c.currentItemIndex).find(c.sectionContainer).get(0);a(d).attr("data-offset",b),d.style[k.transform]=c._getTranslate(0,b)}},c.prototype._touchStart=function(a){var b=this;b.disableTouch||(l.touch||a.preventDefault(),b._setSectionContainerStyle({transitionDuration:"0ms"}),b._enablePageAnimation(!1),b.scrolling=!0,b.moveReady=!1,b.startPageX=d(a,"pageX"),b.startPageY=d(a,"pageY"),b.basePageX=b.startPageX,b.basePageY=b.startPageY,b.direction=0,b.directionX=0,b.directionY=0,b.startTime=a.timeStamp,b.currentY=-b.currentSection*b._getSectionHeight(),b.currentX=-b.currentItemIndex*b._getPageWidth())},c.prototype._touchMove=function(b){var c=this;if(c.scrolling){var e,f,g,h,i,j,k=d(b,"pageX"),l=d(b,"pageY");if(i=Math.abs(k-c.startPageX),j=Math.abs(l-c.startPageY),c.moveReady&&0!=c.direction){if(b.preventDefault(),b.stopPropagation(),e=k-c.basePageX,f=l-c.basePageY,-1===c.direction){var m=c.currentX;if(g=c.currentX+e,c.directionX=0===e?c.directionX:e>0?-1:1,(c.currentPage==c.maxPage&&c.directionX>0||0==c.currentPage&&c.directionX<0)&&(g=c.currentX+e/4),c._setX(g),a.isFunction(c.syncMoving)){var n={};n.dist=g-m,n.slideDirection=-1,n.direction=0,n.pageIndex=c.currentPage,n.sectionIndex=c.currentSection,n.from=c.currentPage,n.to=c.currentPage;var o=Math.abs(c.currentItemIndex*c.distance);o>Math.abs(g)?(n.to=c.currentPage-1,n.to<0&&(n.to=0)):o<Math.abs(g)&&(n.to=c.currentPage+1,n.to>c.maxPage&&(n.to=c.maxPage),g>0&&(n.to=0)),n.to>n.from?n.direction=1:n.to<n.from&&(n.direction=-1),c.syncMoving(n)}}else if(1===c.direction){var p=c.currentY;h=c.currentY+f,c.directionY=0===f?c.directionY:f>0?-1:1;var q=c._getSectionCount()-1;if((c.currentSection==q&&c.directionY>0||0==c.currentSection&&c.directionY<0)&&(h=c.currentY+f/4),c._setY(h),a.isFunction(c.syncMoving)){var n={};n.dist=h-p,n.slideDirection=1,n.direction=0,n.pageIndex=c.currentPage,n.sectionIndex=c.currentSection,n.from=c.currentSection,n.to=c.currentSection;var o=Math.abs(c.currentSection*c.sectionDistance);o>Math.abs(h)?(n.to=c.currentSection-1,n.to<0&&(n.to=0)):o<Math.abs(h)&&(n.to=c.currentSection+1,n.to>q&&(n.to=q),h>0&&(n.to=0)),n.to>n.from?n.direction=1:n.to<n.from&&(n.direction=-1),c.syncMoving(n)}}}else(i>5||j>5)&&(c._canMoved(k-c.basePageX,l-c.basePageY,b)===!0?(b.preventDefault(),b.stopPropagation(),c.moveReady=!0,c.element.addEventListener("click",c,!0)):c.direction=0);c.basePageX=k,c.basePageY=l}},c.prototype._canMoved=function(c,d,e){var f=this,g=0;if(g=Math.abs(d)>Math.abs(c)?1:-1,1==g){if(f.direction=1,b.touch){var h=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i=parseInt(a(document).height()),j=parseInt(a(window).height()),k=!0;if(a(document).scrollTop()<=0&&d>0&&(k=!1),0>d&&h>=i-j&&(k=!1),0>d&&parseInt(a(document).scrollTop())-d>=i-j&&(k=!1),a(document).scrollTop()-d<=0&&d>0&&(k=!1),k)return!1}var l=f._getSectionCount()-1;if(0>d&&f.currentSection<l)return f.direction=1,!0;if(d>0&&f.currentSection>0)return f.direction=1,!0}else{if(0>c&&f.currentPage<f.maxPage){if(1!=f.direction)return f.direction=-1,!0}else if(c>0&&f.currentPage>0&&1!=f.direction)return f.direction=-1,!0;0>c&&f.currentPage==f.maxPage&&e.stopPropagation(),c>0&&0==f.currentPage&&e.stopPropagation()}return!1},c.prototype._touchEnd=function(a){var b=this;if(b.scrolling){if(b.scrolling=!1,b.direction>0){var c=b.dom.find(b.itemCls).eq(b.currentItemIndex).find(b.sectionContainer).attr(b.secFlowAttr);if("1"==c){var d=b.sectionDistance-b.dom.find(b.itemCls).eq(b.currentItemIndex).find(b.sectionContainer).innerHeight();return b._setSectionContainerStyle({transitionDuration:"350ms"}),void(b.currentY>0?b._setY(0):b.currentY<=d&&b._setY(d))}var e=0,e=b.basePageY-b.startPageY;b.directionY=e>0?-1:1,b.goToSection(Math.abs(e)<100?b.currentSection:b.currentSection+1*b.directionY),Math.abs(f)>0&&(a.preventDefault(),a.stopPropagation())}else if(b.direction<0){var f=b.basePageX-b.startPageX;b.directionX=f>0?-1:1,b.goToPage(Math.abs(f)<100?b.currentPage:b.currentPage+1*b.directionX),Math.abs(e)>0&&(a.preventDefault(),a.stopPropagation())}setTimeout(function(){b.element.removeEventListener("click",b,!0)},200)}},c.prototype._click=function(a){a.stopPropagation(),a.preventDefault()},c.prototype._setStyle=function(a){var b=this,c=b.element.style;for(var d in a)e(c,d,a[d])},c.prototype._animate=function(a){var b=this,c=b.element,d=+new Date,e=parseInt(c.style.left,10),f=a,g=350,h=function(a,b){return-(a/=b)*(a-2)},i=setInterval(function(){var a,b,j=new Date-d;j>g?(clearInterval(i),b=f):(a=h(j,g),b=a*(f-e)+e),c.style.left=b+"px"},10)},c.prototype.destroy=function(){var a=this;a.element.removeEventListener(m,a),a.element.removeEventListener(n,a),a.element.removeEventListener(o,a)},c.prototype._getTranslate=function(a,b,c){var d=this,a=a||"0",b=b||"0",c=c||"0";return-1==b.toString().indexOf("%")&&(b+="px"),-1==a.toString().indexOf("%")&&(a+="px"),d.use3d?"translate3d("+a+", "+b+", "+c+"px)":"translate("+a+", "+b+")"},c.prototype._resizeView=function(){var b=this,c=b.sectionDistance,d=b.distance;window.pageWidth=a(window).width(),window.pageHeight=a(window).height(),b.sectionDistance=window.pageHeight,b.distance=window.pageWidth,b._setSectionContainerStyle({transitionDuration:"0ms"}),b._enablePageAnimation(!1);var e=a(b.element).attr("data-offset");e&&0/0!=e||(e=0),b._setX(b.distance*e/d);for(var f=b.dom.find(b.itemCls),g=0;g<f.length;g++)if(g==b.currentItemIndex){var h=f.eq(b.currentItemIndex).find(b.sectionContainer).attr("data-offset");h&&0/0!=h||(h=0),b._setY(b.sectionDistance*h/c)}else b.dom.find(b.itemCls).eq(g).find(b.sectionContainer).css({transform:b._getTranslate(0,0,0)})},window.Mcipage=c,c});