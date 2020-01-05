import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/confirmOrder.less"
import "./header-footer.js"

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