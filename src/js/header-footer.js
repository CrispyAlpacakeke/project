import '../less/header-footer.less'

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


/*****判断用户是否登录*****/ 
sessionStorage.setItem('username','脆皮羊驼怪')
let username = sessionStorage.getItem('username');
if(username){
    $('.topbar-info')[0].innerHTML = `<span class="user">
                                        <a href="javascript:;" class="user-name">
                                            <span class="name">${username}</span>
                                            <i class="iconfont iconarrow-down"></i>
                                        </a>        
                                        <ul class="user-menu">
                                            <li class="user-item"><a href="./static/pages/customerCenter.html">个人中心</a></li>
                                            <li class="user-item"><a href="./static/pages/customerCenter.html">账户管理</a></li>
                                            <li class="user-item"><a href="javascript:;" id="user-logout">安全退出</a></li>
                                        </ul>                                        
                                    </span>`
    addSubmenu($('.user-name'), $('.user-menu'));
    addSubmenu($('.header-cart'), $('.dropdown-layer'));
}

