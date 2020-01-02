import './header-footer.js'
import '../less/header-footer.less'
import {scrollToTop} from './util.js'
import '../less/normalized.less'
import '../less/index.less'
import Swiper from 'swiper';
import 'swiper/css/swiper.css'

/****导航栏二级菜单下滑效果****/
let time={}
$('.nav-item .link').mouseover(function(){
    let menuId = $(this).data('target');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(`#${menuId}`).find('.nav-menu').slideDown();
    }, 150);
}).mouseout(function(){
    let menuId = $(this).data('target');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(`#${menuId}`).find('.nav-menu').slideUp();
    }, 150);
})
$('.nav-menu').mouseover(function(){
    let menuId = $(this).parent().attr('id');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(this).slideDown();
    }, 150);
}).mouseout(function(){
    let menuId = $(this).parent().attr('id');
    clearTimeout(time[menuId]);
    time[menuId] = setTimeout(() => {
        $(this).slideUp();
    }, 150);
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


