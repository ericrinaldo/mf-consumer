const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const package = require('./package.json');


module.exports = (_, argv) => ({
  output: {
    publicPath:
    argv.mode === 'development'
      ? "http://localhost:8081/"
      : "https://mf-consumer-jet.vercel.app/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "consumer",
      filename: "remoteEntry.js",
      remotes: {
        'components': `components@http://localhost:3500/modules?consumer=${package.name}&consumerStage=${package.stage}&module=design-system`,
      },
      exposes: {},
      shared: {
        ...package.dependencies,
        react: {
          singleton: true,
          requiredVersion: package.dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: package.dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
