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
};
