import "../less/header-footer.less"
import "../less/normalized.less"
import "../less/productsDetails.less"
<<<<<<< Updated upstream
import './header-footer.js'
=======
import "./header-footer"

// 选中显示图
$().ready(function () {
    $(".content_img > ul li").mouseover(function () {
        $(this).addClass("selection").siblings().removeClass("selection")
    })
})

// 小图片的切换
$().ready(function () {
    $(".content_img img").mouseenter(function () {
        console.log($(this).attr("src"));
        // console.log($(".content_left img")[0].src);
        $(".content_left img")[0].src = this.src.replace('(1).jpg', '-.jpg')
        $(".content_left img")[5].src = this.src.replace('(1).jpg', '-.jpg')
    })
})

// 放大镜

function getStyle(el, attr) {
    // 兼容IE
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el, null)[attr];
    }
}

let contentSmallImg = document.querySelector(".content_smallImg")
let mirror = document.querySelector(".content_smallImg > div")
let contentBigImg = document.querySelector(".content_bigImg")
let smallImg = document.querySelector(".content_smallImg > img")
let bigImg = document.querySelector(".content_bigImg > img")


bigImg.style.width = parseInt(getStyle(smallImg, "width")) * parseInt(getStyle(contentSmallImg, "width")) / parseInt(getStyle(mirror, "width")) + "px";
bigImg.style.height = parseInt(getStyle(smallImg, 'height')) * parseInt(getStyle(contentSmallImg, 'height')) / parseInt(getStyle(mirror, 'height')) + 'px';

contentSmallImg.onmouseenter = function () {
    mirror.style.display = "block";
    contentBigImg.style.display = "block";
}

contentSmallImg.onmouseleave = function () {
    mirror.style.display = "none";
    contentBigImg.style.display = "none";
}

contentSmallImg.onmousemove = function (event) {
    let _top = event.clientY - this.getBoundingClientRect().top - mirror.offsetHeight / 2;
    let _left = event.clientX - this.getBoundingClientRect().left - mirror.offsetWidth / 2;

    let maxY = smallImg.offsetHeight - mirror.offsetHeight;
    let maxX = smallImg.offsetWidth - mirror.offsetWidth;


    if (_top < 0) {
        _top = 0;
    } else if (_top > maxY) {
        _top = maxY;
    }

    if (_left < 0) {
        _left = 0;
    } else if (_left > maxX) {
        _left = maxX;
    }

    mirror.style.top = _top + "px";
    mirror.style.left = _left + "px";

    bigImg.style.left = -(_left * (bigImg.offsetWidth - contentBigImg.offsetWidth) / maxX) + "px";
    bigImg.style.top = -(_top * (bigImg.offsetHeight - contentBigImg.offsetHeight) / maxY) + "px";
}

// 数量
let reduceBtn = document.querySelector(".content_number .reduce")
let plusBtn   = document.querySelector(".content_number .plus")
let numberIpt = document.querySelector(".content_number input")

reduceBtn.onclick = function(){
    if( numberIpt.value == 1){
        numberIpt.value = 1
    }else{
        numberIpt.value -= 1
    }
}

plusBtn.onclick = function(){
    numberIpt.value = Number(numberIpt.value) + 1
}

// 配送方式
$().ready(function () {
    $(".content_delivery > dl dd").click(function () {
        $(this).addClass("frame").siblings().removeClass("frame")
    })
})



// tab 切换
$().ready(function () {
    $(".bottom_top span").click(function () {
        $(this).addClass("tab").siblings().removeClass("tab")
    })
})



// 评论切换
$().ready(function () {
    $(".bottomBox_top > ul li").click(function () {
        $(this).addClass("clicks").siblings().removeClass("clicks")
    })
})
>>>>>>> Stashed changes
