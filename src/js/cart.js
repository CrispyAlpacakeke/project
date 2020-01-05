import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/cart.less"
import "./header-footer.js"
import {scrollToTop} from './util.js'


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
};

/**回到顶部**/ 
scrollToTop({el:$('.tool-bar .backtop')[0],duration:200,pageScroll:(offset)=>{
    // offset >= 700?$('.tool-bar .backtop').addClass('show'):$('.tool-bar .backtop').removeClass('show')
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

/***购买数量增加***/ 
function addNums() {
    $('.btnAdd').click(function(){
        // 获取购买数量，购买数量加1
        let buyNum = $(this).prev()[0];
        let buyNumVal = Number(buyNum.value)
        if(buyNumVal < 201){
            buyNumVal+=1
        } else {
            return
        }
        buyNum.value = buyNumVal
        $(this).parent().parent()[0].dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal()
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
        $(this).parent().parent()[0].dataset.num = buyNumVal;
        // 用函数循环每一个商品购买数量和单价，计算得到商品总价，并将总价相加，得到合计数量
        getTotal()
    })
}

/****输入购买数量****/ 
function printNum() {
    $('.buyNum').keyup(function(){
        if(Number($(this)[0].value)<= 0){
            return ;
        }
        else{
           $(this)[0].value = $(this)[0].value.replace(/\D/g, '');
            //限购
            if(Number($(this)[0].value >200)) {
                $(this)[0].value = 200
            }
        }
        $(this).blur(function(){
            getTotal()
            // $(this).parent().parent()[0].dataset.num = $('.buyNum')[0].value;
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
        let priceVal = Number($(this).parent().prev().children()[0].innerText)
        // 计算总价
        let totalVal = $(this).parent().next().children()[0].innerText = priceVal * buyNumVal
        // 判断当前商品是否被选中
        let isChoose = $(this).parent().parent().find('.icon-checkbox')[0].className.indexOf('icon-checkbox-selected') > -1 ;
        if(isChoose){
            summation+=totalVal
            selectBuyNum+=buyNumVal
        }
        totalBuyNum+=buyNumVal
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
            mask(el,idx)
        }
    })
}

// mask各种点击事件
function mask(el,index) {
    let isDel = false;
    let mask = document.querySelector('#mask')
    mask.style.display = 'block'
    let cancelBtn = document.querySelector("#cancelBtn")
    let confirmDelBtn = document.querySelector("#confirmDelBtn")
    let delImg = document.querySelector("#delImg")
    cancelBtn.onclick=()=> {
        mask.style.display = 'none'
    }
    delImg.onclick=()=> {
        mask.style.display = 'none'
    }
    // 确认删除
    // confirmDelBtn.onclick=()=> {
    //     // let index = mask.getAttribute('index')
    //     // let delItem = document.querySelector('.list-content .content-item').dataset.info.itemid
    //     // document.querySelector('.list-content').removeChild(delItem)
    //     // mask.style.display = 'none'
    //     //点击事件成功触发
    //     // success(e,el);
    // }
}
function success(e,el){
    console.log(e,el)
    if(e){
        $.ajax({
            url: `${BASE_URL}/cart/delete`,
            type: "POST",
            data: {
                id: el.dataset.id
            },
            dataType: "json"
        }).fail(res => {
            console.log(res)
        })
    }
}