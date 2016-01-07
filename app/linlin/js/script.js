var flippage;

var loginType; // 作为创始人登陆，还是作为投票人登陆
var loginCallback; // 登陆回调
var  myiScroll_list;
var myScrollPic;
var mineiScroll_list;
myiScroll_list = new IScroll('#iscroll_list',{
    mouseWheel: true,
    click: true
});
if(/MicroMessenger/.test(navigator.userAgent)) {
    init();
    wx.ready(function(){
        playbgm();
        loader();
        bind();
    });
}else{
    init();
    playbgm();
    loader();
    bind();
}

window.onload = function() {
    $audio = $("#bgmidim");
    if ($audio.length>0) {
        $audio.attr("src", StaticPath + $audio.data("src"));
        $audio.parent("a").prepend('<i class="icon-music"></i>');
    }
};

function init(){
    $(function(){
        FastClick.attach(document.body);
        flippage = new Flippage($("body"));
        flippage.setFlipPageMode(3);
    });
}

function playbgm(){
    document.getElementById("bgmidim").play();
}

function loader(){
    var imageList = [
        "web.png","units-icons.png","pg10-border.png","pg9-txt-bg.png",
        "pg9-now.png","pg9-float.png","pg9-arrow.png","pg8-ulbg.png","pg8-txtbg.png",
        "pg8-pic.png","pg8-itembg.png","pg8-float.png","pg8-arrow.png","pg7-txt-bg.png",
        "pg7-qcode.png","pg7-press.png","pg7-float.png","pg6valid-codebg.png",
        "pg6-valid-codenum.png","pg6-tel-bg.png","pg6-codetxt.png","pg6-checkout-btn2.png",
        "pg6-checkout-btn.png","pg6-checkout-btn-bg.png","pg5-txt-bg.png","pg5-picbg.png",
        "pg5-img.png","pg5-float.png","pg5-arrow.png","pg4-video-on.png","pg4-video-img.png",
        "pg4-video-border.png","pg4-txt-bg.png","pg4-float.png","pg3-txtbg.png","pg3-float.png",
        "pg3-circle.png","pg3-avadar.png","pg2-txtbg-step3.png","pg2-float.png","pg1-user.png",
        "pg1-rotate4.png","pg1-rotate3.png","pg1-rotate2.png","pg1-rotate1.png","pg1-float.png",
        "pg-title.png","pg-scroll.jpg","pg-btnbg.png","pg-btn-txt.png","loading.png","dot.png",
        "circle.png","alert.png","activity-logo.png"
    ];

    var audioList = document.querySelectorAll(".audio-lazyload");

    var i = 0;
    var progress = 0;
    var length = imageList.length + audioList.length;
    imageloader(imageList,function(){
        i++;
        if (i === length) {
            progress = 100;
            setTimeout(function(){
                loaded();
            },1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });
    audioloader(audioList,function(){
        i++;
        if (i === length) {
            progress = 100;
            setTimeout(function(){
                loaded();
            },1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });

    function buildHTML(progress){
        var html = "";
        // for (var j = 0,len = 10; j < len; j++) {
        //     html += '<span class="num num' + j + '"></span>';
        // }
        for (var j = 0,len = ("" + progress).length; j < len; j++) {
            //console.log(("" + progressgetElementByClassName)[j]);
            html += '<span class="num num' + ("" + progress)[j] + '"></span>';
        }
        return html;
    }

    function loaded(){
        $(function(){

            flippage._isInitComplete = true;
            flippage.showPage();
            var loading = $("#app-loading");
            loading.addClass("z-hide");
            // flippage.showPage(6);
            videoInit();
            // loading.on("webkitTransitionEnd", function() {
            //     loading.remove();
            // });
        });
    }
}

function videoInit(){
    var script = document.getElementById('_youkujs_');
    script.src = 'http://player.youku.com/jsapi';
    // script.src = '/js/youku-jsapi.js';
    script.onload = script.onreadystatechange = function(){

        if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
            /*QS.width = QS.width ? QS.width : wh.width;
             QS.height = QS.height ? QS.height :wh.height;*/
            // var arr = window.location.pathname.split('/');
            // if(arr.length == 3 && arr[1] == 'embed' && arr[2].charAt(0) == 'X' ){
            //     QS.vid = arr[2];
            // }
            QS.vid = document.getElementById("video_url").value;
            if (!QS.vid) {
                return;
            }
            if(QS.target == null ) QS.target = "youku-playerBox";
            if(QS.client_id == null) QS.client_id = "youkuind";
            var _select = new YoukuPlayerSelect(QS);
            _select.select();
            // var player = new YKU.Player("youku-playerBox", {
            // styleid: "0",
            // client_id: "168eed9e805f5239",
            // vid: "XOTU0NzAzMjUy",
            // show_related: !1,
            // autoplay: !0,
            // events: {
            //     onPlayerReady: function(){},
            //     onPlayStart: function(){},
            //     onPlayEnd: function(){}
            // }});
        }
    };
}

function bind() {

    $(function(){
        audioControl().init();
        scroll_loaded();

        $(".app-content").parallax();
        flippage.setFlipPageMode(0);
        bindFormEvent();
        function setCallback(){
            var product = $("#product"),
                success = $("#success"),
                validtitle = $("#tel-validcode .ui-title"),
                loginbtn =  $("#tel-validcode .btn-next .btn-text"),
                productIndex = $(".page").index(product),
                successIndex = $(".page").index(success);
            if (loginType === 1) { // 登陆个人中心
                validtitle.addClass('uc');
                loginbtn.removeClass("tel-btn");
                loginCallback = function(res,validType){
                    if (res.code == "0") {
                        //生成个人页面
                        if (typeof res.data.data === "object") {
                            var data = res.data.data;
                            var obj = $("#rank").clone();
                            obj.find(".txt-pix-wrap .prod-pic img").eq(0)[0].src = "/"+data.img+".jpg";
                            obj.find(".txt-pix-wrap .prod-title").text(data.name);
                            obj.find(".txt-pix-wrap .num").text(data.poll_votes);
                            $("#product").html(obj.html());
                        }
                        setTimeout(function(){

                            var index = $(".page").index($("#product"));
                            flippage.showPage(index);

                            setShareContent();
                            $("#product").on("hide",function(){
                                resetShareContent();
                            });

                            mineiScroll_list = new IScroll('#product .scroll8-wrap',{
                                mouseWheel: true,
                                click: true
                            });
                            mineiScroll_list.refresh();

                        },200);
                    } else if (res.code == "1002") {
                        if (validType == 1) {
                            warning("密码不正确！");
                        } else if (validType == 2){
                            warning("验证码不正确！");
                        }
                    } else {
                        warning(res.msg);
                    }
                };
            } else { // 登陆投票
                validtitle.removeClass('uc');
                loginCallback = function(res,validType){
                    if (res.code == "0") {
                        vote(function(){
                            var num = parseInt($("#rank").find(".txt-pix-wrap .num").text());
                            $("#rank").find(".txt-pix-wrap .num").text(num+1);
                            editShareConetnt(num+1);

                            var option_id = $("#option_id").val();
                            var c = $('.scroll8-wrap [data-option_id="' + option_id + '"] .num');
                            if (c.length) {
                                c.text(num+1);
                            }

                            var index = $(".page").index($("#success"));
                            flippage.showPage(index);
                        });
                    } else if (res.code == "1002") {
                        if (validType == 1) {
                            warning("密码不正确！");
                        } else if (validType == 2){
                            warning("验证码不正确！");
                        }
                    } else {
                        warning(res.msg);
                    }
                };
            }
        }

        function vote(callback){
            var option_ids = [];
            var option_id = $("#option_id").val();
            option_ids.push(option_id);
            $.ajax({
                url: '/goodproduct/vote',
                type: 'POST',
                dataType: 'json',
                data: {option_id:option_ids},
                success:function(data){
                    if (data.code == 0) {
                        callback();
                    } else if (data.code == 2){
                        warning(data.msg,function(){
                            var index = $(".page").index($("#success"));
                            flippage.showPage(index);
                        });
                    } else {
                        warning(data.msg,function(){
                            var index = $(".page").index($("#rank"));
                            flippage.showPage(index);
                        });
                    }
                },
                error:function(){
                    // warning("投票失败，请重试！",function(){
                    //     vote(callback);
                    // });
                    warning("投票失败，请重试！");
                }
            });
        }
        $("#cover").find(".user-avadar").on("click",function(){
            loginType = 1;
            setCallback();
            var index = $(".page").index($("#tel-validcode").closest('.page'));

            flippage.showPage(index);
        });

         $("#join").find(".btn-prev").on("click",function(){
            flippage.showPage(0);
        });

        $("#picture").find(".btn-next").on("click",function(){
            loginType = 2;
            setCallback();
        });

        $("#cover").on("current", function() {
            $(".ui-guideWrap").attr("hidden", true);
        });

        $("#rank").on("current", function() {
            myiScroll_list.refresh();
        });
        var _qrx = false;
        $("#success").on("current", function() {
            if (_qrx) {
                return false;
            }
            var qrcode = $("#success img");
            var qrcodeheight = qrcode.offset().top + qrcode.height();
            console.log(qrcodeheight);
            var qrcodex = $("#success .ui-qrcode img").clone().css({
                position:"absolute",
                top:0,
                left:0,
                zIndex:10,
                width:640,
                height:qrcodeheight+"px",
                opacity:0
            });
            $("#success .page-content").append(qrcodex);
            _qrx = true;
        });

        $(".form-item,.infos").on("webkitAnimationStart", function(e) {
            var index;
            if (e.animationName === "fadeinB") {
                index = $(".form-item,.infos").index($(this));
                $("#textbox" + (index + 1))[0].play();
            }
        });

        $(".ui-continue-link").on("click", function() {
            var index = $(".page").index($(this).closest('.page'));
            flippage.showPage(index + 1);
        });

        $(document).on("click",".btn-next", function() {
            var parent = $(this).closest('.page');
            $("#buttonm")[0].play();
            if (parent[0].id === "tel-validcode") {
                return;
            }
            if (parent[0].id === "join") {
                $("#share-mask").show();
                return false;
            }
            var index = $(".page").index(parent);
            flippage.showPage(index + 1);
        });

        $(document).on("click",".btn-prev", function() {
            var parent = $(this).closest('.page');
            $("#buttonm")[0].play();
            if (parent[0].id === "tel-validcode") {
                return;
            }
            if (parent[0].id === "cover") {
                flippage.showPage(0);
                return false;
            }
            if (parent[0].id === "result") {
                flippage.showPage(0);
                return false;
            }
            if (parent[0].id === "product") {
                flippage.showPage(0);
                return false;
            }
            var index = $(".page").index(parent);
            if (index >= 1) {
                flippage.showPage(index - 1);
            }
        });

        $(".activity-logo").on("webkitAnimationStart", function(e) {
            if (e.animationName === "activityLogo") {
                $("#logom")[0].play();
            }
        });

        $(".banner-content").on("webkitAnimationStart", function(e) {
            $("#expansion")[0].play();
        });

        $("#success .ui-content-wrap").on("webkitAnimationStart", function(e) {
            $("#synopsis")[0].play();
        });

        $(".ui-flow-list li").on("webkitAnimationStart", function(e) {
            if ($(e.target).hasClass('a-flipinX2')) {
                $("#tumblingm" + ($(e.target).index() + 1))[0].play();
            }
        });

        $("#share-mask").on("click", function() {
            $(this).hide();
        });

        $("#alert-mask").on("webkitAnimationStart", function() {
            $("#warningm")[0].play();
        });

        $("#alert-mask .alert-btn").on("click", function() {
            $("#alert-mask").hide();
        });

        $("#video").on("hide",function(){
            var video_c = $(".video-on");
            if (video_c.length) {
                audioControl().play();
            }
            video_c.show();
        });

        $(".video-on").click(function(){
            var _video = $("#youku-playerBox video");
            audioControl().pause();
            $(this).hide();
            if (_video.length) {
                _video[0].play();
            }
        });

    });
}

function scroll_loaded () {
    if (myScrollPic) {
        return false;
    }
    var myScrollPicDesc = [];

    myScrollPic = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapSpeed: 400,
        keyBindings: true,
        eventPassthrough: true,
        freeScroll: true,
        indicators: {
            el: document.getElementById('dot-wrap'),
            resize: false
        }
    });
    var step;
    myScrollPic.on('beforeScrollStart', function(){
        step = myScrollPic.currentPage.pageX;
    });
    myScrollPic.on('scrollEnd', function(){
        if (myScrollPic.currentPage.pageX !== step) {
            $("#citym")[0].play();
        }
    });

    $('#scroll .ui-content').each(function(){
        var _s = new IScroll($(this)[0],{
            mouseWheel: true
        });
        myScrollPicDesc.push(_s);
    });

    $("#picture").on("current", function() {
        SetDotWrapWidth();
        myScrollPic.refresh();
        for (var i = 0; i < myScrollPicDesc.length; i++) {
            myScrollPicDesc[i].refresh();
        }
    });
}

function warning(text,callback){
    $("#alert-mask .alert-text").text(text);
    $("#alert-mask").show();
    if (callback) {
        $("#alert-mask .alert-btn").one("click", callback);
    }
}

var oShareContent;
//TODO
function setShareContent(){
    oShareContent = {
        data: wxShare.getData(),
        line: wxShare.getLineData()
    };
    var title = "我参加了中国好产品大赛，快来帮我加油!";
    var desc = "亮出你的新奇特，让天下没有被埋没的好产品";
    wxShare.setData({
        title: title,
        desc: desc
    });
    wxShare.setLineData({
        title: title
    });
}

function resetShareContent(){
    wxShare.setData(oShareContent.data);
    wxShare.setLineData(oShareContent.line);
}

function editShareConetnt(num){
    var data = wxShare.getData();
    data.desc = data.desc.replace(/已有\d+人/,"已有"+num+"人");
    wxShare.setData(data);
}

function audioControl(){
    var obj = $(".u-globalAudio").eq(0);
    var audio = obj.find("audio")[0];
    return {
        init : function(){
            if (audio.autoplay) {
                _play();
            }
            obj.on("click",function(){
                if (obj.hasClass('z-play')) {
                    _pause();
                }else{
                    _play();
                }
            });
        },
        pause: _pause,
        play : _play
    };

    function _pause(){
        audio.pause();
        obj.removeClass("z-play").addClass("z-pause");
    }
    function _play(){
        audio.play();
        obj.removeClass("z-pause").addClass("z-play");
    }
}
function SetDotWrapWidth(){
    var parent = $("#picture");
    var scroll = parent.find("#scroll");
    var li_length = scroll.find("li").length;
    var dot_wrap_w = li_length*26 - 16 + "px";
    var scroll_w = li_length*530 + "px";
        parent.find("#dot-wrap").css("width",dot_wrap_w);
        scroll.css("width",scroll_w);
}
function bindFormEvent(){
    var ajaxtimeout = 5000;
    var PHONE = 0;
    var step = 1;
    var parent = $("#tel-validcode");
    var RELID = typeof RELID != "undefined" ? RELID : 0;
    var validType = 1;
    function setBtnText(){
        if (step === 1) {
            $(".js-submit-btn .btn-text").removeClass("password-btn").addClass("tel-btn");
        } else if (step === 2 && loginType === 2) {   //不是从首页点过来的
            $(".js-submit-btn .btn-text").removeClass("tel-btn").addClass("password-btn");
        } else if(step === 2 && loginType === 1) {   //从首页点过来
            $(".js-submit-btn .btn-text").removeClass("password-btn").removeClass("tel-btn");
        } else {
            $(".js-submit-btn .btn-text").removeClass("password-btn").removeClass("tel-btn");
        }
    }


    parent.on("hide",function(){
        $(".js-form-phone").removeClass("hide");
        $(".js-form-valid").addClass("hide");
        step = 1;
    });

    parent.on("click", ".js-submit-btn", function() {
        if (step === 1) {
            $("#form1").trigger("submit");
        } else if (step === 2) {
            $("#form2").trigger("submit");
        }
    });

    parent.on("click", ".js-prev-btn", function() {

        if (step == 2) {
            $(".js-form-phone").removeClass("hide");
            $(".js-form-valid").addClass("hide");

            step = 1;
            setBtnText();
        } else {
            var index;
            if(loginType === 1){
                index = 0;
            } else {
                index = $(".page").index($(this).closest(".page")) - 1;
            }
            flippage.showPage(index);
        }
    });

    $("#form1").on("submit", function() {
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            phoneNum = $("#mobile").val(),

            pattern = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/,
            PAID = typeof PAID === "undefined" ? 0 : PAID;
        var index;
        if (pattern.test(phoneNum)) {
            if (PAID == 1) {
                warning("您已经支持过本产品！",function(){
                    index = $(".page").index($("#iscroll_list"));
                    flippage.showPage(index);
                });
                return false;
            } else {
                $phoneForm.addClass("hide");
                $validForm.removeClass("hide");
                step = 2;
            }
        } else if (phoneNum.length === 0) {
            warning("请输入手机号！");
        } else {
            warning("请输入正确的手机号！");
        }
        return false;
    });

    $("#form2").on("submit", function() {
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            phoneNum = $("#mobile").val(),
            validcode = $(".validcode").val();
        var POLL_ID = $("#poll_id").val();
        if (validType == 1) {
            if (validFormAjax) {
                return false;
            }
            validFormAjax = true;
            $.ajax({
                url: "/goodproduct/good-poll",
                type: 'POST',
                dataType: 'json',
                timeout: ajaxtimeout,
                data: {
                    mobile: phoneNum,
                    authcode: validcode,
                    poll_id: POLL_ID,
                    method:"pwd"
                },
                success: function(res) {
                    loginCallback(res,validType);
                    validFormAjax = false;
                },
                error: function() {
                    warning("出错了，请稍后重试！");
                    validFormAjax = false;
                }
            });
        } else if (validType == 2) {
            var pattern2 = /^\d{6}$/;
            if (pattern2.test(validcode)) {
                if (validFormAjax) {
                    return false;
                }
                validFormAjax = true;
                $.ajax({
                    url: "/goodproduct/good-poll",
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {
                        mobile: phoneNum,
                        authcode: validcode,
                        poll_id: POLL_ID,
                        method:"authcode"
                    },
                    success: function(res) {
                        loginCallback(res,validType);
                        validFormAjax = false;
                    },
                    error: function() {
                        warning("出错了，请稍后重试！");
                        validFormAjax = false;
                    }
                });
            } else {
                warning("请输入6位验证码！");
            }

        } else {
            warning("未知验证类型");
        }
        return false;
    });


    var validcodeInput = $("#password").addClass("validcode");
    parent.on("click", ".ui-swich", function() {
        var that = $(this);
        var W = that.width();
        var w = that.find(".ui-swich-ball").width();
        var pw = parent.find(".validcode-wrap").width();
        var iw = pw - parent.find(".form-item4").width() - parseFloat(parent.find(".form-item4").css("margin-left"));
        var $validForm = $(".js-form-valid");
        if (!that.hasClass("checked")) {
            validType = 2;
            that.addClass("checked");
            that.find(".ui-swich-anim").animate({
                width: W
            }, 300, function() {
                that.parent().find(".ui-swich-tip").text("或使用密码登录");
                validcodeInput.attr("name", "valid-code").attr("type", "number").attr("placeholder", "请输入短信验证码")[0].id = "valid-code";
                $validForm.find(".ui-validcode-wrap").find("input").val("");
                $validForm.find(".ui-validcode-wrap").animate({
                    width: iw
                }, 300, function() {
                    $validForm.find(".ui-validbtn-wrap").animate({
                        opacity: 1
                    }, 200);
                });
            });
        } else {
            that.removeClass("checked");
            validType = 1;
            that.find(".ui-swich-anim").animate({
                width: w
            }, 300, function() {
                that.parent().find(".ui-swich-tip").text("或使用短信验证码登录");
                validcodeInput.attr("name", "password").attr("type", "password").attr("placeholder", "请输入您的密码")[0].id = "password";
                $validForm.find(".ui-validbtn-wrap").animate({
                    opacity: 0
                }, 200, function() {
                    $validForm.find(".ui-validcode-wrap").find("input").val("");
                    $validForm.find(".ui-validcode-wrap").animate({
                        width: pw
                    }, 300);
                });
            });
        }
    });


    var validFormAjax = false;

    var validCodeLock = false;
    parent.on("click", ".ui-validbtn", function() {
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            $validbtn = $(this),
            phoneNum = $("#mobile").val(),
            timeout = 60;
        if (validCodeLock) {
            return false;
        }
        validCodeLock = true;
        $.ajax({
            url: "/order/messagecode",
            type: 'POST',
            dataType: 'json',
            timeout: ajaxtimeout,
            data: {
                mobile: phoneNum
            },
            success: function(res) {
                var T;
                if (res.code === "0") {
                    $validbtn.text(timeout + "s").removeClass('abtain');
                    _validTimeOut(timeout);
                } else if (res.code === "2") {
                    warning(res.msg,function(){
                        $phoneForm.removeClass("hide");
                        $validForm.addClass("hide");
                        $validbtn.text("").addClass('abtain');
                    });
                    validCodeLock = false;
                } else {
                    warning(res.msg);
                    $validbtn.text("").addClass('abtain');
                    validCodeLock = false;
                }

                function _validTimeOut(_timeout) {
                    if (_timeout >= 1) {
                        setTimeout(function() {
                            _timeout -= 1;
                            $validbtn.text(_timeout + "s");
                            _validTimeOut(_timeout);
                        }, 1000);
                    } else {
                        $validbtn.text("").addClass('abtain');
                        validCodeLock = false;
                    }
                }
            },
            error: function() {
                warning("出错了，请稍后重试！");
                validCodeLock = false;
                $validbtn.text("").addClass('abtain');
            }
        });
        return false;
    });
}