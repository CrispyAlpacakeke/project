import './header-footer.js'
import '../less/header-footer.less'
import '../less/normalized.less'
import '../less/customerCenter.less'

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