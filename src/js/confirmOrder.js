import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/confirmOrder.less"
import {myAjax,scrollToTop} from './util.js'
import "./header-footer.js"

/***加载topbar***/ 
loadTopbar();

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
