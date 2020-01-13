import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/login.less"
import {BASE_URL,api_host} from "./util.js"
import "../css/x0popup.default.css"
import "../css/x0popup.css"
import x0p from "./x0popup.js"

let tabBtns = [...$(".loginContent_nav a")]
let tabCons = [...$(".loginContent .lC")]
console.log(tabBtns)
console.log(tabCons)
tabBtns.forEach(function (item, index) {
    item.dataset.index = index;
    item.onclick = function () {
        console.log(this);
        let index = this.dataset.index;
        console.log(index);
        for (let key in tabBtns) {
            console.log(tabBtns[key]);
            if (tabBtns[key].classList.contains("now")) {
                tabBtns[key].classList.remove("now")
                tabCons[key].classList.add("hide")
            }
        }
        item.classList.add("now")
        console.log(tabCons[index])
        tabCons[index].classList.remove("hide")
    }
})

$('#login-btn').click(function(){
    let username = $("#userName").val()
    let pwd = $("#pwd").val()
    // console.log(username,pwd)
    $.ajax({
        url: `${api_host}/api/token/`,
        type: "POST",
        dataType: "json",
        data: {
            username: `${username}`,
            password: `${pwd}` 
        }
    }).done(res=>{
        localStorage.setItem('access',`${res.access}`)
        localStorage.setItem('refresh',`${res.refresh}`)
        x0p({
            title:`&nbsp;&nbsp;&nbsp;登录成功！`,
            animationType:'slideDown',
            icon:'ok',
            maxWidth:'370px',
            maxHeight:'168px',
            buttons: [],
            showLoading: true,
            autoClose:2000
        });
        console.log('成功！')
        console.log(res)
        $('.err').css('display','none')
        setTimeout(function(){
            window.location.href = `${BASE_URL}/index.html`
        },2000)
    }).fail(err=>{
        console.log(err)
        if(err.responseJSON.non_field_errors){
            $('.err')[0].innerText = err.responseJSON.non_field_errors[0];
            $('.err').css('display','block')
        }
        else if(err.responseJSON.username || err.responseJSON.password){
            $('.err')[0].innerText = "用户名或密码不能为空";
            $('.err').css('display','block')
        }
    })
})