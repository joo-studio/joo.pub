// JavaScript Document
$(function(){
if(typeof(Worker) == "undefined"){window.location = "noHtml5.html";}

$("body").append("<div class='la-anim-1'></div>");
/*setTimeout(function(){$(".la-anim-1").addClass("la-animate");},100);
setTimeout(function(){$(".wrapper").css("opacity",1)},2100);*/

$(".wrapper").css("opacity",1);

//选项卡切换
jQuery(function(){jQuery(".clickTag .chgBtn").click(function(){jQuery(this).parent().find(".chgBtn").removeClass("chgCutBtn");jQuery(this).addClass("chgCutBtn");var cutNum=jQuery(this).parent().find(".chgBtn").index(this);jQuery(this).parents(".clickTag").find(".chgCon").eq(cutNum).show().siblings(".chgCon").hide();jQuery(this).parents(".clickTag").find(".chgCon").eq(cutNum).addClass('zoomIn animated');})})

jQuery(function(){jQuery(".hoverTag .chgBtn").hover(function(){jQuery(this).parent().find(".chgBtn").removeClass("chgCutBtn");jQuery(this).addClass("chgCutBtn");var cutNum=jQuery(this).parent().find(".chgBtn").index(this);jQuery(this).parents(".hoverTag").find(".chgCon").eq(cutNum).show().siblings(".chgCon").hide();jQuery(this).parents(".hoverTag").find(".chgCon").eq(cutNum).addClass('zoomIn animated');})})

$(".mchg_dl dt").click(function(){
	$(".mchg_dl").removeClass('mchg_cutdl');
	$(this).parents('.mchg_dl').addClass('mchg_cutdl');
	$(this).next("dd").addClass("bounceInLeft animated");
});
	
})