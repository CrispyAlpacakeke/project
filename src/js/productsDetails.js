import "../less/header-footer.less"
import "../less/normalized.less"
import "../less/productsDetails.less"
import './header-footer.js'
import {myAjax,scrollToTop,BASE_URL} from './util.js'

function displayMap() {
    // 选中显示图
    $().ready(function () {
        $(".content_img > ul li").mouseover(function () {
            $(this).addClass("selection").siblings().removeClass("selection")
        })
    })
}


function smallPicture() {
    // 小图片的切换
    $().ready(function () {
        $(".content_img img").mouseenter(function () {
            let smallImg = $(this)[0].src
            $(".content_smallImg > img").attr('src', smallImg);
            $(".content_bigImg > img").attr("src", smallImg)
        })
    })
}


function magnifier() {

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
    console.log(49)
    console.log(bigImg)

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

}


function number() {
    // 数量
    let reduceBtn = document.querySelector(".content_number .reduce")
    let plusBtn = document.querySelector(".content_number .plus")
    let numberIpt = document.querySelector(".content_number input")

    reduceBtn.onclick = function () {
        if (numberIpt.value == 1) {
            numberIpt.value = 1
        } else {
            numberIpt.value -= 1
        }
    }

    plusBtn.onclick = function () {
        numberIpt.value = Number(numberIpt.value) + 1
    }
}


function specifications() {
    // 规格

    let htmlXiaoGuiGe = ''
    $().ready(function () {
        $(".content_delivery > dl dd").click(function () {
            $(this).addClass("frame").siblings().removeClass("frame")
        })
    })
    $("#specificationsOne").click(function () {
        myAjax(`/goods_detail/15/`, 'get', function (data){
            $('.content_right .three')[0].innerHTML = `${data.goods_price}元`
            $('.content_right .two')[0].innerHTML = `${data.discountgoods_set[0].discounted_price}元`
            $('.content_right h3')[0].innerHTML = `${data.goods_title}`
            $('.content_right h3')[0].dataset.id = `${data.id}`
    });
    })
    $("#specificationsTwo").click(function(){
        myAjax(`/goods_detail/16/`, 'get', function (data){
            $('.content_right .three')[0].innerHTML = `${data.goods_price}元`
            $('.content_right .two')[0].innerHTML = `${data.discountgoods_set[0].discounted_price}元`
            $('.content_right h3')[0].innerHTML = `${data.goods_title}`
            $('.content_right h3')[0].dataset.id = `${data.id}`
        });
    })
}


function tabSwitch() {
    // tab 切换
    $().ready(function () {
        $(".bottom_top span").each(function (index) {
            $(this).click(function () {
                $(".show").removeClass("show");
                $(".tab").removeClass("tab");
                $(".content_bottom .cl").eq(index).addClass("show");
                $(this).addClass("tab")
            });
        })
    })
}

function commentSwitch() {
    // 评论切换
    $().ready(function () {
        $(".bottomBox_top > ul li").click(function () {
            $(this).addClass("clicks").siblings().removeClass("clicks")
        })
    })
}


function shopping(){
    $("#shoppingCart").click(function(){
        let goodsNumber = $("#goods_number").val()
        let goods = $(".content_right h3").attr("data-id")  
        myAjax(`/carts/`,'POST',{'goods_number':goodsNumber,'goods':goods},function(data){
            console.log(data)
            location.href = `${BASE_URL}/static/pages/cart.html`
        })
    })
}
function buyNow(){
    $('#buyNow').click(function(){
        location.href = `${BASE_URL}/static/pages/confirmOrder.html`
    })
}

