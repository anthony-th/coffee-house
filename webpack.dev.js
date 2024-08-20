const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/menu$/, to: "/menu.html" },
      ],
    },
  },
});
