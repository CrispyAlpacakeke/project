// -> 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    //有多少个html就new多少个实例
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/index.html",
        // 标题
        title: "主页",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "index.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["main"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/login.html",
        // 标题
        title: "登录",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/login.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["login"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/register.html",
        // 标题
        title: "注册",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/register.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["register"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/cart.html",
        // 标题
        title: "我的购物车",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/cart.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["cart"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/cashier.html",
        // 标题
        title: "收银台",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/cashier.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["cashier"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/confirmOrder.html",
        // 标题
        title: "确认订单",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/confirmOrder.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["confirmOrder"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/customerCenter.html",
        // 标题
        title: "个人中心",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/customerCenter.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["customerCenter"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),   
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/paySuccess.html",
        // 标题
        title: "支付成功",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/paySuccess.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["paySuccess"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),   
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/productsDetails.html",
        // 标题
        title: "商品详情页",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/productsDetails.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["productsDetails"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/productsList.html",
        // 标题
        title: "商品列表页",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/productsList.html",
        // 静态资源位置
        inject: "body", 
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["productsList"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/wechatPay.html",
        // 标题
        title: "微信支付",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/wechatPay.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["wechatPay"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/wuguTipsDetails.html",
        // 标题
        title: "五谷小知识",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/wuguTipsDetails.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["wuguTipsDetails"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    }),
    new HtmlWebpackPlugin({
        // 模板文件
        template: "./src/pages/zaliangMatchDetails.html",
        // 标题
        title: "杂粮优搭配",
        // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
        filename: "static/pages/zaliangMatchDetails.html",
        // 静态资源位置
        inject: "body",
        // 是否hash
        hash: false,
        // 指定输出文件所依赖的入口文件（*.js）的[name]
        chunks: ["zaliangMatchDetails"],
        // 控制压缩
        minify: {
            collapseWhitespace: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    })
]