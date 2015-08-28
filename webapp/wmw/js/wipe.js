$(function(){
    var canvas = document.getElementById("wipecanvas"),ctx = canvas.getContext("2d");
    var x1,y1,a=30,timeout,totimes = 100,jiange = 30;
    canvas.width = document.getElementById("wipebg").clientWidth;
    canvas.height = document.getElementById("wipebg").clientHeight;
    var img = new Image();
    img.src = "p0/r/l0/blur.jpg";
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
        //ctx.fillRect(0,0,canvas.width,canvas)
        tapClip()
    }
    function tapClip(){
        var hastouch = "ontouchstart" in window?true:false,
            tapstart = hastouch?"touchstart":"mousedown",
            tapmove = hastouch?"touchmove":"mousemove",
            tapend = hastouch?"touchend":"mouseup";
        
        canvas.addEventListener(tapstart , function(e){
    　　　　clearTimeout(timeout)
            e.preventDefault();
            
            x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
            y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
            
            ctx.lineCap = "round";　　//设置线条两端为圆弧
            ctx.lineJoin = "round";　　//设置线条转折为圆弧
            ctx.lineWidth = a*3;　　
            ctx.globalCompositeOperation = "destination-out";
            
            ctx.save();
            ctx.beginPath()
            ctx.arc(x1,y1,1,0,2*Math.PI);
            ctx.fill();
            ctx.restore();
            
            canvas.addEventListener(tapmove , tapmoveHandler);
            canvas.addEventListener(tapend , function(){
                canvas.removeEventListener(tapmove , tapmoveHandler);
                
    　　　　　　　timeout = setTimeout(function(){
                var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
                var dd = 0;
                for(var x=0;x<imgData.width;x+=30){
                    for(var y=0;y<imgData.height;y+=30){
                        var i = (y*imgData.width + x)*4;
                        if(imgData.data[i+3] > 0){
                            dd++
                        }
                    }
                }
                if(dd/(imgData.width*imgData.height/900)<0.6){
                   window.location.href="main.html"
                   // $('#part1').fadeOut(1000);
                   // $('#part2').fadeIn();
                }
    　　　　　　　},100)
            });
            function tapmoveHandler(e){
                e.preventDefault()
                x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
                y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
                
                ctx.save();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.stroke();
                ctx.restore()
                
                x1 = x2;
                y1 = y2;
            }
        })
    }
})