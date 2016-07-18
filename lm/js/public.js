// JavaScript Document
$(function() {
        if (typeof(Worker) == "undefined") { window.location = "noHtml5.html"; }

        $("body").append("<div class='la-anim-1'></div>");
        setTimeout(function() { $(".la-anim-1").addClass("la-animate"); }, 100);
        setTimeout(function() { $(".wrapper").css("opacity", 1) }, 300);

        //$(".wrapper").css("opacity",1);

        //选项卡切换
        jQuery(function() { jQuery(".clickTag .chgBtn").click(function() { jQuery(this).parent().find(".chgBtn").removeClass("chgCutBtn");
                jQuery(this).addClass("chgCutBtn");
                var cutNum = jQuery(this).parent().find(".chgBtn").index(this);
                jQuery(this).parents(".clickTag").find(".chgCon").eq(cutNum).show().siblings(".chgCon").hide();
                jQuery(this).parents(".clickTag").find(".chgCon").eq(cutNum).addClass('fadeIn animated'); }) })

        jQuery(function() { jQuery(".hoverTag .chgBtn").hover(function() { jQuery(this).parent().find(".chgBtn").removeClass("chgCutBtn");
                jQuery(this).addClass("chgCutBtn");
                var cutNum = jQuery(this).parent().find(".chgBtn").index(this);
                jQuery(this).parents(".hoverTag").find(".chgCon").eq(cutNum).show().siblings(".chgCon").hide();
                jQuery(this).parents(".hoverTag").find(".chgCon").eq(cutNum).addClass('fadeIn animated'); }) })

        $(".mchg_dl dt").click(function() {
            $(".mchg_dl").removeClass('mchg_cutdl');
            $(this).parents('.mchg_dl').addClass('mchg_cutdl');
            $(this).next("dd").addClass("bounceInLeft animated");
        });

    })
    // gotop
backTop = function(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
        }, 10);
    };

    function set() { btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none" }
};
backTop('gotop');
