/**
 * flippage
 * window.estart;
 * window.emove;
 * flippage.showPage(index) 显示某页
 * flippage.disableFlipPage() 禁用翻屏
 * flippage.enableFlipPage() 启用翻屏
 * flippage.setFlipPageMode(mode) 0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页
 * $(".page").eq(index).on("current") 监听某页面显示
 * $(".page").eq(index).on("active") 监听某页面运动中
 * $(".page").eq(index).on("hide") 监听某页面隐藏
 */
var Flippage = function(main) {
    console.log("app init");
    this._$app = main; //a
    this._$pages = this._$app.find(".page");
    this.$currentPage = this._$pages.eq(0);
    this._isFirstShowPage = true;
    this._isInitComplete = false;
    this._isDisableFlipPage = false;
    this._isDisableFlipPrevPage = false;
    this._isDisableFlipNextPage = false;
    var that = this,
        W = $(window);
    (function() {
        W.on("scroll.elasticity", function(event) {
            event.preventDefault();
        }).on("touchmove.elasticity", function(event) {
            event.preventDefault();
        }).on("doubleTap", function(event) {
            event.preventDefault();
        }).on("mousemove", "img", function(event) {
            event.preventDefault();
        });
    })();
    W.on("load", function() {
        var current = null,
            next = null,
            isLoop = true,
            pageX = 0,
            pageY = 0,
            moveX = 0,
            moveY = 0,
            moving = false,
            moveUp = false,
            touchStart = true; // l
        that._$app.on("mousedown touchstart", function(event) {
            window.estart = event;
            if (!that._isDisableFlipPage) {
                current = that._$pages.filter(".z-current").get(0);
                next = null;
                if (current) {
                    moving = true;
                    moveUp = false;
                    touchStart = true;
                    moveX = 0;
                    moveY = 0;

                    if ("mousedown" == event.type) {
                        pageX = event.pageX;
                        pageY = event.pageY;
                    } else {
                        pageX = event.touches[0].pageX;
                        pageY = event.touches[0].pageY;
                    }
                    current.classList.add("z-move");
                    current.style.webkitTransition = "none";
                }
            }
        });
        that._$app.on("mousemove touchmove", function(event) {
            window.emove = event;

            if (moving && (next || touchStart)) {
                if ("mousemove" == event.type) {
                    moveX = event.pageX - pageX;
                    moveY = event.pageY - pageY;
                } else {
                    moveX = event.touches[0].pageX - pageX;
                    moveY = event.touches[0].pageY - pageY;
                }

                if (Math.abs(moveY) > Math.abs(moveX)) {
                    if (moveY > 0) {
                        if (that._isDisableFlipPrevPage) {
                            return;
                        }
                        if (moveUp || touchStart) {
                            moveUp = false;
                            touchStart = false;
                            if (next) {
                                next.classList.remove("z-active");
                                next.classList.remove("z-move");
                            }

                            if (current.previousElementSibling && current.previousElementSibling.classList.contains("page")) {
                                next = current.previousElementSibling;
                            } else {
                                if (isLoop) {
                                    next = that._$pages.last().get(0);
                                } else {
                                    next = false;
                                }
                            }
                            if (next) {
                                if (next.classList.contains("page")) {
                                    next.classList.add("z-active");
                                    next.classList.add("z-move");
                                    next.style.webkitTransition = "none";
                                    next.style.webkitTransform = "translateY(-100%)";
                                    $(next).trigger("active");
                                    current.style.webkitTransformOrigin = "bottom center";
                                } else {
                                    current.style.webkitTransform = "translateY(0px)";
                                    next = null;
                                }
                            }
                        } else {
                            current.style.webkitTransform = "translateY(" + moveY + "px)";
                            next.style.webkitTransform = "translateY(-" + (window.innerHeight - moveY) + "px)";
                        }
                    } else if (0 > moveY) {
                        if (that._isDisableFlipNextPage) {
                            return;
                        }
                        if (!moveUp || touchStart) {
                            moveUp = true;
                            touchStart = false;
                            if (next) {
                                next.classList.remove("z-active");
                                next.classList.remove("z-move");
                            }
                            if (current.nextElementSibling && current.nextElementSibling.classList.contains("page")) {
                                next = current.nextElementSibling;
                            } else {
                                next = that._$pages.first().get(0);
                                isLoop = true;
                            }
                            if (next && next.classList.contains("page")) {
                                next.classList.add("z-active");
                                next.classList.add("z-move");
                                next.style.webkitTransition = "none";
                                next.style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                                $(next).trigger("active");
                                current.style.webkitTransformOrigin = "top center";
                            } else {
                                current.style.webkitTransform = "translateY(0px)";
                                next = null;
                            }
                        } else {
                            current.style.webkitTransform = "translateY(" + moveY + "px)";
                            next.style.webkitTransform = "translateY(" + (window.innerHeight + moveY) + "px)";
                        }
                    }
                }
            }

        });
        that._$app.on("mouseup touchend", function() {
            if (moving) {
                moving = false;
                if (next) {
                    that._isDisableFlipPage = true;
                    current.style.webkitTransition = "-webkit-transform 0.3s ease-out";
                    next.style.webkitTransition = "-webkit-transform 0.3s ease-out";
                    if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 100) {
                        if (moveUp) {
                            current.style.webkitTransform = "translateY(-" + window.innerHeight + "px)";
                            next.style.webkitTransform = "translateY(0px)";
                        } else {
                            current.style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                            next.style.webkitTransform = "translateY(0px)";
                        }
                        setTimeout(function() {
                            next.classList.remove("z-active");
                            next.classList.remove("z-move");
                            next.classList.add("z-current");
                            current.classList.remove("z-current");
                            current.classList.remove("z-move");
                            that._isDisableFlipPage = false;
                            $(current).trigger("hide");
                            that.$currentPage = $(next).trigger("current");
                        }, 500);
                    } else {
                        if (moveUp) {
                            current.style.webkitTransform = "translateY(0px)";
                            next.style.webkitTransform = "translateY(100%)";
                        } else {
                            current.style.webkitTransform = "translateY(0px)";
                            next.style.webkitTransform = "translateY(-100%)";
                        }
                        setTimeout(function() {
                            $(current).trigger("current");
                            next.classList.remove("z-active");
                            next.classList.remove("z-move");
                            that._isDisableFlipPage = false;
                        }, 500);
                    }
                } else {
                    current.classList.remove("z-move");
                    that._isDisableFlipPage = false;
                }
            }
        });
    });
};
Flippage.prototype.showPage = function(index,notrans) {
    var that = this;
    var moving;
    if (!window._app_showPage) {
        window._app_showPage = function(index,notrans) {
            var next, current, type = typeof index;
            switch (type) {
                case "number":
                    next = this._$pages.eq(index);
                    break;
                case "string":
                    next = this._$pages.filter(index).first();
                    break;
                case "object":
                    next = $(index);
            }
            if (this._isFirstShowPage && !(next && next.length)) {
                next = this.$currentPage;
                this._$pages.filter(".z-current").removeClass("z-current");
                next.css("-webkit-transform", "none").addClass("z-current");
                next.trigger("current");
                this._isFirstShowPage = false;

            } else if (next && next.length && next.attr("notrans") !== null || notrans) {

                this._$pages.filter(".z-current").removeClass("z-current").trigger("hide");
                next.css("-webkit-transform", "none").addClass("z-current");
                this.$currentPage = next.trigger("current");

            } else if (next && next.length && !notrans) {

                if (moving) {
                    return false;
                }
                moving = true;
                current = this._$pages.filter(".z-current");
                currentIndex = current.index();
                next.addClass("z-active");
                next[0].style.webkitTransition = "-webkit-transform 0.3s ease-out";
                current[0].style.webkitTransition = "-webkit-transform 0.3s ease-out";

                if (index > currentIndex) {

                    next[0].style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                    current[0].style.webkitTransform = "translateY(0px)";

                    setTimeout(function() {
                        next[0].style.webkitTransform = "translateY(0px)";
                        current[0].style.webkitTransform = "translateY(-" + window.innerHeight + "px)";
                    }, 100);

                    setTimeout(function() {
                        next.removeClass("z-active");
                        next.addClass("z-current");
                        current.removeClass("z-current");
                        current.trigger("hide");
                        this.$currentPage = next.trigger("current");
                        moving = false;
                    }, 500);

                } else if (index < currentIndex) {

                    next[0].style.webkitTransform = "translateY(-" + window.innerHeight + "px)";
                    current[0].style.webkitTransform = "translateY(0px)";

                    setTimeout(function() {
                        next[0].style.webkitTransform = "translateY(0px)";
                        current[0].style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                    }, 100);

                    setTimeout(function() {
                        next.removeClass("z-active");
                        next.addClass("z-current");
                        current.removeClass("z-current");
                        current.trigger("hide");
                        this.$currentPage = next.trigger("current");
                        moving = false;
                    }, 500);

                }
            }
        };
    }
    if (this._isInitComplete) {
        window._app_showPage.apply(that, [index,notrans]);
    } else {
        $(window).one("load", function() {
            window._app_showPage.apply(that, [index,notrans]);
        });
    }
};
Flippage.prototype.disableFlipPage = function() {
    this._isDisableFlipPage = true;
};
Flippage.prototype.enableFlipPage = function() {
    this._isDisableFlipPage = false;
};
Flippage.prototype.setFlipPageMode = function(mode) {
    if ("number" != typeof mode || 0 > mode || mode > 3) throw "App.setFlipPageMode 方法调用错误：请提供以下正确的参数（0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页）";
    switch (mode) {
        case 0:
            this._isDisableFlipPage = true;
            this._isDisableFlipPrevPage = true;
            this._isDisableFlipNextPage = true;
            break;
        case 1:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = false;
            this._isDisableFlipNextPage = false;
            break;
        case 2:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = false;
            this._isDisableFlipNextPage = true;
            break;
        case 3:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = true;
            this._isDisableFlipNextPage = false;
    }
};