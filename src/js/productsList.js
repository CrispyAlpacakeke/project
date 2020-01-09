import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/productsList.less"
import "./header-footer.js"

// 筛选 排序
$().ready(function(){
    $(".content_left button").click(function(){
        $(this).addClass("selection").siblings().removeClass("selection")
    })
})



let brand = document.querySelector('.content_brand_img ul');
$.ajax({
    url: ``,
    // 数据格式
    dataType: "json"
}).done(res => {
    console.log(res);
    let htmlStr = "";
    res.data.forEach(item => {
        htmlStr += `
        `;
    })
    brand.innerHTML = htmlStr;
}).fail(err => {
    console.log(err);
});

































// 分页

// var currentpage = 1  // 默认当前页为第一页
//     ajaxTest(1);  // 默认加载第一页

// function ajaxTest(num) {
//       $.ajax({
//         url: "",
//         type: "get",
//         data: {},
//         dataType: "json",
//         success: function (data) {
//           console.log(data);
//           //分页
//           $("#page").paging({
//             pageNo: num,
//             totalPage: Math.ceil(data.data.totalNumber / 10),// 根据每页显示10条记录计算总页数
//             totalSize: data.data.totalNumber, // 总共多少条记录
//             callback: function (num) {
//               if (isgetpage(this.totalPage, num)) {
//                 currentpage = num
//                 ajaxTest(num)
//               } else {
//                 return false
//               }
//             }
//           })
//         }
//       })
// }

function isgetpage(totalPage, num) //总页数，当前页（返回为true的时候去执行ajax）
    {
      var a = true;
      if (currentpage == num) {
        if (num == 1) {
          alert("已经是第一页啦~")
        } else if (totalPage == num) {
          alert("已经是最后一页啦~")
        } else {
          alert("已经到当前页啦~")
        }
        a = false;
      }
      return a;
}

   
    //对Paging的实例对象添加公共的属性和方法
    Paging.prototype = {
        constructor: Paging,
        init: function() {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function() {
            console.log('creatHtml被调用啦')
            var me = this;
            var content = "<a id=\"firstPage\">首页</a>";
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var totalNum = me.options.totalSize;
            content += "<a id='prePage'>&laquo;</a>";
            //总页数大于6时候
            if(total > 6) {
                //当前页数小于5时显示省略号
                if(current < 5) {
                    for(var i = 1; i < 6; i++) {
                        if(current == i) {
                            content += "<a class='current'>" + i + "</a>";
                        } else {
                            content += "<a>" + i + "</a>";
                        }
                    }
                    content += "<b>. . .</b>";
                    content += "<a>"+total+"</a>";
                } else {
                     //判断页码在末尾的时候
                    if(current < total - 3) {
                        for(var i = current - 2; i < current + 3; i++) {
                            if(current == i) {
                                content += "<a class='current'>" + i + "</a>";
                            } else {
                                content += "<a>" + i + "</a>";
                            }
                        }
                        content += "<b>. . .</b>";
                        content += "<a>"+total+"</a>";
                    //页码在中间部分时候 
                    } else {
                        content += "<a>1</a>";
                        content += "<b>. . .</b>";
                        for(var i = total - 4; i < total + 1; i++) {
                            if(current == i) {
                                content += "<a class='current'>" + i + "</a>";
                            } else {
                                content += "<a>" + i + "</a>";
                            }
                        }
                    }
                }
                //页面总数小于6的时候
            } else {
                for(var i = 1; i < total + 1; i++) {
                    if(current == i) {
                        content += "<a class='current'>" + i + "</a>";
                    } else {
                        content += "<a>" + i + "</a>";
                    }
                }
            }
            content += "<a id='nextPage'>&raquo;</a>";
      content += "<a id=\"lastPage\">尾页</a>";
      // 不要显示总页数和总记录可以去掉
            content += "<span class='totalPages'> 共<span>"+total+"</span>页 </span>";
            content += "<span class='totalSize'> 共<span>"+totalNum+"</span>条记录 </span>";
            me.element.html(content);
        },
        //添加页面操作事件
        bindEvent: function() {
            var me = this;
            me.element.off('click', 'a');
            me.element.on('click', 'a', function() {
                var num = $(this).html();
                var id=$(this).attr("id");
                if(id == "prePage") {
                    if(me.options.pageNo == 1) {
                        me.options.pageNo = 1;
                    } else {
                        me.options.pageNo = +me.options.pageNo - 1;
                    }
                } else if(id == "nextPage") {
                    if(me.options.pageNo == me.options.totalPage) {
                        me.options.pageNo = me.options.totalPage
                    } else {
                        me.options.pageNo = +me.options.pageNo + 1;
                    }
    
                } else if(id =="firstPage") {
                    me.options.pageNo = 1;
                } else if(id =="lastPage") {
                    me.options.pageNo = me.options.totalPage;
                }else{
                    me.options.pageNo = +num;
                }
                me.creatHtml();
                if(me.options.callback) {
                    me.options.callback(me.options.pageNo);
                }
            });
        }
    };

    function Paging(element, options) {
        this.element = element;
        //传入形参
        this.options = {
            pageNo: options.pageNo||1,
            totalPage: options.totalPage,
            totalSize:options.totalSize,
            callback:options.callback
        };
        //根据形参初始化分页html和css代码
        this.init();
    }

    //通过jQuery对象初始化分页对象
    $.fn.paging = function(options) {
        return new Paging($(this), options);
    }
    $('#page').paging({pageNo:1,totalPage:3,totalSize:3});