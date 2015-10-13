document.body.addEventListener('touchstart', function () { }); 
$(function(){
    if($(window).height() < 600){
        $(".small-foot").css({
            position: 'relative'
        });
    }
    $(".header-top .sec-right li.common-num").mouseenter(function() {
        $(".two-status .username").css("border-right","1px solid #fafafb");
    }).mouseleave(function() {
        $(".two-status .username").css("border-right","1px solid #dad8dd");
    });
   $(".dropdown-toggle",".header-top").on("click",function(){
        return false;
    });
    $(".username").on("click",function(){
        return false;
    });
    var topNav = $(".top-nav");
    $(".header-heima .navbar-toggle").on("click",function(){
        var rightContent = $(".header-container-wrap");
        var navWidth = topNav.width();
      if(topNav.hasClass('navshow')){
        topNav.removeClass('navshow');
        topNav.animate({
            left: 0-navWidth
            },300
        );
        rightContent.animate({
            left: 0
            },300
        );
      }else{
        topNav.addClass('navshow');
        topNav.animate({
            left: 0
            },300
        );
        rightContent.animate({
            left: navWidth
            },300
        );
      }
    });

     $(window).on("scroll", function() {
        if ($(window).scrollTop() > 1) {
            $(".ihm-warp").addClass("topnone");
        } else {
            $(".ihm-warp").removeClass("topnone");
        }
    });
    $(".article-tip").hover(function() {
        $(this).next('.tips-warp').fadeIn('slow');
    });
    $(document).click(function(){
        $(".tips-warp").fadeOut('fast');
    });
    $(".article-tip").click(function() {
        // $(this).find(".tips-warp").fadeIn('slow');
        return false;
    });
     backTop=function (btnId){
    var btn=document.getElementById(btnId);
    var d=document.documentElement;
    var b=document.body;
    window.onscroll=set;
    btn.onclick=function (){
        btn.style.display="none";
        window.onscroll=null;
        this.timer=setInterval(function(){
            d.scrollTop-=Math.ceil((d.scrollTop+b.scrollTop)*0.1);
            b.scrollTop-=Math.ceil((d.scrollTop+b.scrollTop)*0.1);
            if((d.scrollTop+b.scrollTop)==0) clearInterval(btn.timer,window.onscroll=set);
        },10);
    };
    function set(){btn.style.display=(d.scrollTop+b.scrollTop>100)?'block':"none"}
    };
    backTop('w-gotop');
});