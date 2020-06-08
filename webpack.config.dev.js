const webpack = require("webpack");
const path = require("path");
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    mode: "development",
    context: __dirname,

    output: {
        path: path.join(__dirname, "assets/dist"),
        publicPath: "//192.168.110.10:8001/static/dist/",
        filename: "[name].js"
    },

    entry: {
        main: [
            path.join(__dirname, "src/app.scss"),
            path.join(__dirname, "src/app.js")
        ],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                }
            },

            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "main.css",
                        },
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                includePaths: ["./node_modules"]
                            },
                        },
                    },
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: "inline-source-map",
    devServer: {
        inline: true,
        hot: true,
        port: 8001,
        contentBasePublicPath: "/static/",
        contentBase: path.join(__dirname, "assets"),
        disableHostCheck: true,
        host: "0.0.0.0"
    },
};