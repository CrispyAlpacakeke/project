import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/confirmOrder.less"
import {myAjax,scrollToTop} from './util.js'
import "./header-footer.js"

/**ajax请求加载页面**/ 
// myAjax('')

/**获取订单id**/ 
let orderId = getUrlQueryString('orderId');
 
function getUrlQueryString(names, urls) {
	urls = urls || window.location.href;
	urls && urls.indexOf("?") > -1 ? urls = urls
			.substring(urls.indexOf("?") + 1) : "";
	var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
	var r = urls ? urls.match(reg) : window.location.search.substr(1)
			.match(reg);
	if (r != null && r[2] != "")
		return unescape(r[2]);
    return null;
}

/***退出登录返回首页***/ 
function isLogin(){
    let access = localStorage.getItem('access');
    if(!access){
        window.location.href="../../index.html"
    }    
}
isLogin();
$('#user-logout').click(function(){
    sessionStorage.clear();
    isLogin();
});

/**地址列表switchable-panel hover效果**/
$('.switchable-panel').hover(function(){
    $(this).toggleClass('li-hover');
})
/**选中地址**/ 
$('.consignee-item').click(function(){
    $(this).addClass('item-selected').parent().siblings().toggle().find('.consignee-item').removeClass('item-selected');
    $('#consigneeItemAllBtn').toggleClass('hide')
    $('#consigneeItemHideBtn').toggleClass('hide')
})
/**设为默认地址**/ 


/**显示隐藏收货人信息**/ 
function showHideConsignee(){
    $('.switchable-panel').each(function(){
        let panel = $(this);
        $('#consigneeItemHideBtn').click(function(){
            $(this).addClass('hide')
            $('#consigneeItemAllBtn').removeClass('hide')
            if(!panel.find('.consignee-item')[0].classList.contains('item-selected')){
                panel.toggle();
            }
        })
        $('#consigneeItemAllBtn').click(function(){
            $(this).addClass('hide')
            $('#consigneeItemHideBtn').removeClass('hide')
            console.log(panel.find('.consignee-item')[0].classList.contains('item-selected'))
            if(!panel.find('.consignee-item')[0].classList.contains('item-selected')){
                panel.toggle();
            }
        })
    })    
}
showHideConsignee();

/**配送方式**/ 
$('.shipment-item').click(function(){
    $(this).addClass('item-selected').siblings().removeClass('item-selected');
})
$('#shipment_normal').click(function(){
    $('.shipment-date .mode-info .days')[0].innerText = ' 3-4 '
})
$('#shipment_fast').click(function(){
    $('.shipment-date .mode-info .days')[0].innerText = ' 2 '
})

/**提交订单跳转支付**/ 
$('#order-submit').click(function () {
    let req_data = {
        order_id: orderId,
        csrfmiddlewaretoken: "{{ csrf_token }}"
    };
    console.log(req_data)
    myAjax("/pay/",'post', req_data, function (data) {
        console.log(data,100)
        window.open(data.url)
    })
})