const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rulesForTypeScript = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader'
};
const rulesForJavaScript = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
};

const rulesForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
};

const rules = [rulesForJavaScript, rulesForTypeScript, rulesForStyles];

module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === "production";
    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: "/", //para que al cambiar de ruta en el frontend no tire el error "mime txt/html"
            filename: isProduction
                ? '[name].[contenthash].js'
                : 'main.js'
        },
        devServer: {
            open: true,
            port: 3002,
            historyApiFallback: true//para que funcione react router dom
        },
        module: { rules },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' })
        ]
    }
}