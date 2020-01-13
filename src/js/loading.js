/**加载购物车**/ 
function loadCart(data,el){
    let htmlPrice = ''
    let htmlStr = ''
    data.forEach(item => {
        if(item.goods.discountgoods_set[0]){
            htmlPrice = `<div class="col col-price">
                            <div class="price-line">
                                <em class="price-original">${item.goods.goods_price}元</em>
                            </div>
                            <div class="price-line">
                                <em class="price-now">${item.goods.discountgoods_set[0].discounted_price}元</em>
                            </div>
                        </div>`
        }
        else{
            htmlPrice = `<div class="col col-price">
                            <div class="price-line">
                                <em class="price-now">${item.goods.goods_price}元</em>
                            </div>
                        </div>`
        }
        htmlStr += `
                    <div class="content-item" data-num="${item.goods_number}" data-id='${item.id}' data-goods='${item.goods.id}'>
                        <div class="col col-check">
                            <i class="iconfont icon-checkbox"></i>
                        </div>
                        <div class="col col-img">
                                <img alt="" src="${item.goods.goodsimages_set[0].goods_img}">
                        </div>
                        <div class="col col-name">
                            ${item.goods.goods_title}
                        </div>
                        ${htmlPrice}
                        <div class="col col-num">
                            <input class="btnReduce" type="button" value="-" />
                            <input class="buyNum" type="text" value="${item.goods_number}" data-num="1" id="goodsNum"/>
                            <input class="btnAdd" type="button" value="+" />
                        </div>
                        <div class="col col-total"><span></span>元</div>
                        <div class="col col-action"><span class="delItem">×</span></div>
                    </div>
                    `
    });
    el.innerHTML = htmlStr;
}
function loadMyOrder(data,el){
    let htmlStr = ''
    let itemStr = ''
    data.forEach(el=>{
        htmlStr += `<li class="list-item">
                    <p>
                        订单号：
                        <span class="order-num">${el.order_num}</span>
                        <span class="del"><i class="iconfont iconshanchu"></i></span>
                    </p>
                    <section>
                        <div class="order-info">
                            <div class="info-item">
                                <img src="${el.goods.goodsimages_set[0].goods_img}" alt="">
                                <span class="name">${el.goods.goods_title}</span>
                                <span class="num">x${el.goods_quantity}</span>                                            
                            </div>
                        </div>
                        <div class="order-username">
                            <span>${el.user_name}</span>
                        </div>
                        <div class="order-pay-method">
                            <span class="one">${el.goods.goods_price}</span>
                            <span class="two">在线支付</span>
                        </div>
                        <div class="order-status">
                            <span>已完成</span>
                        </div>
                        <div class="order-action">
                            <span class="three"><a href="javascript:;">评价</a></span>
                            <span class="two">立即购买</span>
                        </div>
                    </section>
                </li>`
    })
    el.innerHTML = htmlStr
}

export {loadCart,loadMyOrder}