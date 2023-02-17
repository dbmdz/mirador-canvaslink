module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "MiradorCanvasLink",
      externals: {
        react: "React",
      },
    },
  },
  webpack: {
    rules: {
      babel: {
        test: /\.jsx?/,
      },
    },
    extra: {
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },
  },
};
