import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/zaliangMatchDetails.less"
import "./header-footer.js"
import {scrollToTop,myAjax,BASE_URL} from './util.js'


function getUrlQueryString(names, urls) {
	urls = urls || window.location.href;
	urls && urls.indexOf("?") > -1 ? urls = urls
			.substring(urls.indexOf("?") + 1) : "";
	var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
	var r = urls ? urls.match(reg) : window.location.search.substr(1)
			.match(reg);
	if (r != null && r[2] != "")
		return unescape(r[2]);
    return null;
}

let matchId = getUrlQueryString('matchId');
console.log(matchId)

myAjax(`/composed_goods_detail/${matchId}/`,'get',function(data){
    console.log(data)
    let htmlStr = ''
    $('#content section')[0].innerHTML = `<div class="detailsOne">
                                            <img class="detailsOne_left" src="${data.composedgoodsimages_set[0].img_composed}" alt="">
                                            <div class="detailsOne_rigth">
                                                <span class="one">${data.composed_goods_name} ${data.composed_goods_description}</span>
                                                <span class="two">￥${data.new_price}</span>
                                                <span class="three">查看宝贝</span>
                                                <span class="four">8932人喜欢</span>
                                            </div>
                                        </div>` 
})