import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/cart.less"
import {myAjax,scrollToTop,BASE_URL} from './util.js'
import "./header-footer.js"
import {loadCart} from "./loading.js"

import "../css/x0popup.default.css"
import "../css/x0popup.css"
import x0p from "./x0popup.js"

/***退出登录返回首页***/ 
function isLogin(){
    let access = localStorage.getItem('access');
    if(!access){
        window.location.href="../../index.html"
    }    
}
isLogin();
$('#user-logout').click(function(){
    localStorage.clear();
    isLogin();
});

/***监听窗口滚动***/
window.onscroll = ()=>{
    if($('.box-hd')[0].getBoundingClientRect().top < document.body.offsetHeight){
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

/***ajax请求数据加载页面***/
/**加载购物车列表**/
new Promise((resolve,reject)=>{
    let brand = document.querySelector('.list-content')
    myAjax(`/carts/`,'get',function(data) {
        console.log(data,78)
        loadCart(data,brand);
        resolve();
    });        
}).then(res=>{
    addNums();
    minusNums();
    printNum();
    getTotal();
    maskPopup();
    iptOnclick();      
    initListbottom();         
})

/**初始化list-bottom的位置**/ 
function initListbottom(){
    let item = document.querySelectorAll('.content-item')
    $('.list-bottom').removeClass('list-bottom-fixed')
    if(item){
        if(item.length <=6 ){
            $('.list-bottom').removeClass('list-bottom-fixed')
        }
        else{
            $('.list-bottom').addClass('list-bottom-fixed')
        }        
    }
}

/***购买数量增加***/ 
function addNums() {
    $('.btnAdd').click(function(){
        // 获取购买数量，购买数量加1
        let buyNum = $(this).prev()[0];
        let item = $(this).parent().parent()[0];
        let buyNumVal = Number(buyNum.value)
        if(buyNumVal < 201){
            buyNumVal += 1
        } else {
            return
        }
        buyNum.value = buyNum.dataset.num = item.dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal();
        printNum();
        let goodsId = Number($(this).parent().parent()[0].dataset.goods)
        myAjax(`/carts/`,'post',{'goods':goodsId},function(data){
            console.log(data)
            buyNum.value = buyNum.dataset.num = item.dataset.num = data.goods_number;
        });
    })
}
/****购买数量减少****/ 
function minusNums() {
    $('.btnReduce').click(function(){
        // 获取购买数量，购买数量加1
        let buyNum = $(this).next()[0];
        let item = $(this).parent().parent()[0];
        let buyNumVal = Number(buyNum.value)
        if(buyNumVal > 1){
            buyNumVal-=1
        } else {
            return
        }
        buyNum.value = buyNum.dataset.num = item.dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal();
        printNum();
        let goodsNum = Number(buyNum.dataset.num);
        let id = Number($(this).parent().parent()[0].dataset.id)
        myAjax(`/carts/${id}/`,'put',{'id':id,'goods_number':goodsNum},function(data) {
            console.log(data)
            buyNum.value = buyNum.dataset.num = item.dataset.num = data.goods_number;
        });
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
            console.log($(this)[0].dataset.num)
            let buyNum = $(this)[0];
            let item = $(this).parent().parent()[0];
            let goodsNum = Number(buyNum.dataset.num);
            let id = Number($(this).parent().parent()[0].dataset.id);
            myAjax(`/carts/${id}/`,'put',{'id':id,'goods_number':goodsNum},function(data) {
                buyNum.value = buyNum.dataset.num = item.dataset.num = data.goods_number;
                console.log(data)
            });            
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

/**弹框操作**/ 
// 删除弹框
function maskPopup(){
    let delItem = document.querySelectorAll('.delItem')
    $('.delItem').click(function(){
        maskAction($(this).parent().parent())
    })
}
// mask各种点击事件
function maskAction(delItem) {
    console.log(delItem)
    let isDel = false;
    $('#mask').fadeIn();
    setTimeout(function(){
        $('#confirmBox').addClass('slideDown');
    },100)
    $("#cancelBtn")[0].onclick = close;
    $("#delImg")[0].onclick = close;
    //确认删除按钮，需请求接口
    $('#confirmDelBtn').click(function(){
        let id = delItem[0].dataset.id;
        myAjax(`/carts/${id}/`,'delete',{'id':id},function(data) {
            if(!data){
                x0p({
                    title:'删除成功',
                    animationType:'slideDown',
                    icon:'ok',
                    maxWidth:'370px',
                    maxHeight:'168px',
                    buttons: [
                        {
                            type: 'ok',
                            text: '关闭'
                        }
                    ]
                });
                close();
                loadCart();                
            }
            else console.log(data)
        });
    })
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
    let contItem = $('.list-content .icon-checkbox-selected').parent().parent()
    let idStr = '';
    contItem.each(function(){
        idStr += `${$(this)[0].dataset.id}-`
    })
    idStr = idStr.slice(0,idStr.length-1)
    console.log(idStr,600)
    myAjax(`/order_goods/`,'post',{'shop_cart_ids':idStr},function(data){
        console.log(data,100)
        if(data.id){
            location.href = `${BASE_URL}/static/pages/confirmOrder.html?orderId=${data.id}`        
        }
    })
})
