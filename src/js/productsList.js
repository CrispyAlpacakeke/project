import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/productsList.less"

$().ready(function(){
    $(".content_left button").click(function(){
        $(this).addClass("selection").siblings().removeClass("selection")
    })
})
