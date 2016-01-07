//var StaticPath = "";
var ImagePrefix = StaticPath + "/img/";
var imageloader = function(imageUrlArr,callback){
    var imageArr = [];
    for (var i = 0, length = imageUrlArr.length; i < length; i++) {
        imageArr[i] = new Image();
        imageArr[i].onload = imageArr[i].onerror = callback;
        imageArr[i].src = ImagePrefix + imageUrlArr[i];
    }
};
var audioloader = function(audioUrlArr,callback){
    for (var i = 0, length = audioUrlArr.length; i < length; i++) {
        //console.log(audioUrlArr[i].data);
        if(/iPhone/.test(navigator.userAgent)){
            audioUrlArr[i].onplaying = audioUrlArr[i].onerror = function(){
                if (!this.autoplay) {
                    this.pause();
                }
                callback(this);
                this.onplaying = null;
            };
            audioUrlArr[i].src = StaticPath + audioUrlArr[i].dataset.src;
            audioUrlArr[i].play();
        } else {
            audioUrlArr[i].src = StaticPath + audioUrlArr[i].dataset.src;
            callback(this);
        };
    }
};