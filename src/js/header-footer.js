import '../less/header-footer.less'
import "../css/x0popup.default.css"
import "../css/x0popup.css"
import x0p from "./x0popup.js"
import {myAjax,BASE_URL,api_host} from "./util.js"

/****导航栏二级菜单下滑效果****/
let time={}
$('.nav-item .link').mouseover(function(){
    let menuId = $(this).data('target');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(`#${menuId}`).find('.nav-menu').slideDown(200);
    }, 150);
}).mouseout(function(){
    let menuId = $(this).data('target');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(`#${menuId}`).find('.nav-menu').slideUp(200);
    }, 150);
})
$('.nav-menu').mouseover(function(){
    let menuId = $(this).parent().attr('id');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(this).slideDown(200);
    }, 150);
}).mouseout(function(){
    let menuId = $(this).parent().attr('id');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(this).slideUp(200);
    }, 150);
})

/*****二级菜单hover效果*****/ 
function loadSubmenu(menu,submenu){
    let time = null;
    menu.mouseover(function(e){
        console.log(8)
        clearTimeout(time);
        time = setTimeout(()=>{
            menu.addClass('active')                
            submenu.slideDown(200);        
        },100)
    }).mouseout(function(){
        clearTimeout(time);
        time = setTimeout(()=>{
            menu.removeClass('active')
            submenu.slideUp(200);        
        },100)
    })
    submenu.mouseover(function(){
        clearTimeout(time);
        time = setTimeout(()=>{
            menu.addClass('active')                
            submenu.slideDown(200);        
        },150)
    }).mouseout(function(){
        clearTimeout(time);
        time = setTimeout(()=>{
            menu.removeClass('active')
            submenu.slideUp(200);        
        },100)
    })
}

/**加载topbar**/
new Promise((resolve,reject)=>{
    let topInfoStr = ''
    if(localStorage.getItem('access')){
        myAjax('/personal_center/','get',function(data){
            topInfoStr = `  <span class="user">
                                <a href="javascript:;" class="user-name">
                                    <span class="name">${data.username}</span>
                                    <i class="iconfont iconarrow-down"></i>
                                </a>        
                                <ul class="user-menu">
                                    <li class="user-item"><a href="//192.168.110.47:8080/static/pages/customerCenter.html#customerCenter">个人中心</a></li>
                                    <li class="user-item"><a href="//192.168.110.47:8080/static/pages/customerCenter.html#userInfo">账户管理</a></li>
                                    <li class="user-item"><a href="javascript:;" id="user-logout">安全退出</a></li>
                                </ul>                                        
                            </span>`
            resolve(topInfoStr)                
        })        
    }
    else{
        topInfoStr = `  <a href="//192.168.110.47:8080/static/pages/login.html" target="_blank" data-login="true">你好，请登录</a>
                        <span class="sep"></span>
                        <a href="//192.168.110.47:8080/static/pages/register.html" target="_blank" data-register="true">注册</a>`
        resolve(topInfoStr)                
    }  
}).then(res=>{
    $('#head .site-topbar .container')[0].innerHTML = ` <div class="topbar-info">${res}</div>
                                                        <div class="topbar-nav fr">
                                                            <a href="//192.168.110.47:8080/index.html">首页</a><span class="sep"></span>
                                                            <a href="javascript:;" class="need-access" data-href="/static/pages/customerCenter.html#myOrders">我的订单</a><span class="sep"></span>
                                                            <a href="javascript:;">消息通知</a><span class="sep"></span>
                                                            <a href="javascript:;">客服服务</a><span class="sep"></span>
                                                            <a href="javascript:;">关于我们</a><span class="sep"></span>
                                                            <a href="javascript:;">加盟</a>
                                                        </div>` 
    loadSubmenu($('.user-name'), $('.user-menu'));
    linkJump();
    logout();                                                     
})

/**加载mini-cart**/
function loadMiniCart(){
    let access = localStorage.getItem('access');
    loadSubmenu($('.header-cart'), $('.dropdown-layer'));
    if(access){
        loadCart();
        $('.cart-list').removeClass('hide');
        $('.cart-total').removeClass('hide');
        $('.cart-empty').addClass('hide');
    }
    else{
        $('.cart-list').addClass('hide');
        $('.cart-total').addClass('hide');
        $('.cart-empty').removeClass('hide');
    }
};
loadMiniCart();
/**ajax请求加载mini购物车**/ 
function loadCart(){
    let cartList = $('#miniCartMenu .cart-list')[0]
    if(cartList){
        myAjax(`/carts/`,'get',function(data) {
            let htmlStr = "";
            data.forEach(item => {
                htmlStr += `
                            <li class="cart-item clearFix">
                                <a href="javascript:;" class="thumb">
                                    <img src="${item.goods.goodsimages_set[0].goods_img}" alt="">
                                </a>
                                <a href="javascript:;" class="name">${item.goods.goods_title}</a>
                                <span class="price">${item.goods.goods_price}元 x ${item.goods_number}</span>
                                <a href="javascript:;" class="btn-del">
                                    <i class="iconfont iconclose"></i>
                                </a>
                            </li>
                            `
            })
            cartList.innerHTML = htmlStr
            $('#shopping-amount')[0].innerText = `${data.length}`
            // maskPopup();
        });        
    }
}

/**退出登录**/ 
function logout(){
    $('#user-logout').click(function(){
        localStorage.clear();
        if(!localStorage.access){
            x0p({
                title:`&nbsp;&nbsp;&nbsp;您已退出登录！`,
                animationType:'slideDown',
                icon:'ok',
                maxWidth:'370px',
                maxHeight:'168px',
                buttons: [],
                autoClose:1000
            },function(){
                location.href=`//192.168.110.47:8080/index.html`
            });
        }
    })    
}

/**返回首页**/ 
$('.header-logo').click(function(){
    location.href=`//192.168.110.47:8080/index.html`;
    $(this).find('a').title = '返回首页'
})

/**页面跳转权限**/ 
function linkJump(){
    $('.need-access').click(function(){
        console.log(1)
        let access = localStorage.getItem('access');
        let link = $(this)[0];
        if(!access){
            x0p({
                title: `需要登录才能查看哦~`,
                animationType: 'slideDown',
                icon: 'custom',
                maxWidth: '370px',
                maxHeight: '168px',
                buttons: [
                    {
                        type: 'cancel',
                        text: '取消'
                    },
                    {
                        type: 'ok',
                        text: '立即登录',
                        showLoading: true
                    }
                ]
            }, function (button) {
                if (button == 'ok') {
                    console.log(link)
                    location.href = `//192.168.110.47:8080/static/pages/login.html`
                }
            })
        }
        else location.href = `//192.168.110.47:8080/${link.dataset.href}`;
    })    
}

/**搜索**/ 
if($('.search-text')[0]){
    $('.search-text')[0].oninput = function () {
        // 获取搜索关键字
        let keywords = this.value;
        myAjax('/search/','get',{'goods_title__contains':keywords},function(data){
            // 显示结果
            console.log(data,888)
            let htmlStr = "";
            data.forEach(obj => {
                htmlStr += `<li data-key=""><a href="#"> ${obj.goods_title}</a></li>`;
            });
            $('.result-list')[0].innerHTML = htmlStr;        
        })
        $('.result-list').parent().slideDown(200);
    }
    $('.search-text').blur(function(){
        $('.result-list').parent().slideUp(200);
    }).click(function(){
        $('.result-list').parent().slideDown(200);
    })    
}
