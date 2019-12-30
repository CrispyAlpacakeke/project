//服务器 - 导出域名和端口号
module.exports.host = "127.0.0.1";
module.exports.port = "8090";
module.exports.BASE_URL = "http://127.0.0.1";

module.exports={scrollToTop};

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




