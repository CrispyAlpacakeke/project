// 1. 引入模块
const path = require('path');
const entry = require('./entry.js');
const loaders = require('./loader.js');
const plugins = require('./plugins.js');

// -> 服务器
const {host,port} = require("../src/js/util.js")

// 2. 导出配置
module.exports = {
    // 配置基础路径为当前目录（默认为配置文件所在的当前目录）
    context: path.resolve(__dirname, '../'),
    // 打包模式 development - 代码未压缩 | production - 代码压缩
    mode: 'development',
    // 入口 string | array | object - 从入口构建依赖图
    entry,
    // 出口
    output: {
        // 输出目录/绝对路径
        //resolve - 解析 | dirname - 当前目录名
        path: path.resolve(__dirname, '../dist/'),
        // 输出文件名
        //[name] - 参数 - 入口的key
        filename: 'static/js/[name]-bundle.js',
        //处理静态资源路径
        publicPath: `http://127.0.0.1:8080/`
    },
    // 加载器
    module:loaders,
    //插件
    plugins,
    // 开发服务
    devServer: {
        contentBase:path.resolve(__dirname,"../dist/"),
        host: "127.0.0.1",
        port: 8080,
        open: true,
        inline: true,   
        hot: false // 热替换
    }
};