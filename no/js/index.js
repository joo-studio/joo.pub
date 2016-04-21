window.onload = function() {
    var myscroll;

    function loaded() {
        myscroll = new IScroll("#iscroll", {
            mouseWheel: true

        });
    }
    loaded();
    $("#iscroll").on("touchstart", function(event) {
        if (event.target.tagName === 'A') {
            return;
        } else {
            event.stopPropagation();
        }
        mySwiper.detachEvents();
    });
    
   
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        pagination: '.swiper-pagination',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        onInit: function(swiper) { 
        },
        onSlideChangeEnd: function(swiper) {  
        },
        onTransitionEnd: function(swiper) {
        },
        watchSlidesProgress: true,
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides[i];
                var progress = slide.progress;
                var translate = progress * swiper.height / 4;
                scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
                var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
                slide.style.opacity = opacity;
                es = slide.style;
                es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';
            }
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                es = swiper.slides[i].style;
                es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

            }
        },
    });
    $(".name_list .title").on("touchstart", function(event) {
       mySwiper.attachEvents();
    });
}
