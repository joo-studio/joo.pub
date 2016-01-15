function validataOS() {
    if (navigator.userAgent.indexOf("Window") > 0) {
        var bwin = document.getElementsByClassName('win');
        for(var i=0;i<bwin.length;i++){
          bwin[i].style.display = "block";
        }
        return "Windows";
    } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {
        var bmac = document.getElementsByClassName('mac');
        for(var i=0;i<bmac.length;i++){
          bmac[i].style.display = "block";
        }
        return "Mac";
    } else if (navigator.userAgent.indexOf("Linux") > 0) {
        var blinux = document.getElementsByClassName('linux');
        for(var i=0;i<blinux.length;i++){
          blinux[i].style.display = "block";
        }
        return "Linux";
    } else {
        alert("null")
        return "NUll";
    }
}
validataOS();