// // 接口
window.onload = function () {
    let details = document.querySelector(".content_details_box")
    let htmlStr = "";
    let htmlImg = "";
    let htmlIntroduceImg = "";
    myAjax(`/goods_detail/15/`, 'get', function (data) {
        console.log(data)
        data.goodsshowimages.forEach(el => {
            console.log(el.img_show)
            htmlImg += `
            <li class="">
            <img src="${el.img_show}" alt="">
            </li>
            `
        })
        data.goodsdetailimages.forEach(el => {
            console.log(el.img_detail)
            htmlIntroduceImg += `
            <li>
            <img src="${el.img_detail}" alt="">
            </li>
            `
        })

        htmlStr += `
    <div class="content_details container">
    <div class="content_left">
        <!-- 小图片 -->
        <div class="content_smallImg">
            <img src="${data.goodsshowimages[0].img_show}" alt="">
            <!-- 放大镜 -->
            <div></div>
        </div>
        <!-- 显示图 -->
        <div class="content_img">
            <ul>
                ${htmlImg}
            </ul>
        </div>
        <!-- 大图片 -->
        <div class="content_bigImg">
            <img src="../images/details/abf708581c5a99a0-.jpg" alt="">
        </div> 
    </div>
    <div class="content_right">
        <h3 data-id="${data.id}">${data.goods_title}</h3>
        <div class="content_price">
            <div class="price_left">
                <span class="one">价格：</span>
                <span class="two">${data.discountgoods_set[0].discounted_price}</span>
                <span class="three">${data.goods_price}</span>
            </div>
            <div class="price_right">
                <span class="four">累计评价</span>
                <span class="five">30+</span>
            </div>
        </div>
        <div class="content_introduce">
            <span>${data.goods_introduction}</span></span>
        </div>
        <div class="content_delivery">
            <dl>
                <dt>规格：</dt>
                <dd id="specificationsOne" class="frame">500g</dd>
                <dd id="specificationsTwo">1000g</dd>
            </dl>
        </div>
        <div class="content_number">
            <span>数量：</span>
            <button class="reduce">-</button>
            <input id="goods_number" type="text" value="1">
            <button class="plus">+</button>
        </div>
        <div class="content_btn">
            <button id="buyNow">立即购买</button>
            <button id="shoppingCart">加入购物车</button>
        </div>
    </div>
</div>
<div class="content_recommend container">
    <div class="recommend_top">
        <h3>好物推荐</h3>
    </div>
    <div class="recommend_box">
        <div class="recommend_boxs">
            <div class="img_box">
                <img src="../images/details/166d0a6c68e94c8d-.jpg" alt="">
                <span>介绍</span>
            </div>
            <p>￥118.00</p>
        </div>
        <div class="recommend_boxs">
            <div class="img_box">
                <img src="../images/details/166d0a6c68e94c8d-.jpg" alt="">
                <span>介绍</span>
            </div>
            <p>￥118.00</p>
        </div>
        <div class="recommend_boxs">
            <div class="img_box">
                <img src="../images/details/0f96fed3f292270c-.jpg" alt="">
                <span>介绍</span>
            </div>
            <p>￥118.00</p>
        </div>
        <div class="recommend_boxs">
            <div class="img_box">
                <img src="../images/details/8eccf2dd07aa2291-.jpg" alt="">
                <span>介绍</span>
            </div>
            <p>￥118.00</p>
        </div>
        <div class="recommend_boxs">
            <div class="img_box">
                <img src="../images/details/166d0a6c68e94c8d-.jpg" alt="">
                <span>介绍</span>
            </div>
            <p>￥118.00</p>
        </div>
    </div>
</div>
<div class="content_bottom container">
    <div class="bottom_top">
        <span class="tab">商品介绍</span>
        <span>规格</span>
        <span>商品评价</span>
    </div>
    <div class="bottom_introduce cl show">
        <div class="bottom_introduceBox">
            <ul>
                <li>商品名称：${data.goods_title}</li>
                <li>商品重量：${data.goods_specs}</li>
                <li>类别：</li>
                <li>包装：礼盒装</li>
            </ul>
        </div>
        <div class="bottom_introduceImg">
            <ul>
                ${htmlIntroduceImg}
            </ul>
        </div>
    </div>
    <div class="bottom_specifications cl">
        <div class="specifications_box">
            <h3>主体</h3>
            <dl>
                <dt>保质期</dt>
                <dd>300</dd>

                <dt>净含量</dt>
                <dd>3126</dd>

                <dt>产品标准号</dt>
                <dd>ST/23658</dd>
            </dl>
        </div>
    </div>
    <div class="bottom_evaluate cl">
        <div class="evaluate_box">
            <div class="evaluate_topBox">
                <h3>商品评价</h3>
                <div class="evaluate_score">
                    <div class="evaluate_scoreLeft">
                        <span class="one">好评度</span>
                        <span class="two">100</span>
                        <span class="three">%</span>
                    </div>
                    <div class="evaluate_scoreRight">
                        <ul>
                            <li>
                                <span>分量充足(<a>1</a>)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="evaluate_bottomBox">
                <div class="bottomBox_top">
                    <ul>
                        <li class="clicks">全部评价(200+)</li>
                    </ul>
                </div>
                <div class="bottomBox_bottom">
                    <ul>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                        <li>
                            <div class="bottomBox_left">
                                <img src="../images/photo.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="bottomBox_right">
                                <span class="one">☆☆☆☆☆</span>
                                <span class="two">没毛病，高端大气上档次。值得购买</span>
                                <span class="three">时间</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div> 
            `
            details.innerHTML = htmlStr
            displayMap()
            smallPicture()
            number()
            specifications()
            tabSwitch()
            commentSwitch()
            magnifier();
            shopping()
            buyNow();
            })
        
    
    }
