//plugin module
const path = require('path');
const webpack = require('webpack');
const htmlConfigs = require('./html.config.js');
// -> 抽离css文件 --> 可以但没必要
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// -> 消除未使用的css
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
// -> 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [
    // -> 抽离css文件
    // new MiniCssExtractPlugin({
    //     //相对于output中的path
    //     filename: 'static/css/[name].css'
    // }),
    // -> 消除未使用的css
    // new PurifyCSSPlugin({
    //     // Give paths to parse for rules. These should be absolute!
    //     //查找html文件中是否有匹配的css中的class，若没有就消除
    //     paths: glob.sync(path.join(__dirname, "./src/**/*.html")),
    // }),
    //将htmlConfigs数组中的对象取出
    ...htmlConfigs,
    // -> 压缩css
    new OptimizeCSSAssetsPlugin ({
        // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
        assetNameRegExp: /\.(sa|sc|c|le)ss$/g, 
        // 指定一个优化css的处理器，默认cssnano
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
        preset: [  'default', {
            discardComments: { removeAll: true}, //对注释的处理
            normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        }]
        },
        canPrint: true  // 是否打印编译过程中的日志
    }),
    // -> 热替换
    new webpack.HotModuleReplacementPlugin(),
    // -> 版权声明
    new webpack.BannerPlugin("版权所有，翻版必究！"),
    // -> 全局导入三方库
    new webpack.ProvidePlugin({
        $:"jquery", // npm
        jQuery: "jQuery"
    })
]