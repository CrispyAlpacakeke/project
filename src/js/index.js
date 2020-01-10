import './header-footer.js'
import '../less/header-footer.less'
import {scrollToTop} from './util.js'
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

/****ajax请求****/ 
// $.myAjaxGet();


/**页面滚动导航栏固定**/ 
window.onscroll=function(){
    console.log($('.site-topbar')[0].getBoundingClientRect())
    if($('.site-topbar')[0].getBoundingClientRect().top < -30){
        console.log(1)
        $('.site-header').addClass('site-header-fixed')
    }
    else $('.site-header').removeClass('site-header-fixed')
}
