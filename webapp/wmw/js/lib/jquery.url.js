/**
* h5player v0.0.1 by yangyin 
* Copyright 2014 yangyin@mcitech.cn http://weibo.com/nodersolar
*/
!function(a){"function"==typeof define&&define.amd?"undefined"!=typeof jQuery?define(["jquery"],a):define([],a):"undefined"!=typeof jQuery?a(jQuery):a()}(function(a,b){function c(a,b){for(var c=decodeURI(a),d=r[b?"strict":"loose"].exec(c),e={attr:{},param:{},seg:{}},f=14;f--;)e.attr[p[f]]=d[f]||"";return e.param.query=h(e.attr.query),e.param.fragment=h(e.attr.fragment),e.seg.path=e.attr.path.replace(/^\/+|\/+$/g,"").split("/"),e.seg.fragment=e.attr.fragment.replace(/^\/+|\/+$/g,"").split("/"),e.attr.base=e.attr.host?(e.attr.protocol?e.attr.protocol+"://"+e.attr.host:e.attr.host)+(e.attr.port?":"+e.attr.port:""):"",e}function d(a){var b=a.tagName;return"undefined"!=typeof b?o[b.toLowerCase()]:b}function e(a,b){if(0==a[b].length)return a[b]={};var c={};for(var d in a[b])c[d]=a[b][d];return a[b]=c,c}function f(a,b,c,d){var g=a.shift();if(g){var h=b[c]=b[c]||[];"]"==g?l(h)?""!=d&&h.push(d):"object"==typeof h?h[m(h).length]=d:h=b[c]=[b[c],d]:~g.indexOf("]")?(g=g.substr(0,g.length-1),!s.test(g)&&l(h)&&(h=e(b,c)),f(a,h,g,d)):(!s.test(g)&&l(h)&&(h=e(b,c)),f(a,h,g,d))}else l(b[c])?b[c].push(d):b[c]="object"==typeof b[c]?d:"undefined"==typeof b[c]?d:[b[c],d]}function g(a,b,c){if(~b.indexOf("]")){{var d=b.split("[");d.length}f(d,a,"base",c)}else{if(!s.test(b)&&l(a.base)){var e={};for(var g in a.base)e[g]=a.base[g];a.base=e}i(a.base,b,c)}return a}function h(a){return k(String(a).split(/&|;/),function(a,b){try{b=decodeURIComponent(b.replace(/\+/g," "))}catch(c){}var d=b.indexOf("="),e=j(b),f=b.substr(0,e||d),h=b.substr(e||d,b.length),h=h.substr(h.indexOf("=")+1,h.length);return""==f&&(f=b,h=""),g(a,f,h)},{base:{}}).base}function i(a,c,d){var e=a[c];b===e?a[c]=d:l(e)?e.push(d):a[c]=[e,d]}function j(a){for(var b,c,d=a.length,e=0;d>e;++e)if(c=a[e],"]"==c&&(b=!1),"["==c&&(b=!0),"="==c&&!b)return e}function k(a,c){for(var d=0,e=a.length>>0,f=arguments[2];e>d;)d in a&&(f=c.call(b,f,a[d],d,a)),++d;return f}function l(a){return"[object Array]"===Object.prototype.toString.call(a)}function m(a){var b=[];for(prop in a)a.hasOwnProperty(prop)&&b.push(prop);return b}function n(a,d){return 1===arguments.length&&a===!0&&(d=!0,a=b),d=d||!1,a=a||window.location.toString(),{data:c(a,d),attr:function(a){return a=q[a]||a,"undefined"!=typeof a?this.data.attr[a]:this.data.attr},param:function(a){return"undefined"!=typeof a?this.data.param.query[a]:this.data.param.query},fparam:function(a){return"undefined"!=typeof a?this.data.param.fragment[a]:this.data.param.fragment},segment:function(a){return"undefined"==typeof a?this.data.seg.path:(a=0>a?this.data.seg.path.length+a:a-1,this.data.seg.path[a])},fsegment:function(a){return"undefined"==typeof a?this.data.seg.fragment:(a=0>a?this.data.seg.fragment.length+a:a-1,this.data.seg.fragment[a])}}}var o={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},p=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],q={anchor:"fragment"},r={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},s=(Object.prototype.toString,/^[0-9]+$/);"undefined"!=typeof a?(a.fn.url=function(b){var c="";return this.length&&(c=a(this).attr(d(this[0]))||""),n(c,b)},a.url=n):window.purl=n});