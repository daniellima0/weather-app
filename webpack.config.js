const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Weather App",
            favicon: "./src/assets/favicon.svg",
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,

                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,

                type: "asset/resource",
            },
            {
                test: /\.(csv|tsv)$/i,

                use: ["csv-loader"],
            },

            {
                test: /\.xml$/i,

                use: ["xml-loader"],
            },
        ],
    },
};
