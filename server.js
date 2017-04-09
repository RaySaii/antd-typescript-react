var path = require('path');
const isProduction = process.env.NODE_ENV == "production";
if (isProduction) {
    const express = require('express');
    const webServer=express();
    webServer.use(express.static('build'));
    webServer.get('/', (req, res) => {
        res.sendFile('build/index.html')
    })
    webServer.listen(3333, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Listening at http://localhost:3333.");
    })
    return;
}

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.dev.config.js');
var compiler = webpack(config);
var devServer = new WebpackDevServer(compiler, {
    hot: true,
    // display no info to console (only warnings and errors)
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: true,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add chunk information
        chunks: false,
        // add built modules information to chunk information
        chunkModules: false,
        // add built modules information
        modules: false,
        // add also information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: false,
        // add the source code of modules
        source: false,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Add messages from child loaders
        children: false
    }
});
devServer.listen(3333, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Listening at http://localhost:3333. Please wait, I'm building things for you...");
});

