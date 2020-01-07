import './header-footer.js'
import '../less/header-footer.less'
import {scrollToTop} from './util.js'
import '../less/normalized.less'
import '../less/index.less'

import Swiper from 'swiper';
import 'swiper/css/swiper.css'

// /**
//   项目JS主入口
//   以依赖layui的layer和form模块为例
// **/    
// layui.define(['layer', 'form'], function(exports){
//     var layer = layui.layer
//     ,form = layui.form;
    
//     layer.msg('Hello World');
    
//     exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
//   });  

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


