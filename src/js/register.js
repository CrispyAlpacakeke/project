import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/register.less"


// 手机验证
let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/ //手机号正则 

let count = 60 //间隔函数，1秒执行

let InterValObj1 //timer变量，控制时间

let curCount1 //当前剩余秒数

// 验证手机号
$(".btnOne").click(function(){
    curCount1 = count
    let phone = $.trim($(".telreg").val())
    if(!phoneReg.test(phone)){
        $(".pReg").css({
            display: "block"
        })
    }
    else{
        $(".pReg").css({
            display: "none"
        })
    }
    $(".btnOne").attr("disabled", "true");
    $(".btnOne").text( + curCount1 + "秒再获取");
    InterValObj1 = window.setInterval(SetRemainTime1, 1000);
})

function SetRemainTime1(){
    if (curCount1 == 0) {                
        window.clearInterval(InterValObj1);//停止计时器
        $(".btnOne").removeAttr("disabled");//启用按钮
        $(".btnOne").text("重新发送");
    }
    else {
        curCount1--;
        $(".btnOne").text( + curCount1 + "秒再获取");
    }
}


// 下一步
$(".btnTwo").click(function(){
    $(".renone").addClass("equally")
    $(".rentwo").removeClass("equally")
})

$(".btnThree").click(function(){
    $(".rentwo").addClass("equally")
    $(".renone").removeClass("equally")
})

// 表单验证
$(".rentwo input").on("change",function(){
    let reg = new RegExp($(this).data('reg'));
    if(reg.test($(this).val())){
        $(this).parent().removeClass('err');
    }else{
        $(this).parent().addClass('err');
    }
    password()
})

// 判断密码是否一致
function password(){
    if($(".rentwo .password").val() != $(".rentwo .password1").val()){
        $(".rentwo .password1").parent().addClass("err")
    }else{
        $(".rentwo .password1").parent().removeClass("err")
    }
}

