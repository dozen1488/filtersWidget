const path = require('path');
const config = require('config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const packageConfig = require('./package.json');

const nodePath = process.env.NODE_PATH || './';
const hostname = process.env.HOSTNAME || 'development';
const rootPath = nodePath ? nodePath.split(';')[0] : './';
const version = packageConfig.version;

const uri = config.get('server.uri');

const { writeKey: analyticServiceKey, shouldRecordAnalytics } = config.get('analyticService');

const paths = {
    out: '../dist/client',
    publicPath: '/',
    admin: {
        in: 'admin',
        outRelativeToContext: 'admin',
        out: '../dist/client/admin',
        outJsName: 'admin/index',
        favicons: 'static/favicons',
        htmlTemplate: 'index.ejs',
        html: 'index.html',
        indexJs: 'index.js'
    },
    directBooking: {
        in: 'directBooking',
        outRelativeToContext: 'directBooking',
        out: '../dist/client/directBooking',
        outJsName: 'directBooking/index',
        favicons: 'static/favicons',
        htmlTemplate: 'index.ejs',
        html: 'index.html',
        indexJs: 'index.js'
    }
};

const defaultConfig = {
    resolve: {
        modules: [path.join(__dirname, rootPath), 'node_modules'],
        aliasFields: ['browser'],
        alias: {
            'react-datepicker': path.join(__dirname, '/node_modules/react-datepicker/dist/react-datepicker.js'),
            'react-datepicker-styles': path.join(__dirname, '/node_modules/react-datepicker/dist/react-datepicker.css')
        }
    },
    entry: {
        [paths.admin.outJsName]: [
            'babel-polyfill',
            'ima.js-babel6-polyfill',
            path.join(__dirname, paths.admin.in, paths.admin.indexJs)
        ],
        [paths.directBooking.outJsName]: [
            'babel-polyfill',
            'ima.js-babel6-polyfill',
            path.join(__dirname, paths.directBooking.in, paths.directBooking.indexJs)
        ]
    },
    output: {
        path: path.join(__dirname, paths.out),
        filename: '[name].js',
        publicPath: paths.publicPath
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!(\/|\\)(joi-date-extensions|csv-stringify|csv-parse))/,
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)/,
                loader: 'file-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            }
        ]
    }
};

const defaultPlugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    }),
    new webpack.NormalModuleReplacementPlugin(/^joi$/, 'joi-browser'),
    new CopyWebpackPlugin([
        {
            from: path.join(__dirname, paths.admin.in, paths.admin.favicons),
            to: path.join(paths.admin.outRelativeToContext)
        },
        {
            from: path.join(__dirname, paths.directBooking.in, paths.admin.favicons),
            to: path.join(paths.directBooking.outRelativeToContext)
        }
    ]),
    new webpack.IgnorePlugin(/locale/, /moment$/),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, paths.directBooking.in, paths.directBooking.htmlTemplate),
        filename: path.join(__dirname, paths.directBooking.out, paths.directBooking.html),
        hash: true,
        inject: false,
        data: {
            version,
            analyticServiceKey,
            isAnalytic: shouldRecordAnalytics,
            uri
        }
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, paths.admin.in, paths.admin.htmlTemplate),
        filename: path.join(__dirname, paths.admin.out, paths.admin.html),
        hash: true,
        inject: false,
        data: {
            version,
            uri
        }
    })
];

const developmentConfigFactory = () => {
    const serverPort = config.get('server.port');

    return Object.assign({}, defaultConfig, {
        mode: 'development',
        devtool: 'source-map',
        plugins: defaultPlugins.concat([
            new webpack.DefinePlugin({
                'process.env': {
                    HOSTNAME: JSON.stringify('development')
                },
                'DEBUG': true
            })
        ]),
        devServer: {
            proxy: {
                '*': `http://localhost:${serverPort}`
            },
            contentBase: paths.out,
            publicPath: paths.publicPath,
            port: 8000,
            host: '0.0.0.0'
        }
    });
};

const qaConfigFactory = () => {
    return Object.assign({}, defaultConfig, {
        mode: 'production',
        devtool: 'source-map',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        mangle: false
                    }
                })
            ]
        },
        plugins: defaultPlugins.concat([
            new webpack.DefinePlugin({
                'process.env': {
                    HOSTNAME: JSON.stringify('qa'),
                    NODE_ENV: JSON.stringify('production')
                },
                'DEBUG': true
            })
        ])
    });
};

const productionConfigFactory = (env) => {
    return Object.assign({}, defaultConfig, {
        mode: 'production',
        devtool: 'none',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({})
            ]
        },
        plugins: defaultPlugins.concat([
            new OptimizeCssAssetsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    HOSTNAME: JSON.stringify(env),
                    NODE_ENV: JSON.stringify('production')
                },
                'DEBUG': false
            })
        ])
    });
};

if (hostname === 'development') {
    module.exports = developmentConfigFactory();
} else if (hostname === 'qa') {
    module.exports = qaConfigFactory();
} else if (hostname === 'production') {
    module.exports = productionConfigFactory('production');
} else if (hostname === 'staging') {
    module.exports = productionConfigFactory('staging');
} else {
    throw new Error(`HOSTNAME = ${hostname} has to either development, qa, production or staging`);
}
