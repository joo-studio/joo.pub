function validataOS() {
    if (navigator.userAgent.indexOf("Window") > 0) {
        document.getElementById("win").style.display = "block";
        return "Windows";
    } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {
        document.getElementById("mac").style.display = "block";
        return "Mac ";
    } else if (navigator.userAgent.indexOf("Linux") > 0) {
        document.getElementById("linux").style.display = "block";
        return "Linux";
    } else {
        alert("null")
        return "NUll";
    }
}
validataOS();
