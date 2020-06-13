function animated(obj,target,callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var speed = (target - obj.offsetLeft)/10;
        speed =   speed >=0 ? Math.ceil(speed) :  Math.floor(speed);
        //console.log(speed);
        if (obj.offsetLeft==target)
        {
            clearInterval(obj.timer);
            /*if (callback)
            {
                callback()
            }*/
            //上述if也可以写成
            callback&&callback()
        }else{
            obj.style.left = obj.offsetLeft+speed+'px';
        }

    },15)
}

function animatedVertical(obj,target,callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var speed = (target - window.pageYOffset)/10;
        speed =   speed >=0 ? Math.ceil(speed) :  Math.floor(speed);
        if (window.pageYOffset==target)
        {
            clearInterval(obj.timer);
            callback&&callback()
        }
            //obj.style.top = window.pageYOffset+speed+'px';
            window.scroll(0,window.pageYOffset+speed)


    },15);
}