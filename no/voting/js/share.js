$(document).ready(function() {
    $(".share").on("click", function() {
        $(".bg").show();
        $(".share_img").show();
    });
    $(".bg").on("click", function() {
        $(this).hide();
        $(".share_img").hide();
    });
});
