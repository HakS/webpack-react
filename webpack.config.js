import path from 'path';

module.exports = {
    entry: path.join(__dirname, 'app/main.js'),
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
