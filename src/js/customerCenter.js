import './header-footer.js'
import '../less/header-footer.less'
import '../less/normalized.less'
import '../less/customerCenter.less'
import 'distpicker/dist/distpicker'
import "../css/x0popup.default.css"
import "../css/x0popup.css"
import x0p from "./x0popup.js"
import {myAjax,BASE_URL} from "./util.js"
import {loadMyOrder} from "./loading.js"

$('.menu-box .item').click(function(){
    $('.menu-box .item').each(function(){
        $(this).removeClass('item-this')
    })
    $(this).addClass('item-this')
    //显示对应的main-box,隐藏其他main-box
    $('.main-box').each(function(){
        $(this).addClass('hide')
    })
    $(`#${$(this)[0].dataset.id}`).removeClass('hide')
    //设置hash值为当前id
    location.hash = `#${$(this)[0].dataset.id}`;
})
/**获取页面hash值，显示对应div**/ 
function showCurDiv(){
    $('.menu-box .item').each(function(){
        $(this)[0].dataset.id === location.hash.replace(/#/g,'') ? $(this).addClass('item-this'):$(this).removeClass('item-this')
    })
    $('.main-box').each(function(){
        $(this).addClass('hide')
    })
    $(`${location.hash}`).removeClass('hide')    
}
showCurDiv();
//页面hash值改变时，显示hash值对应的页面
window.onhashchange=()=>{
    showCurDiv();
}
$('.avatar').click(function(){
    location.hash = '#userInfo'
})

//ajax请求加载个人中心
function loadPersonCenter(){
    myAjax('/personal_center/','get',function(data){
        $('#customerCenter .potral-main')[0].innerHTML = `  <div class="user-card">
                                                                <div class="avatar">
                                                                    <img src="" alt="用户头像" class="avatar-img" data-src="${data.user_img}">
                                                                </div>
                                                                <h2 class="username">${data.username}</h2>
                                                                <p class="tip">早上好</p>
                                                                <a href="#address" class="link">我的收货地址</a>                         
                                                            </div>
                                                            <div class="user-actions">
                                                                <div class="action-list">
                                                                    <li>
                                                                        账户安全：
                                                                        <span class="level">普通</span>
                                                                    </li>
                                                                    <li>
                                                                        绑定手机：
                                                                        <span>13795595234</span>
                                                                    </li>
                                                                    <li>
                                                                        绑定邮箱：
                                                                        <span>1589889867@qq.com</span>
                                                                    </li>
                                                                </div>
                                                            </div>`
        $('.avatar img')[0].src =  data.user_img?`${data.user_img}`:"../images/photo.jpg"     
        //点击头像跳转个人信息  
        $('.avatar').click(function(){
            location.href = `${BASE_URL}/static/pages/customerCenter.html#userInfo`
        })                                            
        console.log(data)
    })    
}
loadPersonCenter();
//ajax请求加载个人信息
function loadPersonDetail(){
    myAjax('/personal_center/','get',function(data){
        $('#userInfo .user-set')[0].innerHTML = `<div class="userinfo-form form">
                                                    <div class="item clearFix">
                                                        <span class="label">
                                                            <em>*</em>
                                                            用户名：
                                                        </span>
                                                        <div class="fl">
                                                            <input type="text" value="${data.username}" class="txt txt-err">
                                                            <span class="tip">可用于登录，请牢记哦~</span>
                                                            <div class="err">错误提示</div>
                                                        </div>
                                                    </div>
                                                    <div class="item clearFix">
                                                        <span class="label">性别：</span>
                                                        <div class="fl">
                                                            <input type="radio" name="sex" class="radio" value="0">
                                                            <label class="gender">男</label>
                                                            <input type="radio" name="sex" class="radio" value="0">
                                                            <label class="gender">女</label>
                                                            <input type="radio" name="sex" class="radio" value="0">
                                                            <label class="gender">保密</label>
                                                        </div>
                                                    </div>
                                                    <div class="item clearFix">
                                                        <span class="label">兴趣爱好：</span>
                                                        <div class="fl interest">
                                                            <p>请选择您感兴趣的分类，给您最精准的推荐</p>
                                                            <ul class="interest-list clearFix">
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                                <li class="interest-item">
                                                                    纤体瘦身<b></b>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="item clearFix">
                                                        <span class="label">
                                                            <em>*</em>
                                                            邮箱：
                                                        </span>
                                                        <div class="fl">
                                                            <input type="text" value="15*****36@qq.com" class="txt txt-succ">
                                                            <span class="tip">已验证</span>
                                                            <div class="err"></div>
                                                        </div>
                                                    </div>
                                                    <div class="item clearFix">
                                                        <span class="label"></span>
                                                        <div class="fl">
                                                            <a href="javascript:;" class="btn">提交</a>
                                                        </div>
                                                    </div>
                                                </div>`
                                                  
        console.log(data)
        //->兴趣爱好选中状态
        $('.interest-item').click(function(){
            $(this).toggleClass('item-this')
        })
        /*保存个人信息*/ 
        $('.user-set .btn').click(function(){
            x0p({
                title:'提交资料成功',
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
        })
        console.log($('.update-img .img-cont')[0])
        let imgUrl = data.user_img? data.user_img:"../images/photo.jpg"
        console.log(imgUrl)
        $('.update-img .img-cont')[0].style.background = `url(${imgUrl}) no-repeat center/cover` 
    })   
}
//ajax请求加载我的订单
myAjax('/order/','get',function(data){
    console.log(data,`myorder`)
    let orderList =  $('.order-list')[0];
    loadMyOrder(data,orderList)
}) 
loadPersonDetail();
/**个人信息**/
//tab切换
$('.filter-list li').click(function(){
    $('.user-panel').addClass('hide')
    $('.user-panel')[$(this).index()].classList.remove('hide')
})
$('.filter-list .txt').click(function(){
    if(!$(this)[0].classList.contains('txt-this')){
       $(this).toggleClass('txt-this').parent().siblings().find('a').removeClass('txt-this') 
    }
})

//头像照片
//->图片回显
window.imgPreview = function(fileDom){
    // 判断是否支持FileReader 
    let reader = null;
    if(window.FileReader) {
        reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
        return;
    }
    // 获取选中的文件
    let file = fileDom.files[0];
    // 判断是否是图片类型
    let imageType = /^image\//;
    console.log(file.type)
    if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    // 读取完成
    //监听图片是否读取完成
    reader.onload = function(e) {
        // 图片路径设置为读取的图片
        // img.src = e.target.result;
        let box = document.querySelector(".img-cont");
        // 回显图片
        console.log(e.target.result)
        box.style.backgroundImage = `url(${e.target.result})`;
    }
    // 读取图片 => 将图片转换成base64
    //图片、视频以二进制流形式上传（文本以json或者xml形式）
    reader.readAsDataURL(file);
}
//->图片上传
window.uploadImage = function() {
    console.log('uploadImage被调用')
    let file = document.querySelector(".select input").files[0];
    if(!file) {
        x0p({
            title:'请选择图片上传！',
            animationType:'slideDown',
            icon:'warning',
            maxWidth:'370px',
            maxHeight:'168px',
            buttons: [
                {
                    type: 'ok',
                    text: '关闭'
                }
            ]
        });
        return;
    }
    let formData = new FormData();
    formData.append("photo", file);
    // ajax
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8800/up_image", true);
    xhr.send(formData);
    xhr.onload = function(res) {
        console.log(res);
    }
}
//上传成功
function uploadSuccess(){
    x0p({
        title:'头像上传成功',
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

$('.checkbox-inner').click(function(){
    $(this).parent().toggleClass('checked')
})

/*删除订单*/
$('.order-list .del').click(function(){
    x0p({
        title:'确认删除该订单？',
        animationType:'slideDown',
        icon:'custom',
        buttons: [
            {
                type: 'cancel',
                text: '取消'    
            },
            {
                type: 'ok',
                text: '确认'
            }
        ]
    });
})

/*修改收货地址弹窗*/ 
function maskPopup(){
    let modItem = [...document.querySelectorAll('.modify')]
    modItem.forEach((el,idx)=>{
        el.onclick = (e) =>{
            //弹框操作
            console.log('点击')
            maskAction(el,idx)
        }
    })
}
maskPopup();
// mask各种点击事件
function maskAction(el,index) {
    let isDel = false;
    $('#mask').fadeIn();
    setTimeout(function(){
        $('#confirmBox').addClass('slideDown');
    },100)
    $("#delImg")[0].onclick = close;
    //删除按钮，需请求接口
}
//关闭弹窗
function close(){
    $('#confirmBox').removeClass('slideDown');
    setTimeout(function(){
        $('#mask').fadeOut();
    },100)
}
/**加载弹窗内容**/
function loadPopup(){
    $('#addAddr').click(function(){
        
    })
}

/**显示收货地址数量**/
function showAddrNum(){
    let addrItem = [...document.querySelectorAll('.addr-item')];
    $('.addr-num')[0].innerHTML = ` ${addrItem.length} `;
} 
showAddrNum();

/**删除地址**/ 
function delAddress(){
    $('.del-addr').click(function(){
        x0p({
            title:'确认删除该收货地址？',
            animationType:'slideDown',
            icon:'custom',
            buttons: [
                {
                    type: 'cancel',
                    text: '取消'    
                },
                {
                    type: 'ok',
                    text: '确认'
                }
            ]
        });
    })
}
delAddress();