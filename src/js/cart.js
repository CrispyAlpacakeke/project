import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/index.less"
import "../less/cart.less"
import "./header-footer.js"

/***退出登录返回首页***/ 
function isLogin(){
    let username = sessionStorage.getItem('username');
    if(!username){
        window.location.href="../../index.html"
    }    
}
isLogin();
/**退出登录**/ 
$('#user-logout').click(function(){
    sessionStorage.clear();
    isLogin();
})