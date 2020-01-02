import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/register.less"


$(".btnTwo").click(function(){
    $(".renone").addClass("equally")
    $(".rentwo").removeClass("equally")
})

$(".btnThree").click(function(){
    $(".rentwo").addClass("equally")
    $(".renone").removeClass("equally")
})

