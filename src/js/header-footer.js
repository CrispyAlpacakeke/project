import '../less/header-footer.less'

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

/*****二级菜单*****/ 
function addSubmenu(menu,submenu){
    let time = null;
    menu.mouseover(function(e){
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
/***加载mini-cart***/ 
addSubmenu($('.header-cart'), $('.dropdown-layer'));

sessionStorage.setItem('username','脆皮羊驼怪')
/*****判断用户是否登录*****/ 
function isLogin(){
    console.log(1)
    let username = sessionStorage.getItem('username');
    if(username){
        $('.topbar-info')[0].innerHTML = `<span class="user">
                                            <a href="javascript:;" class="user-name">
                                                <span class="name">${username}</span>
                                                <i class="iconfont iconarrow-down"></i>
                                            </a>        
                                            <ul class="user-menu">
                                                <li class="user-item"><a href="//192.168.110.47:8080/static/pages/customerCenter.html#customerCenter">个人中心</a></li>
                                                <li class="user-item"><a href="//192.168.110.47:8080/static/pages/customerCenter.html#userInfo">账户管理</a></li>
                                                <li class="user-item"><a href="javascript:;" id="user-logout">安全退出</a></li>
                                            </ul>                                        
                                        </span>`
        addSubmenu($('.user-name'), $('.user-menu'));
        $('.cart-list').removeClass('hide');
        $('.cart-total').removeClass('hide');
        $('.cart-empty').addClass('hide');
    }    
    else{
        $('.topbar-info')[0].innerHTML = `<a href="//192.168.110.47:8080/static/pages/login.html" target="_blank" data-login="true">你好，请登录</a>
                                            <span class="sep"></span>
                                        <a href="//192.168.110.47:8080/static/pages/register.html" target="_blank" data-register="true">注册</a>`
        $('.cart-list').addClass('hide');
        $('.cart-total').addClass('hide');
        $('.cart-empty').removeClass('hide');
    }
}
isLogin();

/**退出登录**/ 
$('#user-logout').click(function(){
    sessionStorage.clear();
    isLogin();
})

$('.header-logo').click(function(){
    location.href="//192.168.110.47:8080/index.html"
})
