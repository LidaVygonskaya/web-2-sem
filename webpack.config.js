const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';



module.exports = {
    entry: {
       /* app: './App.js',
        testBundle: './test.jsx',*/
        index: './index.jsx',
        redux: './testRedux.jsx'

    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build/',

    },

    watch: NODE_ENV === 'development',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-1'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',

            },

            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },

            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader:'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ]

    },


    devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : false,
    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ]

};

if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
        })
    );
}