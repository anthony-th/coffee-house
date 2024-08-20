const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  target: "browserslist",
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});