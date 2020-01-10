import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/cart.less"
import "./header-footer.js"
import {scrollToTop,b} from './util.js'

/***退出登录返回首页***/ 
function isLogin(){
    let username = sessionStorage.getItem('username');
    if(!username){
        window.location.href="../../index.html"
    }    
}
isLogin();
$('#user-logout').click(function(){
    sessionStorage.clear();
    isLogin();
});

/***监听窗口滚动***/
window.onscroll = ()=>{
    if(window.scrollY >= (800 - document.body.offsetHeight)){
        $('.list-bottom').removeClass('list-bottom-fixed')
    }
    else{
        $('.list-bottom').addClass('list-bottom-fixed')
    }
    if(window.scrollY > 700){
        $('.tool-bar').removeClass('hide')
    }
    else{
        $('.tool-bar').addClass('hide')
    }
};

/**回到顶部**/ 
scrollToTop({el:$('.tool-bar .backtop')[0],duration:200,pageScroll:(offset)=>{
    offset >= 700?$('.tool-bar').removeClass('hide'):$('.tool-bar').addClass('hide')
}});

/***请求数据加载页面***/
(function(){
    addNums();
    minusNums();
    printNum();
    getTotal();
    maskPopup();
    iptOnclick()
})();
/****ajax请求****/ 
window.onload = function () {
    let brand = document.querySelector('.list-content')
    $.myAjaxGet(`/add_to_carts/`, function (data) {
        console.log(data)
        let htmlStr = "";
        data.forEach(item => {
            htmlStr += `
                <div class="content-item" data-id="0" data-num="0">
                <div class="col col-check">
                    <i class="iconfont icon-checkbox"></i>
                </div>
                <div class="col col-img">
                        <img alt="" src="${item.goods.goodsimages[0].goods_img}">
                </div>
                <div class="col col-name">
                    ${item.goods.goods_title}
                </div>
                <div class="col col-price">
                    <div class="price-line">
                        <em class="price-original"></em>
                    </div>
                    <div class="price-line">
                        <em class="price-now">${item.goods.goods_price}</em>
                    </div>
                </div>
                <div class="col col-num">
                    <input class="btnReduce" type="button" value="-" />
                    <input class="buyNum" type="text" value="1" data-num="1"/>
                    <input class="btnAdd" type="button" value="+" />
                </div>
                <div class="col col-total"><span></span>元</div>
                <div class="col col-action"><span class="delItem">×</span></div>
                </div>
                `
        })
        brand.innerHTML = htmlStr
    });
}

/***购买数量增加***/ 
function addNums() {
    $('.btnAdd').click(function(){
        // 获取购买数量，购买数量加1
        let buyNum = $(this).prev()[0];
        let buyNumVal = Number(buyNum.value)
        if(buyNumVal < 201){
            buyNumVal += 1
        } else {
            return
        }
        buyNum.value = buyNumVal;
        buyNum.dataset.num = buyNumVal;
        $(this).parent().parent()[0].dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal();
        printNum();
    })
}
/****购买数量减少****/ 
function minusNums() {
    $('.btnReduce').click(function(){
        // 获取购买数量，购买数量加1
        let buyNum = $(this).next()[0];
        let buyNumVal = Number(buyNum.value)
        if(buyNumVal > 1){
            buyNumVal-=1
        } else {
            return
        }
        buyNum.value = buyNumVal
        buyNum.dataset.num = buyNumVal;
        $(this).parent().parent()[0].dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal();
        printNum();
    })
}

/****输入购买数量****/ 
function printNum() {
    $('.buyNum').keyup(function(e){
        $(this)[0].value = $(this)[0].value.replace(/\D/g, '');
        //限购
        if (Number($(this)[0].value > 200)) {
            $(this)[0].value = 200
        };
        $(this).blur(function(){
            if($(this)[0].value >0){
                $(this)[0].dataset.num = $(this)[0].value;
            }
            else{
                $(this)[0].value = $(this)[0].dataset.num;
            }
            getTotal();
        })
    })
}

/*****计算总价,页面初始化也要运行*****/ 
function getTotal(){
    // 合计总价
    let summation = 0;
    // 合计商品数量
    let totalBuyNum = 0;
    // 已选商品数量
    let selectBuyNum = 0;
    $('.buyNum').each(function(){
        // 得到购买数量
        let buyNumVal = Number($(this)[0].value)
        // 得到当前商品单价
        let priceVal = parseFloat($(this).parent().prev().find('.price-now')[0].innerText)
        // 计算总价
        let totalVal = $(this).parent().next().children()[0].innerText = Number((priceVal * buyNumVal).toFixed(2))
        // 判断当前商品是否被选中
        let isChoose = $(this).parent().parent().find('.icon-checkbox')[0].className.indexOf('icon-checkbox-selected') > -1 ;
        if(isChoose){
            summation+=totalVal
            selectBuyNum+=buyNumVal
        }
        totalBuyNum += buyNumVal
    })
    $('#summation')[0].innerText = summation;
    if(summation === 0) {
        $('#goBuy').addClass('noAllow');
        $('#goBuy').removeClass('allow');
    } else {
        $('#goBuy').removeClass('noAllow');
        $('#goBuy').addClass('allow');
    }
    $('#totalBuyNum')[0].innerText = totalBuyNum;
    $('#selectBuyNum')[0].innerText = selectBuyNum;
}

/****选框点击事件****/ 
function iptOnclick() {
    //全选
    let checkbox = $('.list-content .icon-checkbox')
    $('#selectAll').click(function(){
        if($(this)[0].classList.contains('icon-checkbox-selected')){
            $(this).removeClass('icon-checkbox-selected');
            checkbox.each(function(){
                $(this).removeClass('icon-checkbox-selected');
            })
        }else{
            $(this).addClass('icon-checkbox-selected');
            checkbox.each(function(){
                $(this).addClass('icon-checkbox-selected');
            })
        }
        getTotal()
    }) 
    //单选
    checkbox.click(function(){
        if($(this)[0].classList.contains('icon-checkbox-selected')){
            $(this).removeClass('icon-checkbox-selected');
            $('#selectAll').removeClass('icon-checkbox-selected');
        }
        else{
            $(this).addClass('icon-checkbox-selected');
            //判断是否全选
            let isSelectAll = true;
            checkbox.each(function () {
                if (!$(this)[0].classList.contains('icon-checkbox-selected')) {
                    isSelectAll = false;
                }
            })
            if (isSelectAll) {
                $('#selectAll').addClass('icon-checkbox-selected')
            }
        }
        getTotal(true)
    })
}

// 删除弹框
function maskPopup(){
    let delItem = [...document.getElementsByClassName('delItem')]
    delItem.forEach((el,idx)=>{
        el.onclick = (e) =>{
            //弹框操作
            maskAction(el,idx)
        }
    })
}

// mask各种点击事件
function maskAction(el,index) {
    let isDel = false;
    $('#mask').fadeIn();
    setTimeout(function(){
        $('#confirmBox').addClass('slideDown');
    },100)
    $("#cancelBtn")[0].onclick = close;
    $("#delImg")[0].onclick = close;
    //删除按钮，需请求接口
}
//关闭弹窗
function close(){
    $('#confirmBox').removeClass('slideDown');
    setTimeout(function(){
        $('#mask').fadeOut();
    },100)
}

/**跳转确认订单页面**/
$('#goBuy').click(function(){
    if($(this)[0].classList.contains('allow')){
        window.location = "./confirmOrder.html"
    }
})
