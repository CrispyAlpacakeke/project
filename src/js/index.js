import './header-footer.js'
import '../less/header-footer.less'
import {scrollToTop , myAjax,BASE_URL} from './util.js'
import '../less/normalized.less'
import '../less/index.less'

import Swiper from 'swiper';
import 'swiper/css/swiper.css'

/*********轮播图*********/
let headerSwiper = new Swiper ('#header-swiper', {
    autoplay: true, //自动播放
    effect : 'slide', //切换效果
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
    el: '.swiper-pagination',
    },
    type: 'bullets',
    // 如果需要前进后退按钮
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    }

})  
let healthSwiper = new Swiper ('#health-swiper', {
    autoplay: true, //自动播放
    effect : 'slide', //切换效果
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
    el: '.swiper-pagination',
    },
    type: 'bullets',
    // 如果需要前进后退按钮
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    }

})      

window.onscroll = ()=>{
    if(window.scrollY > 500){
        $('.tool-bar').removeClass('hide')
    }
    else{
        $('.tool-bar').addClass('hide')
    }
};
/***回到顶部***/
scrollToTop({el:$('.tool-bar .backtop')[0],duration:200,pageScroll:(offset)=>{
    offset >= 500?$('.tool-bar').removeClass('hide'):$('.tool-bar').addClass('hide')
}});

/**页面滚动导航栏固定**/ 
window.onscroll=function(){
    if($('.site-topbar')[0].getBoundingClientRect().top < -30){
        $('.site-header').addClass('site-header-fixed')
    }
    else $('.site-header').removeClass('site-header-fixed')
}


/** ajax请求 **/ 
window.onload = function(){
    let matchList = document.querySelector(".match-list")
    myAjax(`/composed_goods/`,'get',function(data){
        console.log(data)
        let dataNeed = data.slice(0,3)
        let htmlStr = "";
        dataNeed.forEach(item => {
            htmlStr += `
                        <li class="match-item" data-id="${item.id}">
                            <a href="javascript:;" class="item-link">
                                <div class="lazy-img">
                                    <img src="${item.composedgoodsimages_set[0].img_composed}" alt="" width="200px" height="112px">
                                </div>
                                <div class="info">
                                    <h2 class="match-title">${item.composed_goods_name} ${item.composed_goods_description}</h2>
                                    <h3>组合1：核桃、何首乌、芝麻、黄豆、玉米有利于黑须发、抗衰老，强筋健骨增强活力。</h3>
                                    <span class="btn">查看搭配</span>
                                </div>
                            </a>
                        </li>
                        `
        })
        matchList.innerHTML = htmlStr;
        $('.match-item').click(function(){
            let id =  $(this)[0].dataset.id;
            console.log(id,666)
            if(id){
                location.href = `${BASE_URL}/static/pages/zaliangMatchDetails.html?matchId=${id}`        
            }
        }) 
    })
}
