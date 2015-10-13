$(function() {
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
});