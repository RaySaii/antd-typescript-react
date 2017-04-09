var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");

var nodeModulesPath = path.join(__dirname, '../node_modules');
var isProduction = process.env.NODE_ENV == "production";

var config = {
    entry: {
        vendors: [
            'react',
            'lodash',
            'moment',
            'mobx',
            'antd',
            'react-router',
            'react-dom',
            'babel-polyfill',
            path.join(__dirname, 'babel', 'babelhelpers.js')
        ],
        app: [
            path.join(__dirname, '../src', 'index.tsx')
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less', '.css'],
        modules: ["node_modules", "resources"],
    },

    output: {
        path: path.join(__dirname, '../build'),
        filename: 'js/[name]_[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {emitErrors: true}
            },
            {
                test: /\.tsx?$/,
                loaders: ["babel-loader?cacheDirectory", "awesome-typescript-loader?tsconfig=tsconfig.json&useCache=true"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader?minimize"]
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                loaders: ["style-loader", "css-loader?minimize", "less-loader?compress"]
            },
            {
                test: /\.module\.less$/,
                loaders: ["style-loader", "css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "less-loader?-compress"]
            },
            {
                test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/,
                loader: "file-loader?name=assets/[name]_[hash].[ext]"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendors_[hash].js'}),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/assets/favicon.png',
        })
    ]
};

if (isProduction) {
    config.plugins.push(new CleanPlugin(['js'],{root:path.join(__dirname, '../build')}));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
    }));
}

module.exports = config;
