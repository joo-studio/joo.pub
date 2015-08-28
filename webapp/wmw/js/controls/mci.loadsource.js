/**
* h5player v0.0.1 by yangyin 
* Copyright 2014 yangyin@mcitech.cn http://weibo.com/nodersolar
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.fn.loadSources=function(b){var c=(a(this),a(this).find("img")),d=c.length,e=0,f=0,g=a.Deferred();return a(c).each(function(){var c=a(this);1==c[0].complete?(e++,b(e,d),e+f>=d&&g.resolve()):(c.load(function(){e++,b(e,d),e+f>=d&&g.resolve()}),c.error(function(){f++,b(e,d),e+f>=d&&g.resolve()}))}),0==d&&setTimeout(function(){g.resolve()},10),g}});