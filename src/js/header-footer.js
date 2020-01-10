import '../less/header-footer.less'
import "../css/x0popup.default.css"
import "../css/x0popup.css"
import x0p from "./x0popup.js"

const BASE_URL = '127.0.0.1:8080'

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

localStorage.setItem("username","脆皮羊驼怪");
/**加载topbar**/ 
function loadTopbar(){
    let username = localStorage.getItem('username');
    let topInfoStr = '';
    if(username){
        topInfoStr = `  <span class="user">
                            <a href="javascript:;" class="user-name">
                                <span class="name">${username}</span>
                                <i class="iconfont iconarrow-down"></i>
                            </a>        
                            <ul class="user-menu">
                                <li class="user-item"><a href="//${BASE_URL}/static/pages/customerCenter.html#customerCenter">个人中心</a></li>
                                <li class="user-item"><a href="//${BASE_URL}/static/pages/customerCenter.html#userInfo">账户管理</a></li>
                                <li class="user-item"><a href="javascript:;" id="user-logout">安全退出</a></li>
                            </ul>                                        
                        </span>`
    }
    else{
        topInfoStr = `  <a href="//${BASE_URL}/static/pages/login.html" target="_blank" data-login="true">你好，请登录</a>
                            <span class="sep"></span>
                        <a href="//${BASE_URL}/static/pages/register.html" target="_blank" data-register="true">注册</a>`
    }
    $('#head .site-topbar .container')[0].innerHTML = ` <div class="topbar-info">${topInfoStr}</div>
                                                        <div class="topbar-nav fr">
                                                            <a href="//${BASE_URL}/index.html">首页</a><span class="sep"></span>
                                                            <a href="//${BASE_URL}/static/pages/customerCenter.html#myOrders">我的订单</a><span class="sep"></span>
                                                            <a href="javascript:;">消息通知</a><span class="sep"></span>
                                                            <a href="javascript:;">客服服务</a><span class="sep"></span>
                                                            <a href="javascript:;">关于我们</a><span class="sep"></span>
                                                            <a href="javascript:;">加盟</a>
                                                        </div>`
    loadSubmenu($('.user-name'), $('.user-menu'));
};
loadTopbar();

/**加载mini-cart**/
(function loadMiniCart(){
    let username = localStorage.getItem('username');
    loadSubmenu($('.header-cart'), $('.dropdown-layer'));
    if(username){
        $('.cart-list').removeClass('hide');
        $('.cart-total').removeClass('hide');
        $('.cart-empty').addClass('hide');
    }
    else{
        $('.cart-list').addClass('hide');
        $('.cart-total').addClass('hide');
        $('.cart-empty').removeClass('hide');
    }
})();

/**退出登录**/ 
$('#user-logout').click(function(){
    localStorage.clear();
    if(!localStorage.access){
        x0p({
            title:'您已退出登录',
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
    }
    loadTopbar();
})

$('.header-logo').click(function(){
    location.href=`//${BASE_URL}/index.html`;
    $(this).find('a').title = '返回首页'
})
$('.header-cart').click(function(){
    location.href=`//${BASE_URL}/static/pages/cart.html`;
})

