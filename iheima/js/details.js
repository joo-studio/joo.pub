$(function() {
    //hover的时候回复二字出现
    $(".user-comment").mouseover(function(e) {
        if ($(e.target).closest(".other-comment-wrap").length) {
            var that = $(e.target).closest(".other-comment-wrap");
            that.find(".reply").show();
            that.mouseout(function() {
                that.find(".reply").hide();
            })
        }
    })
    var append_comment = $(".hide-comment");
    var UID = $("#uid").val();
    $(document).on("click", function(e) {
        if ($(e.target).closest(".talk-num").length) {
            var that = $(e.target);
            var parent = that.closest('li');
            var uid = parent.data("uid");
            var self_comment = parent.find(".self-comment");
            var pid = self_comment.find(".user-info a").data("pid")
            if (pid == UID) {
                alert("您不能回复自己哦~");
                return false;
            } else {
                self_comment.append(append_comment);
                append_comment.fadeIn();
            }
            return;
        } else if ($(e.target).closest(".reply").length) {
            var that = $(e.target);
            var parent = that.closest('.other-comment-wrap');
            var other_comment = parent.find(".other-title-content");
            other_comment.append(append_comment);
            append_comment.fadeIn();
            return;
        } else if ($(e.target).closest(".hide-comment").length) {
            return;
        }
        append_comment.fadeOut();
    });
    // 回复
    $(".hide-comment .publish").on("click", function() {
        var that = $(this);
        var li_parent = that.closest('li');
        var TalkNum = li_parent.find(".talk-num");
        var MainComment = that.closest('.main-comment');
        var Self_Comment = MainComment.find('.self-comment');
        var other_parent = that.closest('.other-comment-wrap');
        var ParentId = li_parent.data("uid");
        var UserId = other_parent.data("pid");
        var comment = that.closest('.comment');
        var textarea = comment.find("textarea");
        var CmtCon = comment.find("textarea").val();
        var cmt_parent = $(this).closest('.comment');
        var self_cmt_con = cmt_parent.find("textarea").val();
        var ajaxingdata = {
            parent_id: ParentId,
            cmt_name: CmtCon
        }

        if (UserId) {
            ajaxingdata.user_id = UserId;
        }
        $.ajax({
                url: REPLY_Url,
                type: 'POST',
                dataType: 'json',
                data: ajaxingdata
            })
            .done(function(data) {
                textarea.val("");
                comment.hide();

                if (data.code == 0) {
                    var talk_num = TalkNum.find("b").text() - 0 + 1;
                    TalkNum.find("b").text(talk_num);
                    var html = template("reply_temp", {
                        avatar: data.data.avatar,
                        pid: data.data.uid,
                        nickname: data.data.nickname,
                        cmt_name: data.data.cmt_name,
                        created_at: data.data.created_at,
                    });
                    Self_Comment.after(html);

                } else if (data.code == 1001) {
                    ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        that.trigger("click");
                    });
                } else {}
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });


});
