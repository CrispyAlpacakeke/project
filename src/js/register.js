import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/register.less"
import "../css/sweet-alert.css"
import "./sweet-alert.min.js"

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


// 返回
$(".btnThree").click(function(){
    $(".rentwo").addClass("equally")
    $(".renone").removeClass("equally")
})


// 验证手机号接口
$(".btnOne").click(function(){
    let telVal = $(".telreg").val()
    console.log(telVal)
    $.ajax({
        url: `http://192.168.110.33:8000/phone_code/`,
        type: "POST",
        dataType: "json",
        // contentType: "application/json",
        data: {
            phone: `${telVal}` ,
        }
    }).done(res => {
        
    }).fail(err => {
        $('.pReg')[0].innerText = err.responseJSON.phone[0]
        $('.pReg').toggle();
    });
})



$(".btnTwo").click(function(){
    let iptOneVal = $(".iptOne").val()
    let telVal = $(".telreg").val()
    let iptTwoval=$("#iptTwo").prop("checked");
    if(iptTwoval){
        $.ajax({
        url: `http://192.168.110.33:8000/check/`,
        type: "POST",
        dataType: "json",
        // contentType: "application/json",
        data: {
            phone: `${telVal}`,
            phone_code: `${iptOneVal}` ,
        }
    }).done(res => {

        // console.log(res)
        // console.log(getAllResponseHeaders())
        // 下一步
        // $(".btnTwo").click(function(){
            $(".renone").addClass("equally")
            $(".rentwo").removeClass("equally")
        // })


    }).fail(err => {
        $('.spanOne')[0].innerText = err.responseJSON[0]
        $('.spanOne').toggleClass('show');
    })
    }else{
        swal("请阅读用户协议和隐私政策");
        // alert("请请阅读用户协议和隐私政策")
    }
    console.log(iptTwoval);
    console.log(iptOneVal)
})




$(".iptOne").on("change",function(){
    let iptOneVal = $(".iptOne").val()
    let telVal = $(".telreg").val()

    
    $.ajax({
        url: `http://192.168.110.33:8000/check/`,
        type: "POST",
        dataType: "json",
        // contentType: "application/json",
        data: {
            phone: `${telVal}`,
            phone_code: `${iptOneVal}` ,
        }
    }).done(res => {

        // console.log(res)
        // console.log(getAllResponseHeaders())
        // 下一步
        // $(".btnTwo").click(function(){
            // $(".renone").addClass("equally")
            // $(".rentwo").removeClass("equally")
        // })

        console.log(res)
        $('.spanOne').removeClass('show');

    }).fail(err => {
        $('.spanOne')[0].innerText = err.responseJSON[0]
        $('.spanOne').addClass('show');
    });

})



$('#submit_btn').click(function(){
    let username = $("#userName").val()
    let email = $("#email").val()
    let pwd = $("#pwd").val()
    let iptOneVal = $(".iptOne").val()
    let telVal = $(".telreg").val()
    
    $.ajax({
        url: `http://192.168.110.33:8000/register/`,
        type: "POST",
        dataType: "json",
        // contentType: "application/json",
        data: {
            username: `${username}`,
            email: `${email}` ,
            password: `${pwd}` ,
            phone: `${telVal}`,
            phone_code: `${iptOneVal}`
        }
    }).done(res=>{
        alert("注册成功")
        console.log(res)
        localStorage.setItem('refresh',res.refresh)
        localStorage.setItem('access',res.access)
        window.location.href = "../../index.html"
    }).fail(err=>{
        console.log(err)
        if(err.status === 400){
            if(err.responseJSON.username){
                $('#userName').parent()[0].dataset.tips = err.responseJSON.username[0];
                $('#userName').parent().addClass('err')
            }
            if(err.responseJSON.email){
                $('#email').parent()[0].dataset.tips = err.responseJSON.email[0];
                $('#email').parent().addClass('err')
            }
        }
    })
})

function d(){
    swal("Cancelled", "Your imaginary file is safe :)", "error");
    // swal({
    //     title: "Are you sure?",
    //     text: "You will not be able to recover this imaginary file!",
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#DD6B55",
    //     confirmButtonText: "Yes, delete it!",
    //     cancelButtonText: "No, cancel plx!",
    //     closeOnConfirm: false,
    //     closeOnCancel: false
    //   },
    //   function(isConfirm){
    //     if (isConfirm) {
    //       swal("Deleted!", "Your imaginary file has been deleted.", "success");
    //     } else {
    //       swal("Cancelled", "Your imaginary file is safe :)", "error");
    //     }
    //   });
}

