// loader module

module.exports = {
    rules: [
        // 编译es语法
        {
            test: /\.js$/,
            //排除node_modules，提高打包速度
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    //可不用单独创建一个babel-loader的配置文件
                    presets: ["@babel/preset-env"]
                }
            }
        },
        //处理css
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader", {
                loader: "postcss-loader",
                options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")]
                }
            }]
        },
        //处理sass
        {
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', 
            }, {
              loader: 'css-loader', 
            }, {
              loader: 'postcss-loader', 
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' 
            }]
          },
        // 处理字体
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    limit: 5000,
                    outputPath: 'static/fonts/'
                }
            }]
        },
        //处理less
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader", {
                loader: "postcss-loader",
                options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")]
                }
            }, "less-loader"]
        },
        // 处理HTML中的图片
        {
            test: /\.html$/,
            use: "html-loader"
        },
        // 处理图片
        {
            test: /\.(jpg|jpeg|svg|png|gif)$/,
            exclude: /node_modules/,
            use: {
                loader: "url-loader",
                options: {
                    // <= kb  ，则转换成base64
                    limit: 2000,
                    name: "[name]-[hash:6].[ext]",
                    outputPath: "static/images/",
                    // 启用commonJS规范  
                    esModule: false
                }
            }
        }
    ]
}