const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var setupVariables = function() {
    switch(process.env.NODE_ENV) {
        case 'production': 
           
            break;
        case 'qa':
           
            break;
        case 'dev':
           
            break;
        default:
           
            break;
    }
};
setupVariables();

module.exports = {
    entry: [
        './src/index.js'
    ],
    devtool: 'inline-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
        }), 
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        rules: [
            { 
                test: /\.jsx?/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {
                            loader: 'css-loader', 
                            options: {
                                minimize: true, 
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader', 
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/, 
                exclude: /node_modules/, 
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], 
        modules: [
            path.resolve(__dirname, './'), 
            path.resolve(__dirname, 'node_modules')
        ]
    }, 
    output: {
        filename: 'index.js', 
        path: path.resolve(__dirname, './dist'), 
        publicPath: '/dist', 
        library: 'dalmation', 
        libraryTarget: 'umd', 
        umdNamedDefine: true
    }

};