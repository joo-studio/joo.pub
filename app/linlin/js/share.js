/**
 * 统一的分享接口
 * window.wxShare.setData
 * window.wxShare.setLineData
 * window.wxShare.getData
 * window.wxShare.getLineData
 */
(function() {
    var share = {
        defaultData: {
            title: (document.getElementsByTagName("title")[0].innerHTML || "").replace(/&nbsp;/g, " "),
            desc: (document.getElementsByName("description")[0] ? document.getElementsByName("description")[0].getAttribute("content") : ""),
            link: location.href.split("#")[0] || "",
            imgUrl: (document.getElementsByTagName("img")[0] ? document.getElementsByTagName("img")[0].src : ""),
            success: function(){},
            cancel: function(){}
        },
        customData: {},
        customLineData: {},
        callback: [],
        isInit: false,
        _extend: function(target, options) {
            for (var i in options) {
                target[i] = options[i];
            }
            return target;
        },
        init: function() {
            if (this.isInit){
                return false;
            }else{
                console.log("share init");
                this.isInit = true;
                this.update();
            }
        },
        setData: function(e ,l) {
            var n = l ? this.customLineData : this.customData;
            if ("object" == typeof e) {
                n = this._extend(n, e);
            }
        },
        setLineData: function(e) {
            this.setData(e, true);
        },
        getData: function(l) {
            var e = this.defaultData,
                t = l ? this.customLineData : this.customData,
                n = {};
            n = this._extend(n, e);
            if (l) {
                n = this._extend(n, this.customData);
            }
            n = this._extend(n, t);
            return n;
        },
        getLineData: function() {
            return this.getData(true);
        },
        setCallback: function(fn){
            if (fn) {
                this.customLineData.success = fn;
                this.customData.success = fn;
                this.update();
            }
        },
        update: function() {
            var that = this;
            if (navigator.userAgent.match(/micromessenger/gi)) {
                wx.ready(function(){
                    var t = that.getData();
                    var p = that.getLineData();
                    wx.onMenuShareAppMessage(t);
                    wx.onMenuShareQQ(t);
                    wx.onMenuShareWeibo(t);
                    wx.onMenuShareTimeline(p);
                });
            }
        }
    };
    window.wxShare = {
        setData: function(t) {
            share.setData(t);
            share.update();
        },
        setLineData: function(t) {
            share.setLineData(t);
            share.update();
        },
        getData: function() {
            return share.getData();
        },
        getLineData: function() {
            return share.getLineData();
        }
    };

    share.init();

    var customData,
        lineCustomData,
        shareMsg = document.getElementsByName("share_msg"),
        shareLine = document.getElementsByName("share_line");
        shareCallback = document.getElementsByName("share_callback");

    if (shareMsg.length) {
        share.setData(shareMsg[0].dataset);
    }

    if (shareLine.length) {
        share.setLineData(shareLine[0].dataset);
    }

    if (shareCallback.length && shareCallback[0].dataset.callback) {
        share.setCallback(function(){
            location.href = shareCallback[0].dataset.callback;
        });
    }

})();