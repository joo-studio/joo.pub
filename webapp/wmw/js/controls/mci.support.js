/**
* h5player v0.0.1 by yangyin 
* Copyright 2014 yangyin@mcitech.cn http://weibo.com/nodersolar
*/
!function(a){"function"==typeof define&&define.amd?define("mci.support",["jquery"],a):a(jQuery)}(function(){"use strict";function a(a){return d(a,function(a){return void 0!==e.style[a]})}function b(a){if(void 0!==e.style[a])return a;var b;return d(f,function(d){var f=c(d)+c(a);return void 0!==e.style[f]?(b="-"+d+"-"+a,!0):void 0}),b}function c(a){return a.charAt(0).toUpperCase()+a.substr(1)}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(b(a[c],c))return!0;return!1}var e=document.createElement("div"),f=["webkit","moz","o","ms"],g={};return g.transform3d=a(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),g.transform=a(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]),g.transition=a(["transitionProperty","WebkitTransitionProperty","MozTransitionProperty","OTransitionProperty","msTransitionProperty"]),g.touch="ontouchstart"in window,g.cssAnimation=(g.transform3d||g.transform)&&g.transition,g.touchStartEvent=g.touch?"touchstart":"mousedown",g.touchMoveEvent=g.touch?"touchmove":"mousemove",g.touchEndEvent=g.touch?"touchend":"mouseup",g.mouseOut="mouseout",window.navigator.msPointerEnabled&&(g.touchStartEvent="MSPointerDown",g.touchMoveEvent="MSPointerMove",g.touchEndEvent="MSPointerUp",g.mouseOut="MSPointerOut"),g.getCSSVal=b,window.Support=g,g});