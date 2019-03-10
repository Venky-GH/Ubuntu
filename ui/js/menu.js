let i = document.getElementsByClassName("menu")[0].style;

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        let posX = e.clientX;
        let posY = e.clientY;
        menu(posX, posY);
        e.preventDefault();
    }, false);
    document.addEventListener('click', function(e) {
        i.opacity = "0";
        setTimeout(function() {
            i.visibility = "hidden";
        }, 501);
    }, false);
} else {
    document.attachEvent('oncontextmenu', function(e) {
        let posX = e.clientX;
        let posY = e.clientY;
        menu(posX, posY);
        e.preventDefault();
    });
    document.attachEvent('onclick', function(e) {
        i.opacity = "0";
        setTimeout(function() {
            i.visibility = "hidden";
        }, 501);
    });
}

function menu(x, y) {
    i.top = y + "px";
    i.left = x + "px";
    i.visibility = "visible";
    i.opacity = "1";
}