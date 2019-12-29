import './header-footer.js'
import '../less/header-footer.less'
import './util.js'
import '../less/normalized.less'
import '../less/index.less'
import Swiper from 'swiper';
import 'swiper/css/swiper.css'

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
let mySwiper = new Swiper ('.swiper-container', {
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