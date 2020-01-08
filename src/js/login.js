import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/login.less"


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
        url: `http://192.168.110.33:8000/api/token/`,
        type: "POST",
        dataType: "json",
        // contentType: "application/json",
        // headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('access')
        // },
        data: {
            username: `${username}`,
            password: `${pwd}` 
        }
    }).done(res=>{
        localStorage.setItem('access',`${res.access}`)
        console.log('成功！')
        console.log(res.access)
        
        $('.err').css('display','none')
        window.location.href = "../../index.html"

    }).fail(err=>{
        // $('.err')[0].innerText = '用户名或者密码不正确';
        // $('.err').toggle()
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