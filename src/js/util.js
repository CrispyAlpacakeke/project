
//服务器 - 导出域名和端口号
const api_host = "http://192.168.110.33:8000"; //后台端口
const BASE_URL = "//127.0.0.1:8080"

//=>回到顶部
/**
 * 回到顶部
 * @param {Object} options 配置参数
 * - el 触发元素
 * - duration 持续时间
 * - pageScroll 页面滚动回调
 * - complete 回到顶部完成回调
 */
function scrollToTop(options) {
    // 1. 解构配置参数
    let { el, duration, pageScroll, complete } = options;
    console.log(el)
    // 2. 默认值
    duration = duration || 1000;
    // 3. 定义变量
    let isAnimating = false; // 记录当前是否正在执行回到顶部的动画
    let offset   = 0,  // 记录偏移
        interval = 15,  // 每一帧持续的时间
        speed = null, // 每一帧位移的距离
        timer = null; // 定时器
    // 4. 监听窗口滚动
    window.addEventListener("scroll", function () {
        // 更新页面滚动的距离
        offset = document.body.scrollTop || document.documentElement.scrollTop;
        // 触发回调函数
        pageScroll && pageScroll(offset);
    });
    // 5.监听按钮点击
    el.onclick = function () {
        // 异常处理
        // 如果当前正在执行动画，则不响应事件
        if(isAnimating) {
            return;
        }
        // 计算每一帧位移的距离
        speed = Math.ceil(offset / (duration / interval));
        // 定时器执行滚动动画
        isAnimating = true;
        timer = setInterval(function () {
            if (offset > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
            } else {
                // 清除定时器
                clearInterval(timer);
                timer = null;
                isAnimating = false;
                // 矫正误差
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // 触发回调
                complete && complete();
            }
        }, interval);
    }
}

//=>ajax请求密钥
/**
 * ajax请求密钥
 * - url 接口
 * - method 请求方式
 * - data 请求发送的数据
 * - callback 请求完成后回调
 */
function myAjax(url,method,data,callback){
    callback = callback || data;
    if (callback==undefined){
        callback=data;
        data={}
    }
    $.ajax({
        url: api_host + url,
        type: method,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
        data:data,
        cache : false,
        success: function (rsp_data) {
            callback(rsp_data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status==400){
                formError(jqXHR)
            }else if (jqXHR.status==401){
                $.ajax({
                    url:api_host +'/system_user/refresh/',
                    type: method,
                    data:{'refresh':localStorage.getItem('refresh')},
                    success:function (rsp_data) {
                        localStorage.setItem('access',rsp_data['access']);
                        $.myAjaxGet(url,data,callback)
                    },
                    error:function (jqXHR, textStatus, errorThrown) {
                        window.location.href='//BASE_URL/static/pages/login.html'
                    }
                })
            }
        }
    })    
}

/*动态加载topbar*/


module.exports = {scrollToTop,myAjax,BASE_URL};
