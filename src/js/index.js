import './header-footer.js'
import '../less/header-footer.less'
import {scrollToTop} from './util.js'
import '../less/normalized.less'
import '../less/index.less'
import Swiper from 'swiper';
import 'swiper/css/swiper.css'

/******图片hover效果******/ 
$('.lazy-img img').hover(function(){
    $(this).css('opacity','.9')
},function(){
    $(this).css('opacity','1')
})

/****导航栏二级菜单下滑效果****/
$('.nav-item').hover(function(){
    $(this).find('.children-menu').slideToggle(200);
    $(this).toggleClass('nav-item-active').siblings('li').removeClass('nav-item-active').find('.children-menu').slideUp();
})

/*****购物车*****/ 
$('.header-cart').hover(function(){
    $('.dropdown-layer').slideToggle(200);
})

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

/***回到顶部***/
scrollToTop({el:$('.tool-bar .backtop')[0],duration:200,pageScroll:(offset)=>{
    // offset >= 700?$('.tool-bar .backtop').addClass('show'):$('.tool-bar .backtop').removeClass('show')
}});